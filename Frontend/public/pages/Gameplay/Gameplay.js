import { gameEnd, nextPage, getRoom } from "../../api.js";
import wtf from "https://cdn.skypack.dev/wtf_wikipedia";

let userId = localStorage.getItem("userId");
let linksClickedCount = 0;
const roomId = localStorage.getItem("roomId");

setInterval(async () => {
  const data = await getRoom(roomId);
  if (
    data.gameEndStatus ||
    data.users.filter((item) => item.user === userId)[0].status
  ) {
    window.location.href = "/EndingRoom";
  }
}, 3000);

window.addEventListener("keydown", function (event) {
  // Check if Ctrl (or Cmd for Mac) + F is pressed
  if ((event.ctrlKey || event.metaKey) && event.key === "f") {
    event.preventDefault();
    // Optionally, you can add a message or take any action here
    alert("ฮั่นแน่ หาด้วยตัวเองสิจ๊ะ");
  }
});

const loadArticle = async (article) => {
  let doc = await wtf.fetch(article, "en");
  doc = doc.json();
  const title = document.getElementById("title");
  title.textContent = `${doc.title}`;
  const content = document.getElementById("content");
  content.innerHTML = "";
  doc.sections.forEach((sections) => {
    const h2Element = document.createElement("h2");
    h2Element.className =
      "py-4 text-2xl font-medium border-b-[1px] border-b-gray-300 text-black";
    h2Element.textContent = `${sections.title}`;
    if (sections.title && sections.paragraphs) {
      content.appendChild(h2Element);
    }
    sections.paragraphs?.forEach((element) => {
      const arrayText = element.sentences?.reduce((collect, currentData) => {
        if (currentData.links) {
          let tempLinks = currentData.links?.filter((item) => item);
          let tempDic = {};
          tempLinks = tempLinks.map((item) => {
            if (item.text) {
              tempDic[item.text] = item.page;
            }
          });
          let tempText = currentData.text;
          Object.keys(tempDic).forEach((links) => {
            tempText = tempText.replace(
              links,
              `<button class="text-blue-600 link-button hover:underline hover:text-blue-700" value="${tempDic[links]}">${links}</button>`
            );
          });
          return collect + " " + tempText;
        }
        return collect + " " + currentData.text;
      }, "");
      const pElement = document.createElement("p");
      pElement.className = "py-4";
      pElement.innerHTML = `${arrayText}`;
      pElement.addEventListener("click", function (event) {
        // Check if the clicked element is a button with the class "link-button"
        if (event.target.matches(".link-button")) {
          // Retrieve the link associated with the button
          const link = event.target.value;
          loadArticle(link);
          updateCurrentArticle(link);
          localStorage.setItem("current", link);
          updateLinksClicked();
          nextPage(userId, link, roomId);
          window.scrollTo(0, 0);
        }
      });
      content.appendChild(pElement);
    });

    // Create p element
  });
};

let timer = 0;
let intervalId;

function startTimer(duration) {
  timer = duration;
  intervalId = setInterval(() => {
    timer--;
    localStorage.setItem("timer", timer);
    // Convert remaining time to minutes and seconds
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;

    // Update the "Time Elapsed" element
    const timeElapsedElement = document.getElementById("time-elapsed");
    timeElapsedElement.textContent = `${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds} s`;

    if (timer <= 0) {
      clearInterval(intervalId); // Stop the timer
      gameEnd(roomId);
      window.location.href = "/EndingRoom";
    }
  }, 1000); // Update every 1 second
}

function updateGoalArticle(content) {
  const goalArticleElement = document.getElementById("goal-article");
  if (goalArticleElement) {
    goalArticleElement.textContent = content;
  }
}

function updateCurrentArticle(content) {
  const currentArticleElement = document.getElementById("current-article");
  if (currentArticleElement) {
    currentArticleElement.textContent = content;
  }
}

function updateLinksClicked(increment = 1) {
  linksClickedCount += increment;
  const linksClickedElement = document.getElementById("links-clicked");
  if (linksClickedElement) {
    linksClickedElement.textContent = linksClickedCount;
  }
}
document.addEventListener("DOMContentLoaded", () => {
  // Example usage:]
  const timer = localStorage.getItem("timer");
  const current = localStorage.getItem("current");
  let timeLimit;
  if (timer) {
    timeLimit = timer;
  } else {
    timeLimit = localStorage.getItem("timeLimit") - 0;
  }
  let article;
  if (current) {
    article = current;
  } else {
    article = localStorage.getItem("start");
  }

  const goal = localStorage.getItem("goal");

  loadArticle(article === "" ? "Glastonbury" : article);
  startTimer(timeLimit); // Start a timer for 5 minutes (300 seconds)
  updateCurrentArticle(article === "" ? "Emerald" : article);
  updateGoalArticle(goal === "" ? "Glastonbury" : goal);
  updateLinksClicked(linksClickedCount); // Set the "Links clicked" count to 5
});
