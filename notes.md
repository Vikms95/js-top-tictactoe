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
- displayController switches between player 1 and player 2 between turns
