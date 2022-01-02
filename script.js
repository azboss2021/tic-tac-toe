const nameDiv = document.querySelector("#names");
const playDiv = document.querySelector("#play");
const resultDiv = document.querySelector("#result");
const submitButton = document.querySelector("#submit");

let player1;
let player2;

const GameBoard = (() => {
    const board = [
        ["","",""],
        ["","",""],
        ["","",""]
    ]
    const winCombos = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]
    const playerDiv = document.querySelector("#current_player");
    let currentPlayer = player1;
    let gameOver = false;
    const addSymbol = (id) => {
        //if(gameOver = true) return;
        if(board[Math.floor(id/3)][id%3]==="") {
            board[Math.floor(id/3)][id%3]=currentPlayer.getSymbol();
        } else {
            return;
        }
        updateUI();
        if(checkWin()) {
            gameOver = true;
            results("win", currentPlayer);
        } else if(checkDraw()){
            results("draw");
        } else {
            if(currentPlayer==player1) currentPlayer=player2;
            else currentPlayer=player1;
            updatePlayer(currentPlayer);
        }
    }
    const setPlayer = (player) => currentPlayer = player;
    const updatePlayer = (player) => {
        playerDiv.textContent = `${player.getName()}'s Turn: ${player.getSymbol()}`;
    }
    const checkWin = () => {
        return winCombos.some(combo => {
            return combo.every(num => {
                return board[Math.floor(num/3)][num%3] === currentPlayer.getSymbol();
            })
        })
    }
    const checkDraw = () => {
        for(let i=0;i<3;i++){
            for(let j=0;j<3;j++){
                if(board[i][j]==="") return false;
            }
        }
        return true;
    }
    const updateUI = () => {
        for(let i=0;i<9;i++){
            document.getElementById(`${i}`).textContent = board[Math.floor(i/3)][i%3];
        }
    }
    return {
        addSymbol,
        setPlayer,
        updatePlayer,
        currentPlayer
    }
})();

const Player = (name, symbol) => {
    const getSymbol = () => {return symbol};
    const getName = () => {return name};
    return {getSymbol, getName};
}

submitButton.addEventListener("click", () => {
    let playerOneInput = document.querySelector("#name1").value;
    let playerTwoInput = document.querySelector("#name2").value;
    if(playerOneInput === undefined || playerOneInput === "")
        playerOneInput = "Player 1";
    if(playerTwoInput === undefined || playerTwoInput === "")
        playerTwoInput = "Player 2";
    player1 = Player(playerOneInput, "X");
    player2 = Player(playerTwoInput, "O");
    play();
})

function play() {
    nameDiv.classList.add("hidden");
    playDiv.classList.remove("hidden");
    GameBoard.setPlayer(player1);
    GameBoard.updatePlayer(player1);
    const squares = document.querySelectorAll(".square");
    squares.forEach(square=>{
        square.addEventListener("click", ()=>{
            GameBoard.addSymbol(square.id)})
    });
}

function results(result, winner) {
    resultDiv.classList.remove("hidden");
}