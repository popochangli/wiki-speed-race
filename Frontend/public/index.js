import { getRoom } from "../../api.js";

for (var key in localStorage) {
  if (localStorage.hasOwnProperty(key)) {
    // Remove the item corresponding to the current key
    localStorage.removeItem(key);
  }
}

document
  .getElementById("enter-button")
  .addEventListener("click", async function () {
    var gamePinInput = document.getElementById("game-pin").value.trim();
    if (/^\d+$/.test(gamePinInput)) {
      const data = await getRoom(gamePinInput);

      if (data) {
        localStorage.setItem("roomId", data.roomId);
        window.location.href = "/JoinRoom";
      } else {
        alert("Room not found please try again.");
      }
    } else {
      // Input contains non-numeric characters
      alert("Please enter only numbers for the PIN.");
    }
  });
