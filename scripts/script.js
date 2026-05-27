//STARS — canvas background (Cria e anima estrelas piscando no canvas de fundo) ---
(function(){

  // Pega o elemento canvas e o contexto de desenho 2D
  const c = document.getElementById('canvas-stars');

  const ctx = c.getContext('2d');
   // Variáveis globais do canvas
  let W, H, stars = [];

  //Ajusta o tamanho do canvas para preencher a janela
  function resize(){
    W = c.width  = window.innerWidth;
    H = c.height = window.innerHeight;
  }

  //Gera um array de estrelas com posição, tamanho e parâmetros de animação aleatórios
  function makeStars(){
    stars = [];
    for(let i=0;i<200;i++){
      stars.push({
        x: Math.random()*W,
        y: Math.random()*H,
        r: Math.random()*1.4+.3,
        a: Math.random(),
        speed: .003+Math.random()*.008,
        phase: Math.random()*Math.PI*2
      });
    }
  }

  //Desenha todas as estrelas no canvas. A opacidade de cada estrela varia com o seno do tempo
  function drawStars(t){
    ctx.clearRect(0,0,W,H);
    
    for(const s of stars){
      // Opacidade oscila entre ~0.15 e ~0.85 com base no seno do tempo
      const alpha = .15 + .7*(.5+.5*Math.sin(t*s.speed+s.phase));

      ctx.beginPath();
      ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
      ctx.fillStyle = `rgba(255,255,255,${alpha})`;
      ctx.fill();
    }
  }

  // Contador de tempo em milissegundos
  let t=0;

  //Loop principal de animação
  function loop(){
    t += 16;
    drawStars(t);
    requestAnimationFrame(loop);
  }

  // Inicialização: configura o canvas, cria as estrelas e inicia o loop
  resize();
  makeStars();
  loop();

  // Recria as estrelas ao redimensionar para cobrir a nova área
  window.addEventListener('resize', ()=>{ resize(); makeStars(); });
})();


// Array com os dados de cada planeta do sistema solar ---
const PLANETS = [
  {
    name:'Mercúrio', type:'Rochoso · 1º',  
    color:'#9b8989', glow:'rgba(168,168,168,.5)',  // cor principal do planeta e do brilho ao redor
    accent:'#a8a8a8', // cor usada no card 
    fact:'O menor planeta do sistema solar. Um ano tem apenas 88 dias terrestres.',
    stat:'Temperatura', val:'430°C / −180°C', badge:'Extremos'
  },
  {
    name:'Vênus', type:'Rochoso · 2º',
    color:'#bea374', glow:'rgba(232,205,160,.55)',
    accent:'#e8cda0',
    fact:'O planeta mais quente do sistema — mais que Mercúrio. Gira ao contrário!',
    stat:'Temperatura', val:'462°C constante', badge:'Rotação Inversa'
  },
  {
    name:'Terra', type:'Rochoso · 3º',
    color:'#2a5eb3', glow:'rgba(59,130,246,.6)',
    accent:'#3b82f6',
    fact:'Único planeta com vida confirmada. 71% da superfície é coberta por água.',
    stat:'Satélites', val:'1 — a Lua', badge:'Nossa Casa'
  },
  {
    name:'Marte', type:'Rochoso · 4º',
    color:'#b93939', glow:'rgba(239,68,68,.55)',
    accent:'#ef4444',
    fact:'Abriga o Olympus Mons, vulcão de 22 km — o maior do sistema solar.',
    stat:'Satélites', val:'Fobos & Deimos', badge:'Planeta Vermelho'
  },
  {
    name:'Júpiter', type:'Gasoso · 5º',
    color:'#af8943', glow:'rgba(200,169,110,.55)',
    accent:'#c8a96e',
    fact:'A Grande Mancha Vermelha é uma tempestade que dura há mais de 350 anos.',
    stat:'Satélites', val:'95 conhecidos', badge:'O Gigante'
  },
  {
    name:'Saturno', type:'Gasoso · 6º',
    color:'#ffecb3', glow:'rgba(226,201,126,.5)',
    accent:'#e2c97e',
    hasRings: true,
    fact:'Seus anéis têm 270 mil km de largura, mas apenas ~1 km de espessura.',
    stat:'Densidade', val:'Menor que a água!', badge:'Anéis Épicos'
  },
  {
    name:'Urano', type:'Gelado · 7º',
    color:'#3ab6b6', glow:'rgba(125,232,232,.5)',
    accent:'#7de8e8',
    fact:'Gira de lado — inclinação de 98°. Um polo fica 42 anos sem ver o sol.',
    stat:'Satélites', val:'27 (nomes Shakespeare)', badge:'Deitado'
  },
  {
    name:'Netuno', type:'Gelado · 8º',
    color:'#315ab9', glow:'rgba(75,123,236,.55)',
    accent:'#4b7bec',
    fact:'Ventos de até 2.100 km/h. Um ano equivale a 165 anos terrestres.',
    stat:'Distância', val:'4,5 bilhões de km', badge:'Ventos Extremos'
  }
];


//PLANET CARDS ---

// Pega o container da grade de planetas no HTML
const grid = document.getElementById('planets-grid');

// Itera sobre cada planeta e cria seu card
for(const p of PLANETS){

  // Cria o elemento do card
  const card = document.createElement('div');
  card.className = 'p-card';

  // Define a cor de destaque como variável CSS (usada no CSS do card via var(--pc))
  card.style.setProperty('--pc', p.accent);

  // Monta o HTML interno do card com os dados do planeta
  card.innerHTML = `
    <div class="p-ball" style="--pb:${p.color};--pg:${p.glow}"></div>
    <div class="p-name">${p.name}</div>
    <div class="p-type">${p.type}</div>
    <div class="p-fact">${p.fact}</div>
    <div class="p-stat">${p.stat}: <b>${p.val}</b></div>
    <span class="p-badge">${p.badge}</span>
  `;

   // Adiciona o card ao grid
  grid.appendChild(card);
}