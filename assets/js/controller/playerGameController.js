const playerController = {

    

    init: function() {
        playerGameModel.boardSize = 10;
        playerGameModel.numShips = playerGameModel.ships.length;
        playerGameModel.directions = [playerGameModel.numShips];
        playerGameModel.shoots = [];
        playerGameModel.generateShipLocations();
    },

}