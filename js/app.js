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
    eliminated: false
};

const player2 = { name: 'Computer 1', hand: [], eliminated: false };
const player3 = { name: 'Computer 2', hand: [], eliminated: false };


let Cards = [];
let discardPile = [];


const startButton = document.querySelector('.start');
const playerNameInput = document.querySelector('.playerName');
const homePage = document.querySelector('.home-page');
const messageDisplay = document.querySelector('.message-display')

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


function startGame() {
    homePage.style.display = 'none';
    document.querySelector('h1.game-title').style.display = 'none';

    const gamePageDiv = document.querySelector('.gamePage');
    if (gamePageDiv) gamePageDiv.style.display = 'block';

    console.log('Game Started');

    player1.eliminated = false;
    player2.eliminated = false;
    player3.eliminated = false;

    shuffleCards();
    dealCards();

    renderGameUI();
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




function chooseColorModal() {
    return new Promise((resolve) => {
        let modal = document.getElementById('colorPickerModal');

        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'colorPickerModal';
            modal.className = 'color-picker-modal';
            modal.innerHTML = `
                <div class="color-picker-content">
                    <h3>Choose Color</h3>
                    <div class="color-options">
                        <button class="color-btn red" data-color="red"></button>
                        <button class="color-btn blue" data-color="blue"></button>
                        <button class="color-btn green" data-color="green"></button>
                        <button class="color-btn yellow" data-color="yellow"></button>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
        }

        modal.style.display = 'flex';

        const buttons = modal.querySelectorAll('.color-btn');
        const handleColorClick = (e) => {
            const selectedColor = e.target.getAttribute('data-color');
            modal.style.display = 'none';
            buttons.forEach(btn => btn.removeEventListener('click', handleColorClick));
            resolve(selectedColor);
        };

        buttons.forEach(btn => btn.addEventListener('click', handleColorClick));
    });
}


function choosePlayerModal() {
    return new Promise((resolve) => {
        let modal = document.getElementById('playerPickerModal');

        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'playerPickerModal';
            modal.className = 'color-picker-modal';
            modal.innerHTML = `
                <div class="color-picker-content">
                    <h3>Swap Cards With Who?</h3>
                    <div class="color-options" style="flex-direction: column; gap: 10px;">
                        <button class="target-btn" data-target="2" style="padding: 10px 20px; font-size: 16px; cursor: pointer;">Computer 1</button>
                        <button class="target-btn" data-target="3" style="padding: 10px 20px; font-size: 16px; cursor: pointer;">Computer 2</button>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
        }

        modal.style.display = 'flex';

        const buttons = modal.querySelectorAll('.target-btn');
        const handleClick = (e) => {
            const target = e.target.getAttribute('data-target');
            modal.style.display = 'none';
            buttons.forEach(btn => btn.removeEventListener('click', handleClick));
            resolve(target === "2" ? player2 : player3);
        };

        buttons.forEach(btn => btn.addEventListener('click', handleClick));
    });
}




function handleZeroCard() {
    if (clockwise) {
        const tempHand = player3.hand;
        player3.hand = player2.hand;
        player2.hand = player1.hand;
        player1.hand = tempHand;
    } else {
        const tempHand = player2.hand;
        player2.hand = player3.hand;
        player3.hand = player1.hand;
        player1.hand = tempHand;
    }
    alert("🔄 Card 0! All hands have been rotated!");
}


async function handleSevenCard(whoPlayed) {
    if (whoPlayed === player1) {
        const targetPlayer = await choosePlayerModal();
        const tempHand = [...player1.hand];
        player1.hand = [...targetPlayer.hand];
        targetPlayer.hand = tempHand;
        alert(`🔄 Swapped hands with ${targetPlayer.name}!`);
    } else {
        const candidates = [player1, player2, player3].filter(p => p !== whoPlayed && !p.eliminated);
        if (candidates.length > 0) {
            candidates.sort((a, b) => a.hand.length - b.hand.length);
            const targetPlayer = candidates[0];
            const tempHand = [...whoPlayed.hand];
            whoPlayed.hand = [...targetPlayer.hand];
            targetPlayer.hand = tempHand;
            console.log(`${whoPlayed.name} swapped hands with ${targetPlayer.name}!`);
        }
    }
}




function checkMercyRule(player) {
    if (player.hand.length >= 25 && !player.eliminated) {
        player.eliminated = true;
        player.hand = [];
        alert(`💥 Mercy Rule! ${player.name} has 25 or more cards and is OUT of the game!`);

        const activePlayers = [player1, player2, player3].filter(p => !p.eliminated);

        if (activePlayers.length === 1) {
            alert(`🎉 ${activePlayers[0].name} Wins the game by Mercy Rule!`);
            return true;
        }

        if (player === player1) {
            alert("Game Over! You were eliminated by Mercy Rule.");
            return true;
        }

        return true;
    }
    return false;
}


function getNextTurn(fromTurn) {
    let next = fromTurn;
    const players = { 1: player1, 2: player2, 3: player3 };

    for (let i = 0; i < 3; i++) {
        if (clockwise) {
            next = next === 3 ? 1 : next + 1;
        } else {
            next = next === 1 ? 3 : next - 1;
        }
        if (!players[next].eliminated) {
            return next;
        }
    }
    return next;
}


function getBestColorForBot(botHand) {
    const colorCounts = { red: 0, blue: 0, green: 0, yellow: 0 };
    botHand.forEach(card => {
        if (colorCounts[card.color] !== undefined) {
            colorCounts[card.color]++;
        }
    });
    let bestColor = 'red';
    let max = -1;
    for (const color in colorCounts) {
        if (colorCounts[color] > max) {
            max = colorCounts[color];
            bestColor = color;
        }
    }
    return bestColor;
}




async function playCard(cardIndex) {

    if (currentTurn !== 1 || player1.eliminated) {
        alert("Wait for your turn!");
        return;
    }

    const selectedCard = player1.hand[cardIndex];
    const currentTopCard = discardPile[discardPile.length - 1];

    if (attackStack > 0 && !selectedCard.type.includes("+")) {
        alert(`You are under attack (+${attackStack})! Play a + card or draw cards.`);
        return;
    }

    const canPlay =
        selectedCard.color === currentTopCard.color ||
        selectedCard.number === currentTopCard.number ||
        selectedCard.color === "black" ||
        selectedCard.type === "wild" ||
        selectedCard.type === "wild+4" ||
        selectedCard.type === "wild+6" ||
        selectedCard.type === "wild+10" ||
        selectedCard.type === "wildColorRoulette" ||
        selectedCard.type === "discardAll" ||
        selectedCard.type === "playAll";

    if (!canPlay) {
        alert("You can't play this card!");
        return;
    }


    if (selectedCard.color === "black" || selectedCard.type.startsWith("wild")) {
        const chosenColor = await chooseColorModal();
        selectedCard.color = chosenColor;
    }

    discardPile.push(selectedCard);
    player1.hand.splice(cardIndex, 1);


    if (selectedCard.type === "discardAll" || selectedCard.type === "playAll") {
        const sameColorCards = player1.hand.filter(c => c.color === selectedCard.color);
        if (sameColorCards.length > 0) {
            discardPile.push(...sameColorCards);
            player1.hand = player1.hand.filter(c => c.color !== selectedCard.color);
            alert(`🗑️ Discarded all ${sameColorCards.length + 1} ${selectedCard.color} cards!`);
        }
    }


    if (selectedCard.number === 0 || selectedCard.type === "0") {
        handleZeroCard();
    }


    if (selectedCard.number === 7 || selectedCard.type === "7") {
        await handleSevenCard(player1);
    }


    if (selectedCard.type === "stop") {

        renderGameUI();

        if (player1.hand.length === 0) {
            // alert("You Win!");
            messageDisplay.textContent = 'You Win!'
            return;
        }

        currentTurn = getNextTurn(getNextTurn(1));

        setTimeout(() => {
            triggerTurn();
        }, 1000);

        return;
    }


    if (selectedCard.type === "AnotherSide") {

        clockwise = !clockwise;

        renderGameUI();

        if (player1.hand.length === 0) {
            // alert("You Win!");
            messageDisplay.textContent = 'You Win!'
            return;
        }

        currentTurn = getNextTurn(1);

        setTimeout(() => {
            triggerTurn();
        }, 1000);

        return;
    }



    if (selectedCard.type === "+2") attackStack += 2;
    else if (selectedCard.type === "wild+4") attackStack += 4;
    else if (selectedCard.type === "wild+6") attackStack += 6;
    else if (selectedCard.type === "wild+10") attackStack += 10;


    renderGameUI();

    if (player1.hand.length === 0) {
        // alert("You Win!");
        messageDisplay.textContent = 'You Win!'

        return;
    }

    currentTurn = getNextTurn(1);
    setTimeout(() => {
        triggerTurn();
    }, 1000);

}


function playerDrawCard() {
    if (currentTurn !== 1 || player1.eliminated) {
        alert("Wait for your turn to draw a card! ⏳");
        return;
    }

    if (attackStack > 0) {
        alert(`You drew ${attackStack} cards due to attack!`);

        for (let i = 0; i < attackStack; i++) {
            if (Cards.length > 0) {
                player1.hand.push(Cards.pop());
            }
        }

        attackStack = 0;

        if (checkMercyRule(player1)) {
            renderGameUI();
            return;
        }

        renderGameUI();

        currentTurn = getNextTurn(1);
        setTimeout(() => triggerTurn(), 1500);
        return;
    }

    if (Cards.length > 0) {
        const drawnCard = Cards.pop();
        player1.hand.push(drawnCard);

        console.log(`You drew a card: ${drawnCard.color} ${drawnCard.number || drawnCard.type}`);

        if (checkMercyRule(player1)) {
            renderGameUI();
            return;
        }

        renderGameUI();

        currentTurn = getNextTurn(1);
        setTimeout(() => triggerTurn(), 1500);
    } else {
        alert("The cards in the draw pile have run out! We will reshuffle the deck later.");
    }
}


function triggerTurn() {
    if (currentTurn === 2) {
        computerTurn(player2, 2);
    } else if (currentTurn === 3) {
        computerTurn(player3, 3);
    } else {
        renderGameUI();
    }
}


function computerTurn(computerPlayer, botNum) {

    if (computerPlayer.eliminated) {
        currentTurn = getNextTurn(botNum);
        triggerTurn();
        return;
    }

    if (attackStack > 0) {

        const attackCardIndex = computerPlayer.hand.findIndex(card => card.type && card.type.includes("+"));

        if (attackCardIndex !== -1) {

            const playedCard = computerPlayer.hand.splice(attackCardIndex, 1)[0];

            if (playedCard.color === "black" || playedCard.type.startsWith("wild")) {
                playedCard.color = getBestColorForBot(computerPlayer.hand);
            }

            discardPile.push(playedCard);

            if (playedCard.type === "+2") attackStack += 2;
            else if (playedCard.type === "wild+4") attackStack += 4;
            else if (playedCard.type === "wild+6") attackStack += 6;
            else if (playedCard.type === "wild+10") attackStack += 10;

            console.log(computerPlayer.name + " stacked " + playedCard.type + "! Total attack: " + attackStack);

            renderGameUI();

            if (computerPlayer.hand.length === 0) {
                alert(computerPlayer.name + " Wins!");
                return;
            }

            currentTurn = getNextTurn(botNum);
            setTimeout(() => triggerTurn(), 1000);

            return;

        } else {

            console.log(computerPlayer.name + " drew " + attackStack + " cards due to attack.");

            for (let i = 0; i < attackStack; i++) {
                if (Cards.length > 0) {
                    computerPlayer.hand.push(Cards.pop());
                }
            }

            attackStack = 0;

            if (checkMercyRule(computerPlayer)) {
                renderGameUI();
                const active = [player1, player2, player3].filter(p => !p.eliminated);
                if (active.length > 1) {
                    currentTurn = getNextTurn(botNum);
                    setTimeout(() => triggerTurn(), 1000);
                }
                return;
            }

            renderGameUI();

            currentTurn = getNextTurn(botNum);
            setTimeout(() => triggerTurn(), 1000);

            return;

        }

    }


    const currentTopCard = discardPile[discardPile.length - 1];

    const playableIndex = computerPlayer.hand.findIndex(card => {

        return (
            card.color === currentTopCard.color ||
            card.number === currentTopCard.number ||
            card.color === "black" ||
            card.type === "wild" ||
            card.type === "wild+4" ||
            card.type === "wild+6" ||
            card.type === "wild+10" ||
            card.type === "wildColorRoulette" ||
            card.type === "discardAll" ||
            card.type === "playAll"
        );

    });

    let playedCard = null;

    if (playableIndex !== -1) {

        playedCard = computerPlayer.hand.splice(playableIndex, 1)[0];

        if (playedCard.color === "black" || playedCard.type.startsWith("wild")) {
            playedCard.color = getBestColorForBot(computerPlayer.hand);
        }

        discardPile.push(playedCard);


        if (playedCard.type === "discardAll" || playedCard.type === "playAll") {
            const sameColorCards = computerPlayer.hand.filter(c => c.color === playedCard.color);
            if (sameColorCards.length > 0) {
                discardPile.push(...sameColorCards);
                computerPlayer.hand = computerPlayer.hand.filter(c => c.color !== playedCard.color);
                console.log(`${computerPlayer.name} discarded all ${sameColorCards.length + 1} ${playedCard.color} cards!`);
            }
        }


        if (playedCard.number === 0 || playedCard.type === "0") {
            handleZeroCard();
        }


        if (playedCard.number === 7 || playedCard.type === "7") {
            handleSevenCard(computerPlayer);
        }


        if (playedCard.type === "stop") {

            renderGameUI();

            if (computerPlayer.hand.length === 0) {
                alert(computerPlayer.name + " Wins!");
                return;
            }

            currentTurn = getNextTurn(getNextTurn(botNum));
            setTimeout(() => triggerTurn(), 1000);

            return;
        }
        console.log(computerPlayer.name + " played " + playedCard.image);

    } else {

        if (Cards.length > 0) {

            computerPlayer.hand.push(Cards.pop());

            console.log(computerPlayer.name + " drew a card.");

            if (checkMercyRule(computerPlayer)) {
                renderGameUI();
                const active = [player1, player2, player3].filter(p => !p.eliminated);
                if (active.length > 1) {
                    currentTurn = getNextTurn(botNum);
                    setTimeout(() => triggerTurn(), 1000);
                }
                return;
            }

        }

    }

    renderGameUI();

    if (computerPlayer.hand.length === 0) {

        alert(computerPlayer.name + " Wins!");

        return;

    }


    if (playedCard && playedCard.type === "+2") attackStack += 2;
    else if (playedCard && playedCard.type === "wild+4") attackStack += 4;
    else if (playedCard && playedCard.type === "wild+6") attackStack += 6;
    else if (playedCard && playedCard.type === "wild+10") attackStack += 10;


    if (playedCard && playedCard.type === "AnotherSide") {

        clockwise = !clockwise;

    }


    currentTurn = getNextTurn(botNum);
    setTimeout(() => triggerTurn(), 1000);

}




function renderGameUI() {
    document.getElementById('displayPlayerName').innerText = player1.eliminated ?
        `Player ${player1.name} (Eliminated)` :
        `Cards For Player : ${player1.name}`;

    const bot1Count = document.getElementById('bot1CardCount');
    const bot2Count = document.getElementById('bot2CardCount');
    if (bot1Count) bot1Count.innerText = player2.eliminated ? 'OUT' : player2.hand.length;
    if (bot2Count) bot2Count.innerText = player3.eliminated ? 'OUT' : player3.hand.length;

    const bot2InfoDiv = document.getElementById('bot2-info');
    const bot3InfoDiv = document.getElementById('bot3-info');

    if (bot2InfoDiv) bot2InfoDiv.classList.remove('active-turn-glow');
    if (bot3InfoDiv) bot3InfoDiv.classList.remove('active-turn-glow');

    if (currentTurn === 2 && bot2InfoDiv && !player2.eliminated) {
        bot2InfoDiv.classList.add('active-turn-glow');
    } else if (currentTurn === 3 && bot3InfoDiv && !player3.eliminated) {
        bot3InfoDiv.classList.add('active-turn-glow');
    }

    const currentCard = discardPile[discardPile.length - 1];
    const discardPileCardDiv = document.getElementById('discardPileCard');
    if (discardPileCardDiv && currentCard) {
        discardPileCardDiv.innerHTML = `<img src="./Uno no mercy cards/${currentCard.image}" alt="Current Card" class="game-card">`;
    }

    const playerHandDisplayDiv = document.getElementById('playerHandDisplay');
    if (playerHandDisplayDiv) {
        playerHandDisplayDiv.innerHTML = '';

        player1.hand.forEach((card, index) => {
            const cardImg = document.createElement('img');
            cardImg.src = `./Uno no mercy cards/${card.image}`;
            cardImg.alt = `Card ${card.number || card.type}`;
            cardImg.classList.add('game-card');

            cardImg.addEventListener('click', () => {
                playCard(index);
            });

            playerHandDisplayDiv.appendChild(cardImg);
        });
    }
}