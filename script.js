const GameBoard = (function() {
    const board = Array(9).fill(null);
    function reset() {
        board.fill(null);
    }
    function isAvailable(index) {
        return board[index] === null;
    }
    function setCell(index, symbol) {
        if (!board[index]) {
            board[index] = symbol;
        }
    }
    function getCell(index) {
        return board[index];
    }
    function isFull() {
        return board.every(cell => cell !== null);
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
        getBoard
    };
})();

function Player(name, symbol) {
    return { name, symbol };
}

const Game = (function() {
    const players = [Player("Player 1", "X"), Player("Player 2", "O")];
    let currentPlayerIndex = 0;
    let gameOver = false;
    function switchPlayer() {
        currentPlayerIndex = currentPlayerIndex^1;
    }
    function current() {
        return players[currentPlayerIndex];
    }
    function play(){
        while(!GameBoard.isFull() && !gameOver) {
            const currentPlayer = current();
            if(!currentPlayerIndex){
                const ind=Math.floor(Math.random() * 9);
                if (GameBoard.isAvailable(ind)) {
                    GameBoard.setCell(ind, currentPlayer.symbol);
                    console.log(`Player ${currentPlayer.name} played at index ${ind}`);
                }
                else {
                    console.log("Cell is already occupied. Try again.");
                    continue;
                }
            }
            else if(currentPlayerIndex){
                const ind=Math.floor(Math.random() * 9);
                if (GameBoard.isAvailable(ind)) {
                    GameBoard.setCell(ind, currentPlayer.symbol);
                    console.log(`Player ${currentPlayer.name} played at index ${ind}`);
                }
                else {
                    console.log("Cell is already occupied. Try again.");
                    continue;
                }
            }
            switchPlayer();
        }
        if (gameOver) {
            console.log("Game is over. Please reset to play again.");
            return;
        }
        if (GameBoard.isFull()) {
            console.log("It's a draw!");
        }
    }
    return {
        players,
        switchPlayer,
        current,
        gameOver,
        play
    };
})();
Game.play();