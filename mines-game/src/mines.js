document.addEventListener("DOMContentLoaded", () => {
  const DOMselectors = {
    gameContainer: document.querySelector(".game-container"),
    gameBoard: document.querySelector("#mines-board"),
    playButton: document.querySelector(".game-container button.bg-yellow-300"),
    amountInput: document.querySelector(".game-container input[type='text']"),
    minesSelect: document.querySelector(".game-container select"),
    balancePanel: document.querySelector(".balance-panel p"),
    popup: document.createElement("div"),
  };

  let mines = [];
  let revealedTiles = 0;
  let gameStarted = false;
  let balance = 100;

  // Initialize popup
  DOMselectors.popup.classList.add("popup");
  DOMselectors.gameBoard.appendChild(DOMselectors.popup);

  function startGame() {
    const amount = parseFloat(DOMselectors.amountInput.value);
    const mineCount = parseInt(DOMselectors.minesSelect.value);

    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    mines = generateMines(mineCount);
    revealedTiles = 0;
    gameStarted = true;
    DOMselectors.playButton.textContent = "Cash Out";
    DOMselectors.playButton.removeEventListener("click", startGame);
    DOMselectors.playButton.addEventListener("click", cashOut);

    DOMselectors.gameBoard.querySelectorAll(".mine").forEach((tile) => {
      tile.classList.remove("revealed", "mine-tile", "safe-tile");
      tile.innerHTML = "";
      tile.addEventListener("click", revealTile);
    });
  }

  function generateMines(count) {
    const minePositions = new Set();
    while (minePositions.size < count) {
      const randomPosition = Math.floor(Math.random() * 25) + 1;
      minePositions.add(randomPosition);
    }
    return Array.from(minePositions);
  }

  function revealTile(event) {
    if (!gameStarted) return;

    const tile = event.currentTarget;
    const tileId = parseInt(tile.id);

    if (mines.includes(tileId)) {
      tile.classList.add("mine-tile");
      tile.innerHTML =
        '<img src="src/bomb.svg" alt="Mine" style="width: 100%; height: 100%;">';
      playSound("src/boom.mp3");
      endGame(false);
    } else {
      tile.classList.add("safe-tile");
      tile.innerHTML =
        '<img src="src/gem.svg" alt="Gem" style="width: 100%; height: 100%;">';
      console.log(`Revealed tile ${tileId} as safe.`);
      playSound("src/chime.mp3");
      revealedTiles++;
      if (revealedTiles === 25 - mines.length) {
        endGame(true);
      }
    }

    tile.classList.add("revealed");
    tile.removeEventListener("click", revealTile);
  }

  function endGame(won) {
    gameStarted = false;
    DOMselectors.playButton.textContent = "Play";
    DOMselectors.playButton.removeEventListener("click", cashOut);
    DOMselectors.playButton.addEventListener("click", startGame);

    revealBoard();

    if (won) {
      const amount = parseFloat(DOMselectors.amountInput.value);
      const mineCount = parseInt(DOMselectors.minesSelect.value);
      const profit = calculateProfit(revealedTiles, mineCount);
      const winnings = profit * amount;
      balance += winnings;
      showPopup(
        `Multiplier: ${profit.toFixed(2)}x<br>Winnings: $${winnings.toFixed(2)}`,
      );
    } else {
      const amount = parseFloat(DOMselectors.amountInput.value);
      balance -= amount;
      showPopup("You lost! Try again.");
    }

    DOMselectors.balancePanel.textContent = `Balance: $${balance.toFixed(2)}`;
  }

  function cashOut() {
    playSound("src/cashout.wav");
    endGame(true);
  }

  function revealBoard() {
    DOMselectors.gameBoard.querySelectorAll(".mine").forEach((tile) => {
      const tileId = parseInt(tile.id);
      if (mines.includes(tileId)) {
        tile.classList.add("mine-tile");
        tile.innerHTML =
          '<img src="src/bomb.svg" alt="Mine" style="width: 100%; height: 100%;">';
      } else {
        tile.classList.add("safe-tile");
        tile.innerHTML =
          '<img src="src/gem.svg" alt="Gem" style="width: 100%; height: 100%;">';
      }
      tile.classList.add("revealed");
      tile.removeEventListener("click", revealTile);
    });
  }

  function playSound(src) {
    const audio = new Audio(src);
    audio.play();
  }

  function showPopup(message) {
    DOMselectors.popup.innerHTML = message;
    DOMselectors.popup.classList.add("show");
    setTimeout(() => {
      DOMselectors.popup.classList.remove("show");
    }, 2000);
  }

  function factorial(n) {
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  }

  function calculateProfit(D, M) {
    const numerator = factorial(M + D - 1);
    const denominator = factorial(M) * factorial(D - 1);
    return 0.97 * (numerator / denominator);
  }

  DOMselectors.playButton.addEventListener("click", startGame);
});
console.log("running!");
