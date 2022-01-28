If the game is a game with computer (which is defined if variable isGameWithComputer is set to true, which is set to true if you click 'Play against computer')
    Whenever player2 has to play, place a mark 'O' on whatever findBestMove indicates
    Store the move played to gameBoard array
    Store the move played to markedPositions of player2
    Change playerToPlay back to player1
<!-- - Whenever you reset a game, also reset the variable isGameWithComputer -->
Create a button that initializes the game as normal but just changes how the marks for player2 are placed based on findBestMove(), gives name 'Computer', and sets back playerOnTurn to player1 whenever player1 plays