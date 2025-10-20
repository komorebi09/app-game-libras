storageFunc();

var wordset = [];
var index = Number(getPalavrasAssocN()) - 1;
var word = "";
var acertos = 0;

const azul = "#9dcfeeff",
  rosa = "#FFD1DC",
  verde = "#9bf8b7ff";

fetch("../../../public/data/associacao.json")
  .then((res) => res.json())
  .then((data) => {
    wordset = shuffleArray(data, index + 1);
    console.log(wordset);
    gameStep();
  });

function shuffleArray(array, par) {
  var arr = [...array];

  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  if (par != 0) {
    arr = arr.slice(0, par);
  }

  return arr;
}

function shuffleAltern(ch) {
  word = ch;
  document.getElementById("initial").innerText = word.charAt(0);
  document.getElementById("noninitial").innerText = word.substring(1);
  ch = ch.charAt(0);
  var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  str = str.replace(ch, "");
  const a = str.charAt(Math.floor(Math.random() * str.length));
  str = str.replace(a, "");
  const b = str.charAt(Math.floor(Math.random() * str.length));
  return shuffleArray([a, b, ch], 0);
}

function gameStep() {
  if (index < 0) {
    openModal();
    document.getElementById("acertos").innerText = acertos;
    addPalavrasAssocAcertos(acertos);
    return;
  }
  console.log(wordset[index]);
  document.getElementsByClassName("word")[0].classList.add("hid");
  document.getElementsByClassName("ilustracao")[0].src = wordset[index].img;
  var alter = shuffleAltern(wordset[index--].nome);
  const el = document.getElementsByClassName("op");
  const color = shuffleArray([azul, rosa, verde], 0);
  for (let i = 0; i < el.length; i++) {
    el[i].innerHTML = "<span>" + alter[i] + "</span>";
    el[i].style.backgroundColor = color[i];
  }
}

function selectAlt(item) {
  if (item.innerText == word.charAt(0)) {
    acertos++;
  }

  showDica(false);

  setTimeout(gameStep, 2200);
}

function showDica(partial) {
  const word = document.getElementsByClassName("word")[0];
  word.classList.remove("hid");
  if (partial) {
    document.getElementById("noninitial").style.backgroundColor = "black";
  } else
    document.getElementById("noninitial").style.backgroundColor = "transparent";
  word.style.animation = "showDica 400ms ease-in 0s 1 normal forwards";
}
