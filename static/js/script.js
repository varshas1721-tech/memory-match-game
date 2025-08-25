let moveCount = 0;
console.log("Script loaded!");

const cards = ['🍎', '🍌', '🍇', '🍓', '🍎', '🍌', '🍇', '🍓'];
let flippedCards = [];
let matchedCards = [];
function startGame() {
    document.getElementById('win-screen').style.display = 'none';
    document.getElementById('game-board').style.display = 'grid';
    const board = document.getElementById('game-board');
    board.innerHTML = '';
    matchedCards = [];
    flippedCards = [];
    moveCount = 0;
    document.getElementById('move-counter').textContent = `Moves: 0`;

    const shuffled = cards.sort(() => 0.5 - Math.random());

    shuffled.forEach((symbol, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.symbol = symbol;
        card.dataset.index = index;
        card.addEventListener('click', flipCard);
        board.appendChild(card);
    });
}

function flipCard() {
    if (flippedCards.length === 2 || this.classList.contains('flipped')) return;

    this.textContent = this.dataset.symbol;
    this.classList.add('flipped');
    flippedCards.push(this);
        moveCount++;
    document.getElementById('move-counter').textContent = `Moves: ${moveCount}`;

    if (flippedCards.length === 2) {
        setTimeout(checkMatch, 800);
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.symbol === card2.dataset.symbol) {
        matchedCards.push(card1, card2);
    } else {
        card1.textContent = '';
        card2.textContent = '';
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
    }

    flippedCards = [];

    if (matchedCards.length === cards.length) {
    document.getElementById('game-board').style.display = 'none';
    document.getElementById('win-screen').style.display = 'block';
    document.getElementById('final-moves').textContent = `You finished in ${moveCount} moves!`;
}
}

window.onload = startGame;