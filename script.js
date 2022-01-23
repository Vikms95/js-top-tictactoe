const playerFactory = (name,mark,color) => {
    let _markedPositions = []

    const getMarkedPositions = () => {
        return _markedPositions;
    }
    const resetMarkedPositions = () => {
        _markedPositions = []
    }

    return {name, mark, color, getMarkedPositions,resetMarkedPositions};
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
            element.addEventListener('click', (event) => {
               drawMarkOnGameboard(event);
               gameFlowModule.checkForWinnerOrTie(getPlayerOnTurn());
            })
        });
    })();

    const addListenerNewGameButton = (() => {
        const newGameButtonReference = document.querySelector('.start-game')
        newGameButtonReference.addEventListener('click', () =>{
            resetBoard();
        });
    })();

    const drawMarkOnGameboard = (event) => {
        if(event.target.textContent !== '') return null;
        if(getPlayerOnTurn() === player2 || getPlayerOnTurn() === undefined){
            setPlayerOnTurn(player1);
            event.target.style.color = getPlayerOnTurn().color;
        }else{
            setPlayerOnTurn(player2);
            event.target.style.color = getPlayerOnTurn().color;
        }
        event.target.textContent = getPlayerOnTurn().mark;
        
        getPlayerOnTurn().getMarkedPositions().push(event.target.id);
        getBoard().splice(event.target.id , 1, getPlayerOnTurn().mark);
    };

    const resetBoard = () =>{
        //Clear board squares
        let boardSquareDivReference = document.querySelectorAll('.board-square');
        boardSquareDivReference.forEach(element => {
          element.textContent = '';  
        })

        //Clear gameboard array
        for (let i = 0; i < getBoard().length; i++) {
            getBoard()[i] = '';
        }

        //Clear player marked positions
        player1.resetMarkedPositions();
        player2.resetMarkedPositions();

        //Resets which player has to play to it's initial state
        setPlayerOnTurn(undefined);
    };

    return{getBoard,
        resetBoard,
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
        messageDivReference.textContent = "The winner is " + getPlayerOnTurn.name;
    }

    return {congratulateWin,
            checkForWinnerOrTie
    };
})();

let player1 = playerFactory('Victor','X','red');
let player2 = playerFactory('Olga','O','blue');
