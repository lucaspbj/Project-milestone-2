// Wait for the DOM to finish loading before running the game
document.addEventListener("DOMContentLoaded", function () {
    // Define game choices
    const choices = ["rock", "paper", "scissors", "lizard", "spock"];

    // Initialize user points and remaining tries
    let userScore = 0;
    let tries = 3;

    // Select all the game buttons by class "game-button"
    const buttons = document.querySelectorAll(".game-button");
    const refreshButton = document.querySelector(".refresh-button");

 // Add click event listeners to each game button
buttons.forEach((button) => {
    button.addEventListener("click", function () {
        const userChoice = button.getAttribute("data-choice");
        const computerChoice = choices[Math.floor(Math.random() * choices.length)];

        // Update user and computer choices in the HTML
        document.getElementById("user-choice").textContent = `Your choice: ${userChoice}`;
        document.getElementById("computer-choice").textContent = `Computer's choice: ${computerChoice}`;

        // Update user and computer choice images
        document.getElementById("user-choice-img").src = `assets/images/${userChoice}.png`;
        document.getElementById("computer-choice-img").src = `assets/images/${computerChoice}.png`;

        const result = getResult(userChoice, computerChoice);
        updateUI(result);

        tries--;

        if (tries === 0) {
            endGame();
        }
    });
});


    // Determine the game result based on user and computer choices
    function getResult(user, computer) {
        if (user === computer) return "draw";
        if (
            (user === "rock" && (computer === "scissors" || computer === "lizard")) ||
            (user === "paper" && (computer === "rock" || computer === "spock")) ||
            (user === "scissors" && (computer === "paper" || computer === "lizard")) ||
            (user === "lizard" && (computer === "spock" || computer === "paper")) ||
            (user === "spock" && (computer === "rock" || computer === "scissors"))
        ) {
            userScore++;
            return "win";
        }
        return "lose";
    }

    // Update the UI with the game result and remaining tries
    function updateUI(result) {
        document.querySelector("#result p").textContent = getResultText(result);
        document.querySelector("#tries").textContent = tries;
        document.querySelector("#score").textContent = userScore;
    }

    // Get the text representation of the game result
    function getResultText(result) {
        if (result === "draw") return "It's a draw!";
        if (result === "win") return "You win!";
        return "You lose!";
    }

    // End the game when tries are exhausted
    function endGame() {
        // Remove click event listeners from game buttons
        buttons.forEach((button) => {
            button.removeEventListener("click", function () { });
        });
        // Display "Game over!" message in the game container
        document.querySelector(".game").innerHTML = "<p>Game over!</p>";

        // Show the "New Game" button when the game ends
        refreshButton.style.display = "block";
    }

    // Add click event listener to the "New Game" button
    refreshButton.addEventListener("click", function () {
        // Reload the page to start a new game
        location.reload();
    });
});

// Additional code outside of the main game logic

// Show instructions popup when the instruction button is clicked
const instructionButton = document.querySelector(".instruction-button");
const popup = document.querySelector(".popup");
const closeButton = document.querySelector(".close-button");

instructionButton.addEventListener("click", () => {
    popup.style.display = "block";
});

// Close the instructions popup when the close button is clicked
closeButton.addEventListener("click", () => {
    popup.style.display = "none";
});

// Close the instructions popup when clicking outside of it
window.addEventListener("click", (event) => {
    if (event.target === popup) {
        popup.style.display = "none";
    }
});
