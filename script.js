const symbols = ["🍎", "🍌", "🍒", "🍕", "🍔", "🍟", "🍦", "🍩"];
let cards = [];

function createCard(symbol) {
  const card = document.createElement("div");
  card.className = "card";

  const symbolElem = document.createElement("span");
  symbolElem.className = "symbol";
  symbolElem.textContent = symbol;

  card.appendChild(symbolElem);
  card.setAttribute("data-symbol", symbol);
  card.addEventListener("click", () => flipCard(card));

  return card;
}

function shuffleCards() {
  const combinedSymbols = symbols.concat(symbols);
  combinedSymbols.sort(() => Math.random() - 0.5);

  cards = combinedSymbols.map((symbol) => createCard(symbol));
}

function flipCard(card) {
  if (card.classList.contains("flipped") || cardsFlipping) return;

  card.classList.add("flipped");
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    checkMatch();
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;
  const symbol1 = card1.getAttribute("data-symbol");
  const symbol2 = card2.getAttribute("data-symbol");

  if (symbol1 === symbol2) {
    card1.classList.remove("flipped");
    card2.classList.remove("flipped");
    card1.classList.add("matched");
    card2.classList.add("matched");
    card1.removeEventListener("click", () => flipCard(card1));
    card2.removeEventListener("click", () => flipCard(card2));
  } else {
    cardsFlipping = true;
    setTimeout(() => {
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      cardsFlipping = false;
    }, 1000);
  }

  flippedCards = [];
  checkWin();
}

function checkWin() {
  if (document.querySelectorAll(".matched").length === cards.length) {
    setTimeout(() => {
      alert("Congratulations! You win!");
      resetGame();
    }, 500);
  }
}

function resetGame() {
  const gameBoard = document.getElementById("game-board");
  gameBoard.innerHTML = "";
  cards = [];
  flippedCards = [];
  cardsFlipping = false;
  shuffleCards();
  cards.forEach((card) => gameBoard.appendChild(card));
}

let flippedCards = [];
let cardsFlipping = false;

shuffleCards();
const gameBoard = document.getElementById("game-board");
cards.forEach((card) => gameBoard.appendChild(card));
