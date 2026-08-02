class Card {
    constructor(cardID, number, type, color, image) {
        this.cardID = cardID;
        this.number = number;
        this.type = type;
        this.color = color;
        this.image = image;
    }
}

const player1 = new Player(1, "Player 1", 0, []);
const player2 = new Player(2, "Player 2", 0, []);
const player3 = new Player(3, "Player 3", 0, []);