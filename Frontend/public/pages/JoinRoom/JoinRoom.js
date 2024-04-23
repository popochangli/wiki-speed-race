import { joinRoom } from "../../api.js";

document.addEventListener("DOMContentLoaded", () => {
  const nextBtn = document.getElementById("nextBtn");
  const nameInput = document.getElementById("game-pin");

  nextBtn.addEventListener("click", async () => {
    const name = nameInput.value;
    //Check if name is not empty
    if (name.trim() !== "") {
      // Make POST API request with the name
      const roomId = localStorage.getItem("roomId");
      const data = await joinRoom(name, roomId);
      // const data = JSON.parse(temp);
      if (data) {
        localStorage.setItem(
          "userId",
          data.users.filter((item) => item.name === name)[0].name
        );
        localStorage.setItem("userName", name);
        window.location.href = "/WaitingRoomUser";
      } else {
        alert("Error please try again.");
      }
    } else {
      alert("Please enter your name.");
    }
  });
});
