// game choices
const choices = ["rock", "paper", "scissors", "lizard", "spock"];

// user points and tries
let userScore = 0;
let tries = 3;

// select all the buttons with id game
const buttons = document.querySelectorAll("#game button");

buttons.forEach((button) => {
    button.addEventListener("click", function () {
        const userChoice = button.id;
        const computerChoice = choices[Math.floor(Math.random() * choices.length)];

        const result = getResult(userChoice, computerChoice);
        updateUI(result);

        tries--;

        if (tries === 0) {
            endGame();
        }
    });
});

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

function updateUI(result) {
    document.getElementById("result").innerHTML = `
        <p>${getResultText(result)}</p>
        <p>Remaining tries: <span id="tries">${tries}</span></p>
        <p>Score: <span id="score">${userScore}</span></p>
    `;
}

function getResultText(result) {
    if (result === "draw") return "It's a draw!";
    if (result === "win") return "You win!";
    return "You lose!";
}

function endGame() {
    buttons.forEach((button) => {
        button.removeEventListener("click", function () { });
    });
    document.getElementById("game").innerHTML = "<p>Game over!</p>";
}

var button = document.getElementById("refresh");

button.addEventListener("click", function () {
    location.reload();
});