document.addEventListener("DOMContentLoaded", () => {
    let linksClickedCount = 0;
    let timer = 0;
    let intervalId;

    function startTimer(duration) {
        timer = duration;
        intervalId = setInterval(() => {
            timer--;

            // Convert remaining time to minutes and seconds
            const minutes = Math.floor(timer / 60);
            const seconds = timer % 60;

            // Update the "Time Elapsed" element
            const timeElapsedElement = document.getElementById("time-elapsed");
            timeElapsedElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds} s`;

            if (timer <= 0) {
                clearInterval(intervalId); // Stop the timer
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

    // Example usage:
    startTimer(1200); // Start a timer for 5 minutes (300 seconds)
    updateGoalArticle("Emerald");
    updateCurrentArticle("Diamond");
    updateLinksClicked(1000); // Set the "Links clicked" count to 5
});
