import { createRoom } from "../../api.js";
document.addEventListener("DOMContentLoaded", () => {
  const nextBtn = document.getElementById("nextBtn");
  const nameInput = document.getElementById("game-pin");

  nextBtn.addEventListener("click", () => {
    const name = nameInput.value;
    //Check if name is not empty
    if (name.trim() !== "") {
      // Make POST API request with the name
      createRoom(name);
    } else {
      alert("Please enter your name.");
    }
  });
});
