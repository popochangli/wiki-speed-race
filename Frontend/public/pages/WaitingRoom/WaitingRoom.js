import { getRoom, kick } from "../../api.js";

const gamePin = document.getElementById("game-pin");
const roomId = localStorage.getItem("roomId");
const gmName = localStorage.getItem("userName");
gamePin.textContent = `${roomId.slice(0, 3)} ${roomId.slice(3, 6)}`;

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
  const tempHost = `<div class="self-center text-sm font-bold text-zinc-700">
  Member List
  </div>
  <div class="border-[1px] p-2 rounded flex justify-between">
  <div class="flex item-center gap-2">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-6 h-6 fill-sky-300"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
      />
    </svg>
  
    <p id="gameMasterName">${gmName}</p>
  </div>
  </div>`;

  const memberList = document.getElementById("memberList");

  // เดี๋ยวมาทำต่อรอไอแม้กแก้
  const data = await getRoom(roomId);

  if (data) {
    data.users.forEach((element) => {
      if (element.name === gmName) {
        memberList.innerHTML = tempHost;
        return;
      }
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
          <p>${element.name}</p>
      </div>`;
      // Create the button element
      const button = document.createElement("button");

      // Add classes to the button
      button.className = "text-red-500 hover:text-red-700 active:text-red-800";

      // Create the SVG element
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

      // Set attributes for the SVG element
      svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
      svg.setAttribute("fill", "none");
      svg.setAttribute("viewBox", "0 0 24 24");
      svg.setAttribute("stroke-width", "1.5");
      svg.setAttribute("stroke", "currentColor");
      svg.setAttribute("class", "w-6 h-6");

      // Create the path element inside the SVG
      const path = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );

      // Set attributes for the path element
      path.setAttribute("stroke-linecap", "round");
      path.setAttribute("stroke-linejoin", "round");
      path.setAttribute("d", "M6 18 18 6M6 6l12 12");

      // Append the path to the SVG
      svg.appendChild(path);

      // Append the SVG to the button
      button.appendChild(svg);

      // Add click event listener to the button
      button.addEventListener("click", async function () {
        await kick(roomId, element.user);
        await loadMember(roomId);
        // Add your click event logic here
      });

      // Append the button to the document body or any other desired parent element
      newMember.appendChild(button);
      memberList.appendChild(newMember);
    });
  }
};

loadMember(roomId);

setInterval(() => {
  loadMember(roomId);
}, 3000);
