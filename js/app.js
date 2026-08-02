class Card {
    constructor(cardID, number, type, color, image) {
        this.cardID = cardID;
        this.number = number;
        this.type = type;
        this.color = color;
        this.image = image;
    }
}
/*
const player1 = new Player(1, "Player 1", 0, []);
const player2 = new Player(2, "Player 2", 0, []);
const player3 = new Player(3, "Player 3", 0, []);
*/

const startButton = document.getElementById('startButton');
const playerNameInput = document.getElementById('playerNameInput');
const homePage = doucument.getElementById('homePage')

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