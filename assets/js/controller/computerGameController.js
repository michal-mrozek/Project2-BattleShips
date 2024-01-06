const computerGameController = {

    init: function() {
        computerGameModel.boardSize = 10;
        computerGameModel.numOfShips = playerGameModel.ships.length;
        computerGameModel.directions = [playerGameModel.numShips];
        computerGameModel.shoots = [];
        computerGameModel.generateShipLocations();
        
    },

}



window.onload = computerGameController.init();
