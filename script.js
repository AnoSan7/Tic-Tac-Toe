const cells=document.querySelectorAll(".cells");
const turn=document.querySelector(".turn");
const warning=document.querySelector(".warning");
const score1=document.getElementById("score1");
const score2=document.getElementById("score2");
warning.textContent = "No warning";
warning.style.visibility = "hidden";
let player1Score = 0;
let player2Score = 0;
const newGameButton=document.querySelector(".newGame");
newGameButton.addEventListener("click", () => {
    flag = true;
    GameBoard.reset();
});
const totalCells = 9;
const GameBoard = (function() {
    const board = Array(totalCells).fill(' ');
    const remainingCells = [];
    for(let i = 0; i < totalCells; i++) {
        remainingCells.push(i);
    }
    function reset() {
        board.fill(' ');
        cells.forEach(cell => {
            cell.textContent = ' ';
        });
        remainingCells.length = 0;
        for(let i = 0; i < totalCells; i++) {
            remainingCells.push(i);
        }
        warning.textContent = "No warning";
        warning.style.visibility = "hidden";
        turn.textContent = "Player 1's turn";
    }
    function isAvailable(index) {
        return remainingCells.includes(index);
    }
    function setCell(index, symbol) {
        if (board[index]===' ') {
            board[index] = symbol;
            cells[index].textContent = symbol;
            cells[index].classList.add('filled');
            setTimeout(() => cells[index].classList.remove('filled'), 300);
        }
    }
    function getCell(index) {
        return board[index];
    }
    function isFull() {
        return board.every(cell => cell !== ' ');
    }
    function getBoard() {
        return board;
    }
    return{
        isAvailable,
        reset,
        setCell,
        getCell,
        isFull,
        getBoard,
        remainingCells
    };
})();
function Player(name, symbol) {
    return { name, symbol };
}
const Game = (function() {
    const players = [Player("Player 1", "X"), Player("Player 2", "O")];
    let currentPlayerIndex = 0;
    function switchPlayer() {
        currentPlayerIndex = currentPlayerIndex^1;
        turn.textContent = `${current().name}'s turn`;
        flag = !flag;
    }
    function current() {
        return players[currentPlayerIndex];
    }
    function checkWin() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5],
            [6, 7, 8], [0, 3, 6],
            [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        const currentSymbol = current().symbol;
        for (const combination of winningCombinations) {
            if (combination.every(index => GameBoard.getCell(index) === currentSymbol)) {
                flag= false;
                return true;
            }
        }
        return false;
    }
    return {
        players,
        switchPlayer,
        current,
        checkWin,
    };
})();
function blockAll(){
    cells.forEach(cell => {
        cell.removeEventListener("click", () => {});
    });
}
function unblockAll(){
    cells.forEach(cell => {
        cell.addEventListener("click", () => {});
    });
}
let flag=true;
cells.forEach((cell, index) => {
    cell.addEventListener("click", () => {
        warning.style.visibility = "hidden";
        if (!flag) {
            warning.textContent = "It's not your turn!";
            warning.style.visibility = "visible";
            return;
        }
        if (GameBoard.isAvailable(index)) {
            GameBoard.setCell(index, Game.current().symbol);
            const indexInRemaining = GameBoard.remainingCells.indexOf(index);
            GameBoard.remainingCells.splice(indexInRemaining, 1);
            if (Game.checkWin()) {
                turn.textContent = `${Game.current().name} wins!`;
                if (Game.current() === Game.players[0]) {
                    player1Score++;
                    score1.textContent = player1Score;
                }
                else{
                    player2Score++;
                    score2.textContent = player2Score;
                }
                warning.style.visibility = "hidden";
                return;
            }
            if (GameBoard.isFull()) {
                turn.textContent = "It's a draw!";
                return;
            }
            Game.switchPlayer();
            setTimeout(move, 1000);
        }
        else {
            warning.textContent = "Cell is already occupied. Try again.";
            warning.style.visibility = "visible";
        }
    });
});
function move(){
    warning.style.visibility = "hidden";
    let ind=Math.floor(Math.random() * GameBoard.remainingCells.length);
    ind= GameBoard.remainingCells[ind];
    if (GameBoard.isAvailable(ind)) {
        GameBoard.setCell(ind, Game.current().symbol);
        const index=GameBoard.remainingCells.indexOf(ind);
        GameBoard.remainingCells.splice(index, 1);
    }
    else {
        return;
    }
    if (Game.checkWin()) {
        turn.textContent = `${Game.current().name} wins!`;
        if (Game.current() === Game.players[0]) {
            player1Score++;
            score1.textContent = player1Score;
        }
        else{
            player2Score++;
            score2.textContent = player2Score;
        }
        return;
    }
    if (GameBoard.isFull()) {
        turn.textContent = "It's a draw!";
        return;
    }
    Game.switchPlayer();
}