function storageFunc() {
  if (!localStorage.getItem("libras-game-app") == "true") {
    createStorage();
  }
}

function createStorage() {
  localStorage.setItem("libras-game-app", "true");
  
}

storageFunc();
