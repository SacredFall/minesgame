document.addEventListener("DOMContentLoaded", () => {
  const DOMselectors = {
    gameContainer: document.querySelector(".game-container"),
    gameBoard: document.querySelector(".game-board"),
    gameQuote: document.querySelector(".game-quote"),
  };

  function createButton() {
    const button = document.createElement("button");
    button.className =
      "mine w-24 h-24 bg-gray-700 hover:bg-gray-500 border border-gray-800 rounded-md shadow-md";
    button.textContent = "";
    return button;
  }

  for (let i = 0; i < 5 * 5; i++) {
    const button = createButton();
    DOMselectors.gameBoard.appendChild(button);
  }
});
