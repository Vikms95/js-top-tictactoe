Components: MODULE >
                    gameBoard
                    displayController
            FACTORIES >
                    playerFactory

- playerFactory:
    properties > name(private)
    methods > markBoard(public)

- gameBoard:
    properties > gameBoard(private)
    methods > markBoard(public)
            renderGameBoard(private)

Gameboard is an array with 9 indexes, each one of them belong to a square in the display
