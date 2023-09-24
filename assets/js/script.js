// Wait for the DOM to finish loading before running the game
document.addEventListener("DOMContentLoaded", function () {
    // Define game choices
    const choices = ["rock", "paper", "scissors", "lizard", "spock"];

    // Initialize user points and remaining tries
    let userScore = 0;
    let tries = 3; // Default to medium level (3 tries)

    // Select all the game buttons by class "game-button"
    const buttons = document.querySelectorAll(".game-button");
    const refreshButton = document.querySelector(".refresh-button");

    // Get the level selection dropdown element
    const levelDropdown = document.getElementById("level");

    // Add a change event listener to the level dropdown
    levelDropdown.addEventListener("change", function () {
        const selectedLevel = levelDropdown.value;
        if (selectedLevel === "easy") {
            tries = 5; // Set to easy level (5 tries)
        } else if (selectedLevel === "medium") {
            tries = 3; // Set to medium level (3 tries)
        } else if (selectedLevel === "hard") {
            tries = 1; // Set to hard level (1 try)
        }
        // Update the remaining tries in the UI
        document.querySelector("#tries").textContent = tries;
    });

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

    // Add click event listener to the "New Game" button
    refreshButton.addEventListener("click", function () {
        // Reload the page to start a new game
        location.reload();
    });

    // Function to determine the game result based on user and computer choices
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

    // Function to update the UI with the game result and remaining tries
    function updateUI(result) {
        document.querySelector("#result p").textContent = getResultText(result);
        document.querySelector("#tries").textContent = tries;
        document.querySelector("#score").textContent = userScore;
    }

    // Function to get the text representation of the game result
    function getResultText(result) {
        if (result === "draw") return "It's a draw!";
        if (result === "win") return "You win!";
        return "You lose!";
    }

    // Function to end the game when tries are exhausted
    function endGame() {
        // Remove click event listeners from game buttons
        buttons.forEach((button) => {
            button.removeEventListener("click", function () {});
        });
        // Display "Game over!" message in the game container
        document.querySelector(".game").innerHTML = "<p>Game over!</p>";

        // Show the "New Game" button when the game ends
        refreshButton.style.display = "block";
    }
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
