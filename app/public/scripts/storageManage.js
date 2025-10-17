function storageFunc() {
  if (localStorage.getItem("libras-game-app") == "true") return;
  createStorage();
}

function setMemoriaCardN(n) {
  localStorage.setItem("libras-game-app-memn", n);
}

function getMemoriaCardN() {
  return localStorage.getItem("libras-game-app-memn");
}

function setPalavrasAssocN(n) {
  localStorage.setItem("libras-game-app-palassoc", n);
}

function getPalavrasAssocN() {
  return localStorage.getItem("libras-game-app-palassoc");
}

function setPecasN(n) {
  localStorage.setItem("libras-game-app-pecasn", n);
}

function getPecasN() {
  return localStorage.getItem("libras-game-app-pecasn");
}

function addPalavrasAssocAcertos(n) {
  localStorage.setItem(
    "libras-game-app-palassoc-acert",
    getPalavrasAssocAcertos() + n
  );
}

function setPalavrasAssocAcertos(n) {
  localStorage.setItem("libras-game-app-palassoc-acert", n);
}

function getPalavrasAssocAcertos() {
  return localStorage.getItem("libras-game-app-palassoc-acert");
}

function createStorage() {
  setMemoriaCardN(8);
  setPalavrasAssocN(7);
  setPecasN(5);
  setPalavrasAssocAcertos(0);
  localStorage.setItem("libras-game-app", "true");
}

function dropStorage() {
  localStorage.removeItem("libras-game-app-memn");
  localStorage.removeItem("libras-game-app-palassoc");
  localStorage.removeItem("libras-game-app-pecasn");
  localStorage.removeItem("libras-game-app-palassoc-acert");
  localStorage.removeItem("libras-game-app");
}
