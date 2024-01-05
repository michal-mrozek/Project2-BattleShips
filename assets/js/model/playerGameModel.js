playerModel = {

    ships: [
        { location: ["", "", "", ""], hits: [0, 0, 0, 0], locationAroundShip: [] },

        { location: ["", "", ""], hits: [0, 0, 0], locationAroundShip: [] },
        { location: ["", "", ""], hits: [0, 0, 0], locationAroundShip: [] },

        { location: ["", ""], hits: [0, 0], locationAroundShip: [] },
        { location: ["", ""], hits: [0, 0], locationAroundShip: [] },
        { location: ["", ""], hits: [0, 0], locationAroundShip: [] },

        { location: [""], hits: [0], locationAroundShip: [] },
        { location: [""], hits: [0], locationAroundShip: [] },
        { location: [""], hits: [0], locationAroundShip: [] },
        { location: [""], hits: [0], locationAroundShip: [] },
    ],

    generateShipLocations: function() {
        let location, dots;
        for (let i = 0; i < this.numShips; i++) {
            let y = false;
            do {
                y = false;
                location = this.generateShip(i);
                dots = baseModel.generateDots(location, i, this.directions);

                if (baseModel.collision(location, dots, this.ships) == true) {
                    y = true;
                }

            } while (y != true);

            this.ships[i].location = location;
            console.log("Computer location: " + location);
            this.ships[i].locationAroundShip = dots;
            console.log("Computer dots: " + dots);
        }
    },

    generateShip: function(i) {
        let direction = Math.floor(Math.random() * 2);
        let row = 0;
        let col = 0;
        let newShipLocations = [];
        let actuallyShip = this.ships[i].location.length;

        if (direction === 1) {
            row = Math.floor(Math.random() * this.boardSize);
            col = Math.floor(Math.random() * (this.boardSize - actuallyShip));
        } else {
            row = Math.floor(Math.random() * (this.boardSize - actuallyShip));
            col = Math.floor(Math.random() * this.boardSize);
        }

        this.directions[i] = direction;
        for (let j = 0; j < actuallyShip; j++) {
            if (direction === 1) {
                newShipLocations.push(row + "" + (col + j));
            } else {
                newShipLocations.push((row + j) + "" + col);
            }
        }

        let newShipLoc = this.checkNewShipsWithExistsShips(newShipLocations, this.ships);

        return newShipLoc == 1 ? this.generateShip(i) : newShipLoc;
    },



    checkNewShipsWithExistsShips: function(newShipLocations, ships) {
        let lengthNewShip = newShipLocations.length;
        for (let c = 0; c < ships.length; c++) {
            for (let v = 0; v < lengthNewShip; v++) {
                for (let k = 0; k < ships[c].location.length; k++) {
                    if (newShipLocations[v] == ships[c].location[k]) {
                        return 1;
                    }
                }
            }
        }
        return newShipLocations;
    },
}