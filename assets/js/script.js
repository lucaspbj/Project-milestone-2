document.addEventListener("DOMContentLoaded", function () {
    // game choices
    const choices = ["rock", "paper", "scissors", "lizard", "spock"];
  
    // user points and tries
    let userScore = 0;
    let tries = 3;
  
    // select all the game buttons by class "game-button"
    const buttons = document.querySelectorAll(".game-button");
    const refreshButton = document.querySelector(".refresh-button");
  
    buttons.forEach((button) => {
      button.addEventListener("click", function () {
        const userChoice = button.getAttribute("data-choice");
        const computerChoice = choices[Math.floor(Math.random() * choices.length)];
  
        // Atualiza as escolhas do usuário e do computador no HTML
        document.getElementById("user-choice").textContent = `Your choice: ${userChoice}`;
        document.getElementById("computer-choice").textContent = `Computer's choice: ${computerChoice}`;
  
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
      document.querySelector("#result p").textContent = getResultText(result);
      document.querySelector("#tries").textContent = tries;
      document.querySelector("#score").textContent = userScore;
    }
  
    function getResultText(result) {
      if (result === "draw") return "It's a draw!";
      if (result === "win") return "You win!";
      return "You lose!";
    }
  
    function endGame() {
      buttons.forEach((button) => {
        button.removeEventListener("click", function () {});
      });
      document.querySelector(".game").innerHTML = "<p>Game over!</p>";
  
      // Mostra o botão "New Game" quando o jogo termina
      refreshButton.style.display = "block";
    }
  
    // button for new game
    refreshButton.addEventListener("click", function () {
      location.reload();
    });
  });
  
  // No seu código JavaScript existente...
const instructionButton = document.querySelector(".instruction-button");
const popup = document.querySelector(".popup");
const closeButton = document.querySelector(".close-button");

instructionButton.addEventListener("click", () => {
    popup.style.display = "block"; // Mostra a janela modal ao clicar no botão de instruções
});

closeButton.addEventListener("click", () => {
    popup.style.display = "none"; // Fecha a janela modal ao clicar no botão de fechar
});

// Fechar a janela modal ao clicar fora dela
window.addEventListener("click", (event) => {
    if (event.target === popup) {
        popup.style.display = "none";
    }
});
