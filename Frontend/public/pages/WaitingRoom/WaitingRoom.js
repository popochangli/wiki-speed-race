const gamePin = document.getElementById("game-pin");
const gameMasterName = document.getElementById("gameMasterName");
const roomId = localStorage.getItem("roomId");
const gmName = localStorage.getItem("userName");
gamePin.textContent = `${roomId.slice(0, 3)} ${roomId.slice(3, 6)}`;
console.log(gmName);
gameMasterName.textContent = `${gmName}`;

function toggleModal() {
  var modal = document.getElementById("myModal");
  modal.classList.toggle("hidden");
  document.getElementById("myModal2").classList.toggle("hidden");
}

function submitForm() {
  var startValue = document.getElementById("startInput").value;
  var goalValue = document.getElementById("goalInput").value;
  // Do something with startValue and goalValue, like sending them to a server
  // For now, just log them
  console.log("Start:", startValue === "" ? "random" : startValue);
  console.log("Goal:", goalValue === "" ? "random" : goalValue);
  console.log("TimeLimit:", timeLimit);
  // Close the modal
  toggleModal();
}

// Set time limit
const buttons = document.getElementById("timeLimit");
let timeLimit;
function setTimelimit(index, value) {
  let i = 0;
  for (const temp of buttons.children) {
    if (i === index) {
      temp.classList.add("border-sky-600");
      timeLimit = value;
    } else {
      temp.classList.remove("border-sky-600");
    }
    i++;
  }
}
setTimelimit(0, 5);

document.addEventListener("DOMContentLoaded", () => {
  const settingBtn = document.getElementById("setting");
  const closeBtn = document.getElementById("closeBtn");
  settingBtn.addEventListener("click", toggleModal);
  closeBtn.addEventListener("click", toggleModal);
});

const loadMember = async () => {
  // Find the element with the ID "memberlist"
  const raw = "";

  const requestOptions = {
    method: "GET",
    body: raw,
    redirect: "follow",
  };

  const data = await fetch(
    `http://localhost:3222/game/rooms/${roomId}`,
    requestOptions
  )
    .then((response) => response.json())
    .catch((error) => console.error(error));
  if (data) {
  } else {
    console.log("error try again");
  }
  const memberList = document.getElementById("memberlist");
  // เดี๋ยวมาทำต่อรอไอแม้กแก้
  // Create a new div element
  const newMember = document.createElement("div");
  newMember.classList.add(
    "border-[1px]",
    "p-2",
    "rounded",
    "flex",
    "justify-between"
  );

  // Create the inner HTML content for the new member div
  newMember.innerHTML = `
      <div class="flex item-center gap-2">
          <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
          >
              <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
          </svg>
          <p>Name of player</p>
      </div>
      <button class="text-red-500 hover:text-red-700 active:text-red-800">
          <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
          >
              <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18 18 6M6 6l12 12"
              />
          </svg>
      </button>
  `;

  // Append the new member div to the memberList element
  memberList.appendChild(newMember);
};
