const Player = (name,mark,color) => {
    let _markedPositions = []

    const getMarkedPositions = () => {
        return _markedPositions;
    }

    const resetMarkedPositions = () => {
        _markedPositions = []
    }

    const getPlayerName = () => {
        return name;
    }

    const setPlayerName = (playerName) => {
        name = playerName;
    }

    return {getPlayerName,
            setPlayerName,
            mark,
            color,
            getMarkedPositions,
            resetMarkedPositions
    };
}

const boardModule = (() => {
    let _playerOnTurn = undefined; 
    let _gameBoard = ['','','','','','','','',''];
    
    const getBoard = () => {
        return _gameBoard; 
    }

    const getPlayerOnTurn = () => {
        return _playerOnTurn;
    }

    const setPlayerOnTurn = (playerToSet) => {
        _playerOnTurn = playerToSet;
    }

    const drawMarkOnGameboard = (event) => {
        //Refactor into checkPlayerToPlay

        if(event.target.textContent !== '') return null;
        if(getPlayerOnTurn() === gameFlowModule.players.player2 || getPlayerOnTurn() === undefined){
            setPlayerOnTurn(gameFlowModule.players.player1);
            event.target.style.color = getPlayerOnTurn().color;
        }else{
            setPlayerOnTurn(gameFlowModule.players.player2);
            event.target.style.color = getPlayerOnTurn().color;
        }
        event.target.textContent = getPlayerOnTurn().mark;
        
        getPlayerOnTurn().getMarkedPositions().push(event.target.id);
        getBoard().splice(event.target.id , 1, getPlayerOnTurn().mark);
    };


    const renderGameBoard = (() => {
        const gameboardDivReference = document.querySelector('#gameboard');
        for (let i = 0; i < getBoard().length; i++) {
            let element = document.createElement('div');
            element.id = i;
            element.className = 'board-square'
            gameboardDivReference.appendChild(element);
        }
    })();

    const addListenerGameBoardDiv = (() => {
        const boardSquareDivReference = document.querySelectorAll('.board-square');
        boardSquareDivReference.forEach(element => {
            if(["0", "1", "2"].includes(element.id)) {
                element.style.borderTop = "none";
            }
            if(["6", "7", "8"].includes(element.id)) {
                element.style.borderBottom = "none";
            }
            if(["0", "3", "6"].includes(element.id)) {
                element.style.borderLeft = "none";
            }
            if(["2", "5", "8"].includes(element.id)) {
                element.style.borderRight = "none";
            }

            element.addEventListener('click', (event) => {
               drawMarkOnGameboard(event);
               gameFlowModule.checkForWinnerOrTie(getPlayerOnTurn());
            })
        });
    })();

    const addListenerNewGameButton = (() => {
        const newGameButtonReference = document.querySelector('.start-game')
        newGameButtonReference.addEventListener('click', () =>{
            let players = gameFlowModule.createPlayers();
            if (players === null) return;
            gameFlowModule.resetBoard();
            
        });
    })();

    return{getBoard,
        getPlayerOnTurn,
        setPlayerOnTurn
    };

})();

const gameFlowModule = (() =>{
    
    const _winScenarios = {
        horizontalWin1: ['0','1','2'],
        horizontalWin2: ['3','4','5'],
        horizontalWin3: ['6','7','8'],
        verticalWin1:['0','3','6'],
        verticalWin2:['1','4','7'],
        verticalWin3:['2','5','8'],
        diagonalWin1:['0','4','8'],
        diagonalWin2:['2','4','6']
    }

    const createPlayers = () => {
        const playerName1 = prompt('Enter player 1 name');
        const playerName2 = prompt('Enter player 2 name');
        if(playerName1 === null || playerName2 === null) return null;

        let player1 = Player(playerName1,'X','red');
        let player2 = Player(playerName2,'O','blue');
        return {player1,player2}
    }

    let players =  createPlayers();

    const getWinScenarios = () =>{
        return _winScenarios;
    }

    const checkForWinnerOrTie = (getPlayerOnTurn) =>{
        if(boardModule.getBoard().includes('')){
            Object.values(getWinScenarios()).forEach((element) =>{
                let amountFound = 0;
                element.forEach((number) =>{
                    if(getPlayerOnTurn.getMarkedPositions().includes(number)){
                        amountFound++;
                    }
                    if(amountFound === 3){
                        congratulateWin(boardModule.getPlayerOnTurn());
                        boardModule.resetBoard();
                    }
                })
            })
        }else{
            boardModule.resetBoard();
        }
    };

    const congratulateWin = (getPlayerOnTurn) =>{
        const messageDivReference = document.querySelector('.message-board');
        messageDivReference.textContent = "The winner is " + getPlayerOnTurn.getPlayerName();
    }

    const resetBoard = () =>{
        //Clear board squares
        let boardSquareDivReference = document.querySelectorAll('.board-square');
        boardSquareDivReference.forEach(element => {
          element.textContent = '';  
        })

        //Clear gameboard array
        for (let i = 0; i < boardModule.getBoard().length; i++) {
            boardModule.getBoard()[i] = '';
        }

        //Clear player marked positions
        players.player1.resetMarkedPositions();
        players.player2.resetMarkedPositions();

        //Resets which player has to play to it's initial state
        boardModule.setPlayerOnTurn(undefined);
    };


    return {players,
            createPlayers,
            congratulateWin,
            checkForWinnerOrTie,
            resetBoard
    };

})();

