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
}

function gamePage() {
    gamePage.style.display = 'not none';
}