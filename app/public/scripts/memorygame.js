const gameContent = document.querySelector(".card-display");
gameContent.innerHTML = "";
var cards = [];
var card1 = null,
  card2 = null;
var lockcard = false;
const objetivo = 8;
var totalPares = 0;

fetch("../../../public/data/memoria.json")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((obj) => {
      if (cards.length === objetivo * 2) return;
      cards.push({ nome: obj.nome, img: obj.img });
      cards.push({ nome: obj.nome, img: null });
    });
    embaralhar();
    distribuir();
  });

function embaralhar() {
  let index = cards.length;
  let rndIndex, temp;
  while (index !== 0) {
    rndIndex = Math.floor(Math.random() * index--);
    temp = cards[index];
    cards[index] = cards[rndIndex];
    cards[rndIndex] = temp;
  }
}

function distribuir() {
  for (let card of cards) {
    const el = document.createElement("div");
    el.classList.add("card");
    el.setAttribute("data-nome", card.nome);
    if (card.img == null)
      el.innerHTML = `
    <div class="card-front">
        <p class="card-image">${card.nome}</p>
    </div>
    <div class="card-back"></div>
    `;
    else
      el.innerHTML = `
    <div class="card-front">
        <img class="card-image" src=${card.img}>
    </div>
    <div class="card-back"></div>
    `;
    gameContent.appendChild(el);
    el.addEventListener("click", flip);
  }
}

function flip() {
  if (lockcard) return;
  if (this === card1) return;

  this.classList.add("flip");

  if (!card1) {
    card1 = this;
    return;
  }

  card2 = this;
  lockcard = true;
  console.log(`
    card1: ${card1}
    card2: ${card2}
    lock: ${lockcard}
    `);
  comparar();
}

function comparar() {
  const x = card1.dataset.nome === card2.dataset.nome;
  if (x) matarPar();
  else desfazerJogada();
}

function matarPar() {
  card1.removeEventListener("click", flip);
  card2.removeEventListener("click", flip);
  totalPares++;
  updateProgressBar();
  novaJogada();
}

function desfazerJogada() {
  setTimeout(() => {
    card1.classList.remove("flip");
    card2.classList.remove("flip");
    novaJogada();
  }, 700);
}

function novaJogada() {
  card1 = null;
  card2 = null;
  lockcard = false;
}

function restart() {
  novaJogada();
  gameContent.innerHTML = "";
  embaralhar();
  distribuir();
}

function updateProgressBar() {
  const bar = document.querySelector(".bar");
  const cstyle = getComputedStyle(bar);
  bar.style.setProperty("--width", totalPares / objetivo);
}
