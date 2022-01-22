Components: MODULE >
                    gameBoard
                    displayController
            FACTORIES >
                    playerFactory

- playerFactory:
    properties > name(public)
                 mark(public)
                 score(public)

    methods > markBoard(public)

- gameBoard:
    properties > gameBoard(private)

    methods > markBoard(public)
              renderGameBoard(private)

<!-- - Gameboard is an array with 9 indexes, each one of them belong to a square in the display -->
<!-- - Switch between player 1 and player 2 between turns -->
<!-- - Store values of text content inside the array
    :assign an id with a number to every square
    :use it as an index indicator to later push the value inside into the array -->

- Check if there is any winner after event listened
    :iterate every array of winScenarios object and check if all three numbers of the array exist in your playerMoves