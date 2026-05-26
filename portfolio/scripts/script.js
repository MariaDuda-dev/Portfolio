// Modo claro/escuro
const botao = document.getElementById("modoClaroEscuro");
let escuro = false;

botao.addEventListener("click", function() {
  escuro = !escuro;
  if (escuro) {
    document.body.classList.add("dark");
    botao.textContent = "Modo claro";
  } else {
    document.body.classList.remove("dark");
    botao.textContent = "Modo escuro";
  }
});

// Calcular tempo de curso
function calcular() {
  const inicio = new Date(document.getElementById("dataInicio").value);
  const fim    = new Date(document.getElementById("dataFim").value);
  const el     = document.getElementById("tempoRestante");

  if (isNaN(inicio.getTime()) || isNaN(fim.getTime())) {
    el.classList.add("visivel");
    el.textContent = "Preencha as duas datas.";
    return;
  }
  if (fim <= inicio) {
    el.classList.add("visivel");
    el.textContent = "Parabéns, você formou!";
    return;
  }

  let anos  = fim.getFullYear() - inicio.getFullYear();
  let meses = fim.getMonth()    - inicio.getMonth();
  let dias  = fim.getDate()     - inicio.getDate();

  if (dias < 0) { meses--; dias += new Date(fim.getFullYear(), fim.getMonth(), 0).getDate(); }
  if (meses < 0) { anos--; meses += 12; }

  let partes = [];
  if (anos  > 0) partes.push(anos  + " ano"  + (anos  > 1 ? "s" : ""));
  if (meses > 0) partes.push(meses + " mês"  + (meses > 1 ? "es" : ""));
  if (dias  > 0) partes.push(dias  + " dia"  + (dias  > 1 ? "s" : ""));

  const suffix = anos <= 0 ? " — você está na reta final!" : "";
  el.classList.add("visivel");
  el.textContent = "Tempo restante: " + (partes.join(" | ") || "Menos de um dia!") + suffix;
}

// Quiz
let pontosFront = 0;
let pontosBack  = 0;

document.getElementById("btn-visual").addEventListener("click", function() {
  pontosFront++;
  document.getElementById("btn-visual").classList.add("ativo");
  document.getElementById("btn-logica").classList.remove("ativo");
  mostrarPerfil();
});

document.getElementById("btn-logica").addEventListener("click", function() {
  pontosBack++;
  document.getElementById("btn-logica").classList.add("ativo");
  document.getElementById("btn-visual").classList.remove("ativo");
  mostrarPerfil();
});

function mostrarPerfil() {
  const el = document.getElementById("resultado-quiz");
  el.classList.add("visivel");
  if (pontosFront > pontosBack)      el.textContent = "Você tem perfil Front-End!";
  else if (pontosBack > pontosFront) el.textContent = "Você tem perfil Back-End!";
  else                               el.textContent = "Você tem perfil Full Stack!";
}

for (/**Gatilho inicial/começo*/ let i=0; /*limite,limitador,roda enquanto*/i<= 20; i++/*incremento e decremento */){
  let pares = (i % 2 === 0)? "Par" : "impar";
  console.log(`${i} - ${pares} `);
}

let object = {
  nome: "Maria Duda",
  Idade: "18",
  profissao: "tecnica em desenvolvimento de sistemas"
}
for (let chave in object) {
  document.write(`<p> ${chave} : ${object[chave]}</p>`);
}


let alunos = ["Maria", "Biel", "Guel"];
for (let conten of alunos) {
  if (conten === "Maria") {
    document.write(`<p> ${conten} - Presente </p>`);
  } else {
    document.write(`<p> ${conten} - Ausente </p>`);
  }
}

let num = prompt("Digite um número par: ");
while (num % 2 !== 0) {
  num = prompt ("Ops, esse número não é par. Tenta denovo ai fi")
}

do {
  num = prompt("Diga um número par: ")
} while (num % 2 !== 0)
