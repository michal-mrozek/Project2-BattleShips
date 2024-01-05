const playerController = {

    init: function() {
        playerGameModel.boardSize = 10;
        playerGameModel.numOfShips = playerGameModel.ships.length;
        playerGameModel.directions = [playerGameModel.numShips];
        playerGameModel.shoots = [];
        playerGameModel.generateShipLocations();
        
    },

}



window.onload = playerController.init;
