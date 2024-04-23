document.addEventListener("DOMContentLoaded", () => {
  const nextBtn = document.getElementById("nextBtn");
  const nameInput = document.getElementById("game-pin");

  nextBtn.addEventListener("click", () => {
    const name = nameInput.value;
    Check if name is not empty
    if (name.trim() !== "") {
      // Make POST API request with the name
      fetch("YOUR_POST_API_URL", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      })
        .then((response) => {
          if (response.ok) {
            // Redirect to the next page after successful POST request
            window.location.href = "../WaitingRoom/WaitingRoom.html";
          } else {
            throw new Error("Failed to send name to server.");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          // Handle error if needed
        });
    } else {
      alert("Please enter your name.");
    }
  });
});
