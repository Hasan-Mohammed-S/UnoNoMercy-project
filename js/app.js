class Card {
    constructor(cardID, number, type, color, image) {
        this.cardID = cardID;
        this.number = number;
        this.type = type;
        this.color = color;
        this.image = image;
    }
}

const player1 = {
    name: '',
    hand: [],
};

const player2 = { name: 'Computer 1', hand: [] };
const player3 = { name: 'Computer 2', hand: [] };


let Cards = [];
let discardPile = [];


const startButton = document.querySelector('.start');
const playerNameInput = document.querySelector('.playerName');
const homePage = document.querySelector('.home-page');

startButton.addEventListener('click', () => {
    const playerName = playerNameInput.value.trim();


    if (playerName === "") {
        alert('Enter Your Name');
        return;
    }


    player1.name = playerName;
    startGame();

});
console.log(player1.name);

function startGame() {
    homePage.style.display = 'none';
    console.log('Game Started');

    const gamePageDiv = document.querySelector('.gamePage');
    if (gamePageDiv) gamePageDiv.style.display = 'block';

    console.log('Game Started');
    console.log("Current Player's Name:", player1.name);

    shuffleCards();
    dealCards();
}


function shuffleCards() {
    Cards = [...cards];

    for (let i = Cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [Cards[i], Cards[j]] = [Cards[j], Cards[i]];

    }

    console.log('Shuffle Cards:', Cards.length);

}


function dealCards() {
    for (let i = 0; i < 7; i++) {
        player1.hand.push(Cards.pop());
        player2.hand.push(Cards.pop());
        player3.hand.push(Cards.pop());
    }


    discardPile.push(Cards.pop());

    console.log("The papers have been distributed.");
    console.log("Player 1's hand:", player1.hand);
    console.log("Starting Card:", discardPile[discardPile.length - 1]);
}


function renderGameUI() {
    document.getElementById('displayPlayerName').innerText = `Cards For Player : ${player1.name}`;

    const currentCard = discardPile[discardPile.length - 1];
    const discardPileCardDiv = document.getElementById('discardPileCard');

    discardPileCardDiv.innerHTML = `<img src="./Uno no mercy cards/${currentCard.image}" alt="Current Card" class="game-card">`;

    const playerHandDisplayDiv = document.getElementById('playerHandDisplay');
    playerHandDisplayDiv.innerHTML = '';

    player1.hand.forEach((card, index) => {
        const cardImg = document.createElement('img');
        cardImg.src = `./Uno no mercy cards/${card.image}`;
        cardImg.alt = `Card ${card.number}`;
        cardImg.classList.add('game-card');
        playerHandDisplayDiv.appendChild(cardImg);

        cardImg.addEventListener('click', () => {
            playCard(index);
        });

        playerHandDisplayDiv.appendChild(cardImg);
    });
}


function startGame() {
    homePage.style.display = 'none';
    document.querySelector('h1.game-title').style.display = 'none';

    const gamePageDiv = document.querySelector('.gamePage');
    if (gamePageDiv) gamePageDiv.style.display = 'block';

    console.log('Game Started');

    shuffleCards();
    dealCards();

    renderGameUI();
}

function playerDrawCard() {
    if (Cards.length > 0) {

        const drawnCard = Cards.pop();
        player1.hand.push(drawnCard);

        console.log(`You drew a card: ${drawnCard.color} ${drawnCard.number || drawnCard.type}`);

        renderGameUI();
    } else {
        alert("The cards in the draw pile have run out! We will reshuffle the deck later.");
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const drawBtn = document.getElementById('drawCardButton');
    if (drawBtn) {
        drawBtn.addEventListener('click', playerDrawCard);
    }
});

function playCard(cardIndex) {
    const selectedCard = player1.hand[cardIndex];
    const currentTopCard = discardPile[discardPile.length - 1];
    if (selectedCard.color === currentTopCard.color ||
        selectedCard.number === currentTopCard.number ||
        selectedCard.type === currentTopCard.type ||
        selectedCard.color === 'wild' ||
        selectedCard.type === 'wild') {

        discardPile.push(selectedCard);

        player1.hand.splice(cardIndex, 1);

        console.log(`Played: ${selectedCard.color} ${selectedCard.number || selectedCard.type}`);

        renderGameUI();

    } else {
        alert("You cannot play this card! It must match the card on the table in color or number/feature. ❌");
    }
}

let currentTurn = 1;

function playCard(cardIndex) {
    if (currentTurn !== 1) {
        alert("Wait for your turn! Opponents are playing. ⏳");
        return;
    }

    const selectedCard = player1.hand[cardIndex];
    const currentTopCard = discardPile[discardPile.length - 1];

    if (selectedCard.color === currentTopCard.color ||
        selectedCard.number === currentTopCard.number ||
        selectedCard.type === currentTopCard.type ||
        selectedCard.color === 'wild' ||
        selectedCard.type === 'wild') {

        discardPile.push(selectedCard);
        player1.hand.splice(cardIndex, 1);

        console.log(`Played: ${selectedCard.color} ${selectedCard.number || selectedCard.type}`);
        renderGameUI();

        currentTurn = 2;
        setTimeout(() => computerTurn(player2, 3), 1500);

    } else {
        alert("You cannot play this card! It must match the card on the table in color or number/feature. ❌");
    }
}


function playerDrawCard() {
    if (currentTurn !== 1) {
        alert("Wait for your turn to draw a card! ⏳");
        return;
    }

    if (Cards.length > 0) {
        const drawnCard = Cards.pop();
        player1.hand.push(drawnCard);

        console.log(`You drew a card: ${drawnCard.color} ${drawnCard.number || drawnCard.type}`);
        renderGameUI();

        currentTurn = 2;
        setTimeout(() => computerTurn(player2, 3), 1500);
    } else {
        alert("The cards in the draw pile have run out! We will reshuffle the deck later.");
    }
}




function computerTurn(computerPlayer, nextPlayerNum) {
    console.log(`Now it's turn for: ${computerPlayer.name}`);
    const currentTopCard = discardPile[discardPile.length - 1];

    const playableIndex = computerPlayer.hand.findIndex(card =>
        card.color === currentTopCard.color ||
        card.number === currentTopCard.number ||
        card.type === currentTopCard.type ||
        card.color === 'wild' ||
        card.type === 'wild'
    );

    if (playableIndex !== -1) {
        const selectedCard = computerPlayer.hand[playableIndex];
        discardPile.push(selectedCard);
        computerPlayer.hand.splice(playableIndex, 1);
        console.log(`${computerPlayer.name} played: ${selectedCard.color} ${selectedCard.number || selectedCard.type}`);
    } else {
        if (Cards.length > 0) {
            const drawnCard = Cards.pop();
            computerPlayer.hand.push(drawnCard);
            console.log(`${computerPlayer.name} didn't find a matching card and drew one.`);
        }
    }

    renderGameUI();

    currentTurn = nextPlayerNum;

    if (currentTurn === 3) {
        setTimeout(() => computerTurn(player3, 1), 1500);
    } else {
        console.log("It's your turn now! Play or Draw.");
    }
}


function renderGameUI() {
    document.getElementById('displayPlayerName').innerText = `Cards For Player : ${player1.name}`;

    document.getElementById('bot1CardCount').innerText = player2.hand.length;
    document.getElementById('bot2CardCount').innerText = player3.hand.length;

    const bot2InfoDiv = document.getElementById('bot2-info');
    const bot3InfoDiv = document.getElementById('bot3-info');
    const playerSectionDiv = document.querySelector('.player-section');

    if (bot2InfoDiv) bot2InfoDiv.classList.remove('active-turn-glow');
    if (bot3InfoDiv) bot3InfoDiv.classList.remove('active-turn-glow');
    if (playerSectionDiv) playerSectionDiv.classList.remove('active-turn-glow');

    if (currentTurn === 1 && playerSectionDiv) {
        playerSectionDiv.classList.add('active-turn-glow');
    } else if (currentTurn === 2 && bot2InfoDiv) {
        bot2InfoDiv.classList.add('active-turn-glow');
    } else if (currentTurn === 3 && bot3InfoDiv) {
        bot3InfoDiv.classList.add('active-turn-glow');
    }

    const currentCard = discardPile[discardPile.length - 1];
    const discardPileCardDiv = document.getElementById('discardPileCard');
    discardPileCardDiv.innerHTML = `<img src="./Uno no mercy cards/${currentCard.image}" alt="Current Card" class="game-card">`;

    const playerHandDisplayDiv = document.getElementById('playerHandDisplay');
    playerHandDisplayDiv.innerHTML = '';

    player1.hand.forEach((card, index) => {
        const cardImg = document.createElement('img');
        cardImg.src = `./Uno no mercy cards/${card.image}`;
        cardImg.alt = `Card ${card.number}`;
        cardImg.classList.add('game-card');

        cardImg.addEventListener('click', () => {
            playCard(index);
        });

        playerHandDisplayDiv.appendChild(cardImg);
    });
}