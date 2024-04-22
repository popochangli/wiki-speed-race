function generateRandomSixDigitNumber() {
  let temp = [];
  for (let i = 0; i < 6; i++) {
    temp.push(Math.floor(Math.random() * 10));
  }
  return `${temp.slice(0, 3).join("")} ${temp.slice(3, 6).join("")}`;
}

const randomSixDigitNumber = generateRandomSixDigitNumber();
const gamePin = document.getElementById("game-pin");
gamePin.textContent = randomSixDigitNumber;

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
setTimelimit(1, 10);
