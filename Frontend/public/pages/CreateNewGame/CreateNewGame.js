import { createRoom } from "../../api.js";
document.addEventListener("DOMContentLoaded", () => {
  const nextBtn = document.getElementById("nextBtn");
  const nameInput = document.getElementById("game-pin");

  nextBtn.addEventListener("click", async () => {
    const name = nameInput.value;
    //Check if name is not empty
    if (name.trim() !== "") {
      // Make POST API request with the name
      const data = await createRoom(name);
      // const data = JSON.parse(temp);
      if (data) {
        localStorage.setItem("roomId", data.roomId);
        localStorage.setItem("userId", data.gameMasterId);
        localStorage.setItem("userName", name);
        // window.location.href = "/WaitingRoom";
      } else {
        alert("Error please try again.");
      }
    } else {
      alert("Please enter your name.");
    }
  });
});
