const gameContent = document.querySelector(".game-content");
var grupo = [];
const objetivo = Number(getPecasN());

function getItens() {
  fetch("../../../public/data/memoria.json")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((obj) => {
        grupo.push({ nome: obj.nome, img: obj.img });
      });
      let index = grupo.length;
      let rndIndex, temp;
      while (index !== 0) {
        for (let i = 0; i < 2; i++) {
          rndIndex = Math.floor(Math.random() * index--);
        }
        temp = grupo[index];
        grupo[index] = grupo[rndIndex];
        grupo[rndIndex] = temp;
      }
      grupo = grupo.slice(0, objetivo);
      console.log(grupo);
    });
}

var pecas,
  slots,
  selected = null;

prepareGame();

function prepareImg() {
  const imgslots = document.getElementsByClassName("imgslot");
  for (let i = 0; i < objetivo; i++) {
    imgslots[i].setAttribute("src", grupo[i]);
  }
}

function prepareGame() {
  pecas = document.getElementsByClassName("peca");
  slots = document.getElementsByClassName("slot");
  selected = null;

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
    });
  }
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
