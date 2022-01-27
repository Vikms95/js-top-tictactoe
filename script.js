const Player = (name,mark,color) => {
    let _markedPositions = [];

    const getMarkedPositions = () => {
        return _markedPositions;
    };

    const resetMarkedPositions = () => {
        _markedPositions = [];
    };

    const getPlayerName = () => {
        return name;
    };

    return {getPlayerName,
            mark,
            color,
            getMarkedPositions,
            resetMarkedPositions
    };
};

//Change all cell checkers with divReference.textcontent
const Computer = () =>{
    let player = "X";
    let opponent = "O";
    
    class Move{
        constructor()
        {
            let cell;
        }
    }

    function isMovesLeft (board){
        for (let i = 0; i < board.length; i++){
            if(board[i] == ''){
                return true;
            }
        }
        return false;
    }

    function evaluate (b){
       
        //Checking for Rows for X or 0 victory.
        row = 0;
        
        while(row <= 6){    
            b.forEach(row);
                if(b[row + 0] === b[row + 1] && b[row + 1] === b[row + 2]){
                    if(b[row + 0] == 'X'){
                        return +10;
                    }else if(b[row + 0] == 'O'){
                        return -10;
                    }
                }
                row += 3;    
        }
        
        //Checking for Columns for X or 0 victory.
        col = 0;

        while(col <= 6){    
            b.forEach(col);
                if(b[col + 0] === b[col + 1] && b[col + 1] === b[col + 2]){
                    if(b[col + 0] == 'X'){
                        return +10;
                    }else if(b[col + 0] == 'O'){
                        return -10;
                    }
                }
                col += 3;    
        }
        

        //Checking for Diagonals for X or O victory.
        if(b[0] === b[4] && b[4] === b[8]){
            if(b[0] === 'X'){
                return +10;
            }else if(b[0] == 'O'){
                return -10;
            }
        }
        if(b[2] === b[4] && b[4] === b[6]){
            if(b[2] === 'X'){
                return +10;
            }else if(b[2] === 'O'){
                return -10;
            }
        }
        //Else if none of them have won, return 0.
        return 0;
    }

    function minimax(board, depth, isMax){

        let score = evaluate(board);

        if (score === 10){
            return score;
        }

        if (score === -10){
            return score;
        }

        if(isMovesLeft(board) === false){
            return 0;
        }

        // If this maximizer's move
        if(isMax){
            let best = -1000;
            for(let i = 0; i < 9; i++){
                
                if(board[i] === ''){
                    board[i] === player
                    best = Math.max(best,minimax(board,depth + 1, !isMax));
                    board[i] = '';
                }
            }
            return best;
        }else{
            let best = 1000;
            for(let i = 0; i < 9; i++){
                
                if(board[i] === ''){
                    board[i] === opponent;
                    best = Math.min(best,minimax(board,depth + 1, !isMax));
                    board[i] = '';
                }
            }
            return best;
        }
    }

    function findBestMove(board){
        let bestVal = -1000;
        let bestMove = new Move();
        bestMove = -1;

        for(let i = 0; i < 9; i++){
            if(board[i] === ''){
                board[i] = player;
                let moveVal = minimax(board, 0, false);
                board[i] = '';
                if(moveVal > bestVal){
                    bestMove = i;
                    bestVal = moveVal;
                }
            }
        }
        return bestMove;
    }
    
    // let bestMove = findBestMove(board);

    return{
        findBestMove
    }
}


const boardModule = (() => {
    
    let _gameBoard = ['','','','','','','','',''];
    
    const getBoard = () => {
        return _gameBoard; 
    };

    const drawMarkOnGameboard = (event) => {
        gameFlowModule.checkPlayerToPlay(event);
        gameFlowModule.getPlayerOnTurn().getMarkedPositions().push(event.target.id);
        getBoard().splice(event.target.id , 1, gameFlowModule.getPlayerOnTurn().mark);
    };

    const addScoreToLog = (_playerOnTurn,players) =>{
        const logPlayer1DivReference = document.querySelector('.player1-score');
        const logPlayer2DivReference = document.querySelector('.player2-score');

        if(gameFlowModule.getPlayerOnTurn() === players.player1){
            logPlayer1DivReference.textContent = parseInt(logPlayer1DivReference.textContent) + 1; 
        }else{
            logPlayer2DivReference.textContent = parseInt(logPlayer2DivReference.textContent) +  1;
        }
    }

    const removeBoardOuterBorder = (element) =>{
        if(["0", "1", "2"].includes(element.id)) {
            element.style.borderTop = "none";
        };
        if(["6", "7", "8"].includes(element.id)) {
            element.style.borderBottom = "none";
        };
        if(["0", "3", "6"].includes(element.id)) {
            element.style.borderLeft = "none";
        };
        if(["2", "5", "8"].includes(element.id)) {
            element.style.borderRight = "none";
        };
    };

    const renderGameBoard = (() => {
        const gameboardDivReference = document.querySelector('#gameboard');
        for (let i = 0; i < getBoard().length; i++) {
            let element = document.createElement('div');
            element.id = i;
            element.className = 'board-square';
            gameboardDivReference.appendChild(element);
        };
    })();

    const addListenerGameBoardDiv = (() => {
        const boardSquareDivReference = document.querySelectorAll('.board-square');
        boardSquareDivReference.forEach(element => {
            removeBoardOuterBorder(element);
            element.addEventListener('click', (event) => {
               drawMarkOnGameboard(event);
               gameFlowModule.checkForWinnerOrTie(gameFlowModule.getPlayerOnTurn());
            });
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
        addScoreToLog
    };

})();

const gameFlowModule = (() =>{
    
    let _players;
    let _playerOnTurn = undefined; 

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

    const createPlayers = () => {
        let alphaNumChars = /^[a-z0-9]+$/i;
        let playerName1 = prompt('Enter player 1 name');
        let playerName2 = prompt('Enter player 2 name');
        
        if(playerName1 === null && playerName2 === null){
            alert('Welcome unnamed guest!')
            playerName1 = 'Guest 1';
            playerName2 = 'Guest 2';
        };
        if(playerName1.length > 15 || playerName2.length > 15){
            alert('Name\'s are too long, give some propers names!');
            createPlayers();
        }

        let player1 = Player(playerName1,'X','red');
        let player2 = Player(playerName2,'O','blue');
        _players = {player1,player2};
        updateLog();
        
        return {player1,player2};
    }

    const updateLog = () =>{
        const player1NameReference = document.querySelector('.player1-name');
        const player2NameReference = document.querySelector('.player2-name');
        const player1ScoreReference = document.querySelector('.player1-score');
        const player2ScoreReference = document.querySelector('.player2-score');
        const logPlayer1DivReference = document.querySelector('.player1-score');
        const logPlayer2DivReference = document.querySelector('.player2-score');

        logPlayer1DivReference.textContent = 0;
        logPlayer2DivReference.textContent = 0;
        player1NameReference.textContent = _players.player1.getPlayerName();
        player2NameReference.textContent = _players.player2.getPlayerName();

    }

    const startGame = (() => {
        _players =  createPlayers();
        updateLog();
    })();

    const getPlayerOnTurn = () => {
        return _playerOnTurn;
    }

    const setPlayerOnTurn = (playerToSet) => {
        _playerOnTurn = playerToSet;
    }

    const getWinScenarios = () =>{
        return _winScenarios;
    };

    const checkPlayerToPlay = (event) =>{
        const messageDivReference = document.querySelector('.message-board');
        
        if(event.target.textContent !== '' || _players === null) return null;
        if(getPlayerOnTurn() === _players.player2 || getPlayerOnTurn() === undefined){
            setPlayerOnTurn(_players.player1);
            event.target.style.color = getPlayerOnTurn().color;
        }else{
            setPlayerOnTurn(_players.player2);
            event.target.style.color = getPlayerOnTurn().color;
        };

        if(_playerOnTurn === _players.player1){
            messageDivReference.textContent = 'It\'s ' + _players.player2.getPlayerName() + '\'s turn';
        }
        else{
            messageDivReference.textContent = 'It\'s ' + _players.player1.getPlayerName() + '\'s turn'; 
        };
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
                        boardModule.addScoreToLog(_playerOnTurn,_players);
                        resetBoard();
                    };
                });
            });
        }else{
            resetBoard();
        };

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
            checkForWinnerOrTie,
            resetBoard
    };

})();
