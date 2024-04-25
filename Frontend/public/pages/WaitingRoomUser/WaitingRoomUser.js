import { getRoom } from "../../api.js";

const gamePin = document.getElementById("game-pin");
const roomId = localStorage.getItem("roomId");
const userName = localStorage.getItem("userName");
gamePin.textContent = `${roomId.slice(0, 3)} ${roomId.slice(3, 6)}`;

// Set time limi

const loadMember = async () => {
  // Find the element with the ID "memberlist"

  const memberList = document.getElementById("memberList");

  // เดี๋ยวมาทำต่อรอไอแม้กแก้
  let check = false;
  const data = await getRoom(roomId);

  if (data) {
    if (!data.waitingStatus) {
      window.localStorage.setItem("goal", data.goal);
      window.localStorage.setItem("start", data.start);
      window.localStorage.setItem("timeLimit", data.timeLimit);
      window.location.href = "/GamePlay";
    }
    data.users.forEach((element) => {
      if (element.user === data.gameMasterId) {
        memberList.innerHTML = `<div class="self-center text-sm font-bold text-zinc-700">
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
        
          <p id="gameMasterName">${element.name}</p>
        </div>
        </div>`;
        return;
      }
      if (element.name === userName) {
        check = true;
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

      // Append the button to the document body or any other desired parent element
      memberList.appendChild(newMember);
    });
    if (!check) {
      window.location.href = "/";
      localStorage.removeItem("roomId");
      localStorage.removeItem("userId");
      localStorage.removeItem("userName");
    }
  }
};

loadMember(roomId);

setInterval(() => {
  loadMember(roomId);
}, 3000);
