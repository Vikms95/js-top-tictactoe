const playerFactory = (name,mark) => {
    
    let _score = 0;
    return {mark};
}

const boardModule = (() => {
    
    let Gameboard  = {gameBoard:["","","","","","","","",""]};

    const gameboardDivReference = document.querySelector('#gameboard');
    let playerTurn = undefined;   

    const renderGameBoard = (() => {
        const gameBoard = Gameboard.gameBoard;
        const arrayLength = gameBoard.length;
        gameBoard.forEach(index => {
            let element = document.createElement('div');
            element.className = 'board-square'
            element.textContent = index;
            gameboardDivReference.appendChild(element);
        })
    })();

    const addListenerGameBoardSquares = (() => {
        const boardSquareDivReference = document.querySelectorAll('.board-square');
        boardSquareDivReference.forEach(element => {
            element.addEventListener('click', (event) => {
                if(event.target.textContent !== '') return;
                if(playerTurn === undefined || playerTurn === player2){
                    playerTurn = player1;
                }else{
                    playerTurn = player2;
                }
                event.target.textContent = playerTurn.mark;
                
            })
        });
    })();

})();

let player1 = playerFactory('Victor','X');
let player2 = playerFactory('Olga','O');


