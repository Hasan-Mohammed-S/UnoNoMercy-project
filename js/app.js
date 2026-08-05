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



let currentTurn = 1;
let clockwise = true;
let attackStack = 0;
//let lastAttackValue = 0;




function playCard(cardIndex) {

    if (currentTurn !== 1) {
        alert("Wait for your turn!");
        return;
    }

    const selectedCard = player1.hand[cardIndex];
    const currentTopCard = discardPile[discardPile.length - 1];

    const canPlay =
        selectedCard.color === currentTopCard.color ||
        selectedCard.number === currentTopCard.number ||
        // selectedCard.type === currentTopCard.type ||
        selectedCard.color === "black" ||
        selectedCard.type === "wild" ||
        selectedCard.type === "wild+4" ||
        selectedCard.type === "wild+6" ||
        selectedCard.type === "wild+10" ||
        selectedCard.type === "wildColorRoulette";

    // if this is stop { } 
    // else if this is reverse {}
    // else if this is wild {}
    // else if this is the same color {}
    // else if this is the same number {}
    // else you have to draw

    if (!canPlay) {
        alert("You can't play this card!");
        return;
    }

    discardPile.push(selectedCard);


    if (selectedCard.type === "stop") {

        player1.hand.splice(cardIndex, 1);

        renderGameUI();

        if (player1.hand.length === 0) {
            alert("You Win!");
            return;
        }

        currentTurn = 3;

        setTimeout(() => {
            computerTurn(player3, 1);
        }, 1000);

        return;
    }
    player1.hand.splice(cardIndex, 1);

    renderGameUI();

    if (player1.hand.length === 0) {
        alert("You Win!");
        return;
    }

    currentTurn = 2;

    setTimeout(() => {
        computerTurn(player2, 3);
    }, 1000);



    if (selectedCard.type === "AnotherSide") {

        clockwise = !clockwise;

        renderGameUI();

        if (player1.hand.length === 0) {
            alert("You Win!");
            return;
        }

        if (clockwise) {

            currentTurn = 2;

            setTimeout(() => {
                computerTurn(player2);
            }, 1000);

        } else {

            currentTurn = 3;

            setTimeout(() => {
                computerTurn(player3);
            }, 1000);

        }

        return;
    }



    if (selectedCard.type === "+2") {

        attackCards = 2;

        renderGameUI();

        currentTurn = 2;

        setTimeout(() => {
            computerTurn(player2);
        }, 1000);

        return;
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

    const currentTopCard = discardPile[discardPile.length - 1];

    const playableIndex = computerPlayer.hand.findIndex(card => {

        return (

            card.color === currentTopCard.color ||

            card.number === currentTopCard.number ||

            // card.type === currentTopCard.type ||

            card.color === "black" ||

            card.type === "wild" ||

            card.type === "wild+4" ||

            card.type === "wild+6" ||

            card.type === "wild+10" ||

            card.type === "wildColorRoulette"

        );

    });


    if (playableIndex !== -1) {

        const playedCard = computerPlayer.hand.splice(playableIndex, 1)[0];

        discardPile.push(playedCard);


        if (playedCard.type === "stop") {

            renderGameUI();

            if (computerPlayer.hand.length === 0) {
                alert(computerPlayer.name + " Wins!");
                return;
            }

            // Computer 1 skips Computer 2
            if (computerPlayer === player2) {

                currentTurn = 1;

                setTimeout(() => {
                    renderGameUI();
                }, 1000);

            } else {

                currentTurn = 2;

                setTimeout(() => {
                    computerTurn(player2, 3);
                }, 1000);

            }

            return;
        }
        console.log(computerPlayer.name + " played " + playedCard.image);

    } else {

        if (Cards.length > 0) {

            computerPlayer.hand.push(Cards.pop());

            console.log(computerPlayer.name + " drew a card.");

        }

    }

    renderGameUI();

    if (computerPlayer.hand.length === 0) {

        alert(computerPlayer.name + " Wins!");

        return;

    }


    if (clockwise) {

        if (computerPlayer === player2) {

            currentTurn = 3;

            setTimeout(() => {
                computerTurn(player3);
            }, 1000);

        } else {

            currentTurn = 1;

            renderGameUI();

        }

    } else {

        if (computerPlayer === player3) {

            currentTurn = 2;

            setTimeout(() => {
                computerTurn(player2);
            }, 1000);

        } else {

            currentTurn = 1;

            renderGameUI();

        }

    }


    if (playedCard.type === "AnotherSide") {

        clockwise = !clockwise;

    }


    if (playableIndex !== -1) {
        const playedCard = computerPlayer.hand.splice(playableIndex, 1)[0];
        discardPile.push(playedCard);

        if (playedCard.number === 7 || playedCard.type === "7") {
            handleSevenCard(computerPlayer);
        }

    }



}




function renderGameUI() {
    document.getElementById('displayPlayerName').innerText = `Cards For Player : ${player1.name}`;

    document.getElementById('bot1CardCount').innerText = player2.hand.length;
    document.getElementById('bot2CardCount').innerText = player3.hand.length;

    const bot2InfoDiv = document.getElementById('bot2-info');
    const bot3InfoDiv = document.getElementById('bot3-info');

    if (bot2InfoDiv) bot2InfoDiv.classList.remove('active-turn-glow');
    if (bot3InfoDiv) bot3InfoDiv.classList.remove('active-turn-glow');

    if (currentTurn === 2 && bot2InfoDiv) {
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