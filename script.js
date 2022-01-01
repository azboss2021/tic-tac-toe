const GameBoard = (() => {
    const winningCombinations = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]
    const board = [
        ['','',''],
        ['','',''],
        ['','','']
    ];
    const checkWin = (symbol) => {
        console.log(board);
        return winningCombinations.some(combination=>{
            return combination.every(num=>{
                return board[Math.floor(num/3)][num%3] === symbol;
            })
        })
    };
    const checkDraw = () => {
        return [...document.querySelectorAll(".square")].every(square => {
            return square.textContent !== "";
        })
    }
    const newGame = () => {
        resetBoard();
        gameModePhase();
    }
    const resetBoard = () => {
        for(let i=0;i<board[0].length;i++){
            for(let j=0;j<board[0].length;j++){
                board[i][j]="";
            }
        }
        clearBoardUI();
    }
    const clearBoardUI = () => {
        [...document.querySelectorAll(".square")].forEach(square => {
            square.textContent = "";
        });
    }
    const addSymbol = (symbol, id) => {
        board[Math.floor(id/3)][id%3] = symbol;
        updateBoard(id);
    }
    const updateBoard = (id) => {
        document.getElementById(id).textContent = board[Math.floor(id/3)][id%3];
    }
    const updatePlayer = (player) => {
        document.querySelector(".current_player").textContent = `${player.getName()}'s Turn: ${player.getSymbol()}`;
    }
    return {
        checkWin,
        checkDraw,
        resetBoard,
        addSymbol,
        updatePlayer,
        newGame
    }
})();

const Player = (name, symbol) => {
    const getSymbol = () => {return symbol};
    const getName = () => {return name};
    return {getSymbol, getName}
}

function gameModePhase() {
    const aiButton = document.querySelector("#ai");
    const mpButton = document.querySelector("#mp");
    const gameModeScreen = document.querySelector(".gamemode_screen");
    const playScreen = document.querySelector(".play_screen");
    const resultScreen = document.querySelector(".result_screen");
    playScreen.classList.add("hidden");
    resultScreen.classList.add("hidden");
    gameModeScreen.classList.remove("hidden");
    
    aiButton.addEventListener('click', () => namePhase("ai"));
    mpButton.addEventListener('click', () => namePhase("mp"));
}

function namePhase(mode) {
    const gmScreen = document.querySelector(".gamemode_screen");
    gmScreen.classList.add("hidden");

    if(mode==="ai") {
        const aiNameScreen = document.querySelector(".ai_name_screen");
        aiNameScreen.classList.remove("hidden");

        const player1 = document.querySelector(".ai_first_player_name");
        player1.value = "";

        const aiSubmit = document.querySelector(".ai_submit");
        aiSubmit.addEventListener('click', () => {
            if(player1.value === undefined || player1.value === "") return;
            const player = Player(player1.value, "X");
            playPhase(mode, player);
        })
    }

    if(mode==="mp") {
        const mpNameScreen = document.querySelector(".mp_name_screen");
        mpNameScreen.classList.remove("hidden");

        const player1 = document.querySelector(".mp_first_player_name");
        const player2 = document.querySelector(".second_player_name");

        player1.value = "";
        player2.value = "";

        const mpSubmit = document.querySelector(".mp_submit");
        mpSubmit.addEventListener('click', () => {
            if(player1.value === undefined || player1.value === "" ||
            player2.value === undefined || player2.value === "") return;

            const firstPlayer = Player(player1.value, "X");
            const secondPlayer = Player(player2.value, "O");

            playPhase(mode, firstPlayer, secondPlayer);
        });
    }
}

function playPhase(mode, ...players) {
    let gameOver = false;

    const mpNameScreen = document.querySelector(".mp_name_screen");
    const aiNameScreen = document.querySelector(".ai_name_screen");
    const playScreen = document.querySelector(".play_screen");
    const resultScreen = document.querySelector(".result_screen");

    mpNameScreen.classList.add("hidden");
    aiNameScreen.classList.add("hidden");
    resultScreen.classList.add("hidden");
    playScreen.classList.remove("hidden");

    let currentPlayer = players[0];
    let currentSymbol = "X";
    let currentTurn = 0;

    GameBoard.resetBoard();
    GameBoard.updatePlayer(currentPlayer);

    if(mode==="ai"){

    }

    if(mode==="mp"){
        const squares = Array.from(document.querySelectorAll(".square"));
        squares.forEach(square => square.addEventListener('click', () => {
            if(square.textContent !== "" || gameOver===true) return;

            if(currentTurn%2==0) currentSymbol = "X";
            else currentSymbol = "O";

            GameBoard.addSymbol(currentSymbol, square.id);

            if(GameBoard.checkWin(square.textContent)) {
                resultPhase(false, currentPlayer);
                gameOver = true;
            }
            else if(GameBoard.checkDraw()){
                resultPhase(true);
                gameOver = true;
            }
            else {
                if(currentPlayer === players[0]) currentPlayer = players[1];
                else currentPlayer = players[0];
                GameBoard.updatePlayer(currentPlayer);
            }   
            currentTurn++;
        }));
    }
}

function resultPhase(draw, currentPlayer) {
    const resultScreen = document.querySelector(".result_screen");
    resultScreen.classList.remove("hidden");
    
    const result = document.querySelector(".result");
    if(!draw) {
        result.textContent = `${currentPlayer.getName()} won!`;
    } else {
        result.textContent = `Its a draw!`;
    }

    const newGameButton = document.querySelector(".new_game");
    newGameButton.addEventListener('click', () => {GameBoard.newGame()});
}

gameModePhase();