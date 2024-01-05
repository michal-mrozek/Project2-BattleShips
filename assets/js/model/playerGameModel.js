playerGameModel = {


    displayShip: function(target) {
        for (let i = 0; i < target.length; i++) {
            let td = document.getElementById(target[i]);
          
                td.style.background = "red"
            
        }
    },

    ships: [
        { location: ["", "", "", ""], hits: [0, 0, 0, 0]},
        { location: ["", "", "", ""], hits: [0, 0, 0, 0]},

        { location: ["", "", ""], hits: [0, 0, 0]},
        { location: ["", "", ""], hits: [0, 0, 0]},
        { location: ["", "", ""], hits: [0, 0, 0]},
        { location: ["", "", ""], hits: [0, 0, 0]},

        { location: ["", ""], hits: [0, 0]},
        { location: ["", ""], hits: [0, 0]},
        { location: ["", ""], hits: [0, 0]},
        { location: ["", ""], hits: [0, 0]},

    
    ],

    generateShipLocations: function() {
        
        let location;
        for (let i = 0; i < this.numOfShips; i++) {
            
            location = this.generateShip(i);
            this.ships[i].location = location;
            
            console.log("Ship location: " + location);
            this.displayShip(location);
        }
    },

    generateShip: function(i) {
        let col = 0;
        let row = 0;
        
        let shipLoc = [];
        let ship = this.ships[i].location.length;

        let direction = Math.floor(Math.random() * 2); 
        if (direction === 1) {
            col = Math.floor(Math.random() * (this.boardSize - ship));
            row = Math.floor(Math.random() * this.boardSize);
        } else {
            col = Math.floor(Math.random() * this.boardSize);
            row = Math.floor(Math.random() * (this.boardSize - ship));
        }

      
        for (let j = 0; j < ship; j++) {
            if (direction === 1) {
                shipLoc.push(row + "" + (col + j));
            } else {
                shipLoc.push((row + j) + "" + col);
            }
        }

        let newShipLoc = this.checkForCollision(shipLoc, this.ships);

        return newShipLoc == 1 ? this.generateShip(i) : newShipLoc;
    },



    checkForCollision: function(newShipLocations, ships) {
        let lengthNewShip = newShipLocations.length;
        for (let i = 0; i < ships.length; i++) {
            for (let j = 0; j < lengthNewShip; j++) {
                for (let k = 0; k < ships[i].location.length; k++) {
                    if (newShipLocations[j] == ships[i].location[k]) {
                        return 1;
                    }
                }
            }
        }
        return newShipLocations;
    }

  
}