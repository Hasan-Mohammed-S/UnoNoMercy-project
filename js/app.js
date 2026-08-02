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