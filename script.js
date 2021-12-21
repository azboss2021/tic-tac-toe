const Player = (name) => {
    let _name = name;
    const getName = () => { return _name };
    const setName = (str) => { _name = str };
    return {getName, setName};
}

const GameBoard = (() => {
    let gameMode = 0;
    let currentTurn = 1;
    let player1;
    let player2;
    const squares = document.querySelectorAll(".square");
    const board = document.querySelector(".game");
    const currentPlayerDiv = document.querySelector(".current_player");
    const combos = [
        ["square_1","square_2","square_3"],
        ["square_4","square_5","square_6"],
        ["square_7","square_8","square_9"],
        ["square_2","square_5","square_8"],
        ["square_1","square_4","square_7"],
        ["square_3","square_6","square_9"],
        ["square_1","square_5","square_9"],
        ["square_3","square_5","square_7"]
    ];
    const setTurn = () => {currentTurn++};
    const getTurn = () => {return currentTurn};
    const setGameMode = (mode) => {gameMode = mode};
    const getGameMode = () => {return gameMode};
    const startGame = (firstPlayer, secondPlayer) => {
        player1 = Player(firstPlayer);
        if(firstPlayer === "") player1.setName("Player 1");
        if(secondPlayer) {
            player2 = Player(secondPlayer);
            if(secondPlayer==="") player2.setName("Player 2");
            else player2.setName(secondPlayer);
        }
        updatePlayer("X");
        board.classList.remove("hidden");
    }
    const updatePlayer = (symbol) => {
        let player;
        if(symbol==="X") player = player1.getName();
        else if(gameMode===1) player = player2.getName();
        currentPlayerDiv.textContent = `${player}'s Turn: ${symbol}`;
    }
    const checkWin = button => {
        const symbol = button.textContent;
        return combos.some(combo => {
            return combo.every(square => {
                return Array.from(GameBoard.squares).find(element=>element.id===square).textContent === symbol;
            });
        });
    };
    squares.forEach(button => button.addEventListener('click', () => {
        if(button.textContent !== "") return;
        if(getTurn()%2==0) {
            button.textContent = "O";
            updatePlayer("X");
        } else {
            button.textContent = "X";
            updatePlayer("O");
        }
        setTurn();
        if(checkWin(button)) console.log("WIN");
    }));
    return {
        squares,
        checkWin,
        setTurn,
        getTurn,
        setGameMode,
        getGameMode,
        startGame,
        updatePlayer,
    };
})();

const Display = (() => {
    const aiButton = document.querySelector("#ai");
    const multiplayerButton = document.querySelector("#multiplayer");
    const startDisplay = document.querySelector(".start_screen");

    aiButton.addEventListener('click', e => Display.toggleMode(e.target.id));
    multiplayerButton.addEventListener('click', e => Display.toggleMode(e.target.id));

    const toggleMode = buttonID => {
        const nameInputTwo = document.querySelector(".name_two");
        if(buttonID === "ai" && GameBoard.getGameMode() === 1) {
            GameBoard.setGameMode(0);
            nameInputTwo.classList.add("hidden");
        }
        if(buttonID === "multiplayer" && GameBoard.getGameMode() === 0) {
            GameBoard.setGameMode(1);
            nameInputTwo.classList.remove("hidden");
        }
    };

    const submitButton = document.querySelector("#submit");
    submitButton.addEventListener('click', () => {
        const textInput = document.querySelector(".name_one").value;
        const textInputTwo = "";

        if(GameBoard.getGameMode===1) {
            textInputTwo = document.querySelector(".name_two").value;
        }

        startDisplay.classList.add("hidden");
        GameBoard.startGame(textInput, textInputTwo);
    });

    return {
        toggleMode,
    }
})();

const AiFunction = (() => {

})();