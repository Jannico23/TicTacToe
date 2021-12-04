const statusDisplay = document.querySelector('.ttt-status');

let gameActive = true;
let currentPlayer = "X";
let gameStatus = ["", "", "", "", "", "", "", "", ""];

const winningMessage = () => `Player ${currentPlayer} wins! Congrats!`;
const drawMessage = () => `Draw! Do a rematch!`;
const currentPlayerMessage = () => `Player: ${currentPlayer}`;

statusDisplay.innerHTML = currentPlayerMessage();

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function updateStatus(clickedCell, clickedCellIndex) {
    gameStatus[clickedCellIndex] = currentPlayer; //puts X or O into gameStatus array
    clickedCell.innerHTML = currentPlayer;
}

function togglePlayer() {
    //if currentPlayer is X, then currentPlayer is set to O, otherwise to x
    if(currentPlayer=="X"){
        currentPlayer="O"
    }else{
        currentPlayer="X"
    } 
    statusDisplay.innerHTML=currentPlayerMessage();
}

function check() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winConditions[i];
        let a = gameStatus[winCondition[0]];
        let b = gameStatus[winCondition[1]];
        let c = gameStatus[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }

    let roundDraw = !gameStatus.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    togglePlayer();
}

function processInput(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('board-cell'));

    if (gameStatus[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    updateStatus(clickedCell, clickedCellIndex);
    check();
}

function newGame() {
    gameActive = true;
    currentPlayer = "X";
    gameStatus = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerMessage();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}


document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', processInput));
document.querySelector('.restart-button').addEventListener('click', newGame);