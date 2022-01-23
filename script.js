const playerFactory = (name,mark,color) => {
    let markedPositions = []
    return {name, mark, color, markedPositions};
}

const boardModule = (() => {
    let boardSquareDivReference = document.querySelectorAll('.board-square');
    let playerOnTurn = undefined; 
    let Gameboard = {
        gameBoard:['','','','','','','','','']
    };
      
    const renderGameBoard = (() => {
        const gameboardDivReference = document.querySelector('#gameboard');
        for (let i = 0; i < Gameboard.gameBoard.length; i++) {
            let element = document.createElement('div');
            element.id = i;
            element.className = 'board-square'
            gameboardDivReference.appendChild(element);
        }
    })();

    const addListenerGameBoardSquares = (() => {
        let boardSquareDivReference = document.querySelectorAll('.board-square');
        boardSquareDivReference.forEach(element => {
            element.addEventListener('click', (event) => {
               let playerOnTurn = drawMarkOnGameboard(event);
               if(playerOnTurn === null) return;
               gameFlowModule.checkForWinnerOrTie(playerOnTurn);
            })
        });
    })();

    const drawMarkOnGameboard = (event) => {
        if(event.target.textContent !== '') return null;
        if(playerOnTurn === player2 || playerOnTurn === undefined){
            playerOnTurn = player1;
            event.target.style.color = playerOnTurn.color;
        }else{
            playerOnTurn = player2;
            event.target.style.color = playerOnTurn.color;
        }
        event.target.textContent = playerOnTurn.mark;
        playerOnTurn.markedPositions.push(event.target.id);
        Gameboard.gameBoard.splice(event.target.id , 1, playerOnTurn.mark);
        return playerOnTurn;
    };

    const resetBoard = () =>{
        //Clear board squares
        let boardSquareDivReference = document.querySelectorAll('.board-square');
        boardSquareDivReference.forEach(element => {
          element.textContent = '';  
        })

        //Clear gameboard array
        for (let i = 0; i < Gameboard.gameBoard.length; i++) {
            Gameboard.gameBoard[i] = '';
        }

        //Clear player marked positions
        player1.markedPositions = [];
        player2.markedPositions = [];
    }

    return{Gameboard,playerOnTurn,resetBoard};

})();

const gameFlowModule = (() =>{
    
    const winScenarios = {
        horizontalWin1: ['0','1','2'],
        horizontalWin2: ['3','4','5'],
        horizontalWin3: ['6','7','8'],
        verticalWin1:['0','3','6'],
        verticalWin2:['1','4','7'],
        verticalWin3:['2','5','8'],
        diagonalWin1:['0','4','8'],
        diagonalWin2:['2','4','6']
    }

    const checkForWinnerOrTie = (playerOnTurn) =>{
        if(boardModule.Gameboard.gameBoard.includes('')){
            Object.values(winScenarios).forEach((element) =>{
                let amountFound = 0;
                element.forEach((number) =>{
                    if(playerOnTurn.markedPositions.includes(number)){
                        amountFound++;
                    }
                    if(amountFound === 3){
                        congratulateWin(playerOnTurn);
                        boardModule.resetBoard();
                    }
                })
            })
        }else{
            boardModule.resetBoard();
        }
    };

    const congratulateWin = (playerOnTurn) =>{
        const messageDivReference = document.querySelector('.message-board');
        messageDivReference.textContent = "The winner is " + playerOnTurn.name;
    }

    return {congratulateWin,winScenarios,checkForWinnerOrTie};
})();

let player1 = playerFactory('Victor','X','red');
let player2 = playerFactory('Olga','O','blue');


