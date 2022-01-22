const playerFactory = (name,mark) => {
    let score = 0;
    const markBoard = (mark,event) => {
        event.target.textContent = mark;
    }
    return {name,mark,markBoard};
}

const boardModule = (() => {
    
    const gameboardDivReference = document.querySelector('#gameboard');
    let Gameboard  = {gameBoard:["","","","","","","","",""]};
    
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
                player1.markBoard(player1.mark,event);
            })
        });
    })();

    let displayController = {};
})();

let player1 = playerFactory("victor","X");


