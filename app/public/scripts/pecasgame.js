storageFunc();

const gameContent = document.querySelector(".game-content");
var grupo = [];
const objetivo = Number(getPecasN());
const slotEl = document.getElementsByClassName("slot")[0].cloneNode(true);
const pecaEl = document.getElementsByClassName("peca")[0].cloneNode(true);

function scramble(_arr) {
  var index = _arr.length;
  var rndIndex, temp;
  while (index > 1) {
    for (let i = 0; i < 2; i++) {
      rndIndex = Math.floor(Math.random() * index--);
    }
    temp = _arr[index];
    _arr[index] = _arr[rndIndex];
    _arr[rndIndex] = temp;
  }
}

getItens();

function getItens() {
  grupo = [];
  fetch("../../../public/data/memoria.json")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((obj) => {
        grupo.push({ nome: obj.nome, img: obj.img });
      });
      scramble(grupo);
      grupo = grupo.slice(0, objetivo);
      console.log(grupo);
      prepareGame();
    });
}

var pecas,
  slots,
  selected = null;

function prepareGame() {
  document.getElementsByClassName("slot-house")[0].innerHTML = "";
  document.getElementsByClassName("peca-house")[0].innerHTML = "";

  selected = null;

  prepareImg();
}

function prepareImg() {
  const slothouse = document.getElementsByClassName("slot-house")[0];
  const pecahouse = document.getElementsByClassName("peca-house")[0];

  for (let i = 0; i < objetivo; i++) {
    console.log(i);
    slothouse.appendChild(slotEl.cloneNode(true));
  }

  for (let i = 0; i < objetivo; i++) {
    console.log(i);
    pecahouse.appendChild(pecaEl.cloneNode(true));
  }

  const imgslots = document.getElementsByClassName("imgslot");
  pecas = document.getElementsByClassName("peca");
  slots = document.getElementsByClassName("slot");

  for (let i = 0; i < objetivo; i++) {
    imgslots[i].src = grupo[i].img;
  }

  var arr = [];

  for (let i = 0; i < grupo.length; i++) {
    let x = grupo[i].nome;
    console.log(x);
    arr.push(x);
  }

  scramble(arr);

  console.log(arr);

  for (let i = 0; i < objetivo; i++) {
    pecas[i].innerText = arr[i];
  }

  for (let peca of pecas) {
    peca.addEventListener("dragstart", (e) => {
      selected = e.target;
      console.log("selected!");
      console.log(selected);
    });
  }

  for (let slot of slots) {
    slot.addEventListener("dragover", (e) => {
      e.preventDefault();
    });
    slot.addEventListener("drop", (e) => {
      slot.appendChild(selected.cloneNode(true));
      selected.remove();
      selected = null;
      console.log("drop");
      if (noPecasLeft()) {
        if (verificarVitoria()) {
          openModal();
        } else {
          resetarpecas();
        }
      }
    });
  }

  function noPecasLeft() {
    const pecas = document.getElementsByClassName("peca-house")[0];
    for (peca of pecas.childNodes) {
      if (peca.className == "peca") {
        return false;
      }
    }
    return true;
  }
}

function resetarpecas() {
  prepareGame();
}

function verificarVitoria() {
  for (let i = 0; i < objetivo; i++) {
    if (grupo[i].nome != slots[i].innerText) {
      return false;
    }
  }
  return true;
}

/*
dragElement(document.getElementById("peca1"));
dragElement(document.getElementById("peca2"));
dragElement(document.getElementById("peca3"));

function dragElement(elmnt) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  const clone = elmnt.lastChild.cloneNode(true);

  clone.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
*/
