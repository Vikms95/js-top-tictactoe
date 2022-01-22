const playerFactory = (name) => {
    
    return {
        markBoard: () => {
            //function to mark the board on webpage
        }
    }
}



const boardModule = (() => {
    
    let Gameboard  = {
        gameBoard:["X","O","X","O","X","O","X","O","X"]
    };

    function renderGameboard(){
        //render the contents of gameBoard array to the webpage
        const gameboardDivReference = document.querySelector('#gameboard');
        //take gameBoard.length 
        const gameBoard = Gameboard.gameBoard;
        const arrayLength = gameBoard.length;
        //create a div for each index 
        gameBoard.forEach(index => {
            let element = document.createElement('div');
            element.className = 'board-square'
            element.textContent = index;
            gameboardDivReference.appendChild(element);
        });
        // fill it with the index string
    
    }
    
    // let displayController = {};

    return{renderGameboard};
})();

boardModule.renderGameboard();






function addMarkGameBoard(){
    //add mark to specific clicked spot on the board

    //logic that keeps from clicking an already marked spot
}

function isGameOver(){
    //checks for 3 in a row or a tie
}