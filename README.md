# UnoNoMercy-project

## 1. Game Name

### UNO Show'Em No Mercy

**UNO Show'Em No Mercy** is a browser-based card game built with HTML, CSS, and JavaScript. The player enters their name and plays against two computer opponents.

The project includes a game board, player hand, computer opponents, draw pile, discard pile, turn tracking, attack tracking, and several special UNO No Mercy-style cards.

### Why I Chose This Game

I chose UNO because it is a familiar and fun card game that is also a good project for practicing JavaScript. Building the game required working with arrays and objects, DOM manipulation, event listeners, conditional logic, game state, player turns, and computer-player behavior.

I also wanted to make the project more interesting than a simple static website by creating a game that responds to the player's actions and changes the interface during gameplay.

## 2. Getting Started

### Play the Deployed Game

**Live Game:**  
https://hasan-mohammed-s.github.io/UnoNoMercy-project/

### How to Play

1. Open the game.
2. Enter your name on the home screen.
3. Click **Start Game**.
4. You and two computer players receive cards.
5. During your turn, click a playable card from your hand.
6. If you cannot or do not want to play a card, use the draw pile to draw.
7. Follow the special-card effects shown by the game.
8. The game continues until a player wins or is eliminated by the Mercy Rule.

### Important Game Features

- Three players: one human player and two computer opponents.
- Seven cards are dealt to each player at the beginning.
- Turn management between the player and computers.
- Card matching by color or number.
- Draw-pile functionality.
- Attack stacking for draw cards.
- Special cards such as:
  - `0` hand rotation
  - `7` hand swap
  - `Stop`
  - `Play Again`
  - `Play All`
  - `Another Side`
  - `+2`
  - `+4`
  - `+6`
  - `+10`
  - Wild color-related cards
- Mercy Rule: a player who reaches 25 or more cards can be eliminated.
- Winner screen with a restart option.
- Responsive styling for smaller screens.

### Run Locally

No framework, package manager, or external server is required.

1. Download or clone the repository.
2. Keep the folder structure unchanged.
3. Open `index.html` in a modern web browser.

The project files are organized as follows:

```text
UnoNoMercy-project/
├── index.html
├── data.js
├── README.md
├── logo.svg
├── css/
│   └── style.css
├── js/
│   └── app.js
└── Uno no mercy cards/
    └── card and background images
```

### Planning Materials

The planning notes for this project are available here:

[Planning Materials](PLANNING.md)

The original project repository is also available here:

https://github.com/Hasan-Mohammed-S/UnoNoMercy-project

## 3. Attributions

This project does **not** use external JavaScript libraries or frameworks. The game is written using plain HTML, CSS, and JavaScript.

The project contains UNO-style card images and visual assets in the `Uno no mercy cards` folder. These assets are bundled with the project and are used to display the cards and game backgrounds.

For information about the official UNO game and UNO Show 'Em No Mercy, see:

- [Mattel - UNO](https://shop.mattel.com/collections/uno)
- [Mattel Games](https://shopping.mattel.com/)

No third-party libraries are required to run this project.

## 4. Technologies Used

- **HTML5** — page structure and game interface.
- **CSS3** — layout, colors, backgrounds, card styling, animations, and responsive design.
- **JavaScript (ES6+)** — game logic, DOM manipulation, event handling, turns, card actions, computer players, and game state.
- **Git / GitHub** — source-code version control and project hosting.
- **GitHub Pages** — deployment of the web game.

## 5. Next Steps / Future Enhancements

Possible future improvements include:

- Add sound effects and background music.
- Improve the computer-player strategy.
- Add difficulty levels for the computer players.
- Add a score system and multiple rounds.
- Improve the mobile layout for very small screens.
- Add a game settings screen.
- Add more visual animations when special cards are played.
- Add an online multiplayer mode.
- Add clearer explanations for every special card.
- Add a complete game history or statistics panel.

## 7. Project Goal

The main goal of this project was to create a playable browser game while practicing core front-end development skills. The project focuses on understanding how HTML, CSS, and JavaScript work together to create an interactive application.
