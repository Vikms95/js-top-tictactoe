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

    return {getPlayerName,
            mark,
            color,
            getMarkedPositions,
            resetMarkedPositions
    };
}

const boardModule = (() => {
    
    let _gameBoard = ['','','','','','','','',''];
    
    const getBoard = () => {
        return _gameBoard; 
    }

    const drawMarkOnGameboard = (event) => {
        gameFlowModule.checkPlayerToPlay(event);
        gameFlowModule.getPlayerOnTurn().getMarkedPositions().push(event.target.id);
        getBoard().splice(event.target.id , 1, gameFlowModule.getPlayerOnTurn().mark);
    };

    const removeBoardOuterBorder = (element) =>{
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

    }

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
            removeBoardOuterBorder(element);
            element.addEventListener('click', (event) => {
               drawMarkOnGameboard(event);
               gameFlowModule.checkForWinnerOrTie(gameFlowModule.getPlayerOnTurn());
            })
        });
    })();

    const addListenerNewGameButton = (() => {
        const newGameButtonReference = document.querySelector('.start-game')
        newGameButtonReference.addEventListener('click', () =>{
            let arePlayersValid = gameFlowModule.createPlayers();
            if (arePlayersValid === null) return;
            gameFlowModule.resetBoard();
            
        });
    })();

    return{
        getBoard,
    };

})();

const gameFlowModule = (() =>{
    
    let _players;
    
    const createPlayers = () => {
        const playerName1 = prompt('Enter player 1 name');
        const playerName2 = prompt('Enter player 2 name');
        if(playerName1 === null || playerName2 === null) return null;

        let player1 = Player(playerName1,'X','red');
        let player2 = Player(playerName2,'O','blue');
        _players = {player1,player2}
        
        return {player1,player2}
    }

    _players =  createPlayers();

    let _playerOnTurn = undefined; 

    const getPlayerOnTurn = () => {
        return _playerOnTurn;
    }

    const setPlayerOnTurn = (playerToSet) => {
        _playerOnTurn = playerToSet;
    }

    const _winScenarios = {
        horizontalWin1: ['0','1','2'],
        horizontalWin2: ['3','4','5'],
        horizontalWin3: ['6','7','8'],
        verticalWin1:['0','3','6'],
        verticalWin2:['1','4','7'],
        verticalWin3:['2','5','8'],
        diagonalWin1:['0','4','8'],
        diagonalWin2:['2','4','6']
    };

    const getWinScenarios = () =>{
        return _winScenarios;
    };

    const checkPlayerToPlay = (event) =>{
        if(event.target.textContent !== '') return null;
        if(getPlayerOnTurn() === _players.player2 || getPlayerOnTurn() === undefined){
            setPlayerOnTurn(_players.player1);
            event.target.style.color = getPlayerOnTurn().color;
        }else{
            setPlayerOnTurn(_players.player2);
            event.target.style.color = getPlayerOnTurn().color;
        }
        event.target.textContent = getPlayerOnTurn().mark;
    };

    const checkForWinnerOrTie = (getPlayerOnTurn) =>{
        if(boardModule.getBoard().includes('')){
            Object.values(getWinScenarios()).forEach((element) =>{
                let amountFound = 0;
                element.forEach((number) =>{
                    if(getPlayerOnTurn.getMarkedPositions().includes(number)){
                        amountFound++;
                    }
                    if(amountFound === 3){
                        congratulateWin(_playerOnTurn);
                        resetBoard();
                    }
                })
            })
        }else{
            resetBoard();
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
        _players.player1.resetMarkedPositions();
        _players.player2.resetMarkedPositions();

        //Resets which player has to play to it's initial state
        setPlayerOnTurn(undefined);
    };

    return {
            createPlayers,
            getPlayerOnTurn,
            checkPlayerToPlay,
            congratulateWin,
            checkForWinnerOrTie,
            resetBoard
    };

})();

