const playerFactory = (name,mark,color) => {
    let markedPositions = []
    return {name,mark,color, markedPositions};
}

const boardModule = (() => {
    const gameboardDivReference = document.querySelector('#gameboard');
    let Gameboard = {gameBoard:['','','','','','','','','']};
    let playerTurn = undefined;   

    const renderGameBoard = (() => {
        const gameBoard = Gameboard.gameBoard;
        for (let i = 0; i < gameBoard.length; i++) {
            let element = document.createElement('div');
            element.id = i;
            element.className = 'board-square'
            gameboardDivReference.appendChild(element);
        }
    })();

    const addListenerGameBoardSquares = (() => {
        const boardSquareDivReference = document.querySelectorAll('.board-square');
        boardSquareDivReference.forEach(element => {
            element.addEventListener('click', (event) => {
                drawMarkOnGameboard(event);
                // console.log(Gameboard.gameBoard)
            })
        });
    })();

    const drawMarkOnGameboard = (event) => {
        if(event.target.textContent !== '') return;
        if(playerTurn === player2 || playerTurn === undefined){
            playerTurn = player1;
            event.target.style.color = playerTurn.color;
        }else{
            playerTurn = player2;
            event.target.style.color = playerTurn.color;
        }
        let playerMoves = playerTurn.markedPositions;
        let playerName = playerTurn.name;
        event.target.textContent = playerTurn.mark;
        Gameboard.gameBoard.splice(parseInt(event.target.id) , 1, playerTurn.mark);
        playerMoves.push(event.target.id)
        Object.values(gameModule.winScenarios).forEach((element) =>{
            let amountFound = 0;
            element.forEach((number) =>{
                if(playerMoves.includes(number)){
                    amountFound++;
                    console.log(amountFound)
                }
            })
            if(amountFound === 3){
                gameModule.congratulateWin(playerTurn);
            }
        });
    }
    return{Gameboard};
})();

const gameModule = (() =>{
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

    const congratulateWin = (playerName) =>{
        console.log("The winner is " + playerName.name);
    }
    return {congratulateWin,winScenarios};
})();

let player1 = playerFactory('Victor','X','red');
let player2 = playerFactory('Olga','O','blue');


