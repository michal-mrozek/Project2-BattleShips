//computer model
computerModel = {

    boardSize : 10,
    numOfShips : 10,
    shoots : [],
    allAround: new Set(),
    allLocations: new Set(),
    
    ships: [
        { location: ["", "", "", ""], hits: [0, 0, 0, 0], around: []},

        { location: ["", "", ""], hits: [0, 0, 0], around: []},
        { location: ["", "", ""], hits: [0, 0, 0], around: []},

        { location: ["", ""], hits: [0, 0], around: [] },
        { location: ["", ""], hits: [0, 0], around: []},
        { location: ["", ""], hits: [0, 0], around: []},

        { location: [""], hits: [0], around: []},
        { location: [""], hits: [0], around: []},
        { location: [""], hits: [0], around: []},
        { location: [""], hits: [0], around: []},    
    ],

    generateShipLocations: function() {  
        let location;
        let aroundLoc;

        for (let i = 0; i < this.numOfShips; i++) {
            
            location = this.generateShip(i);
            this.ships[i].location = location;
            console.log("Computer Ship location: " + location);

            for (let i = 0; i < location.length;i++) {
                this.allLocations.add(location[i]);
            }
                    
            aroundLoc = this.generateAroundLoc(location);
            
            this.ships[i].around = aroundLoc;

            for (const value of aroundLoc) {
                this.allAround.add(value);
            }
           
        
        }
        
    },

    generateAroundLoc: function(shipLoc) {
        let around = new Set()
        
        for (let i = 0; i < shipLoc.length; i++) {
            let firstDig = Math.floor(shipLoc[i]/10);
            let secondDig = shipLoc[i] % 10;
            
            if (firstDig != 0) {
                around.add((firstDig -1) + "" + secondDig)
            }
            if (firstDig != 9) {
                around.add((firstDig +1) + "" + secondDig)
            }
            if (secondDig != 0) {
                around.add(firstDig + "" + (secondDig - 1))
            }
            if (secondDig != 9) {
                around.add((firstDig ) + "" + (secondDig + 1))
            }
            if (firstDig != 0 && secondDig !=0 ){
                around.add((firstDig -1) + "" + (secondDig - 1))
            }
            if (firstDig != 0 && secondDig !=9 ){
                around.add((firstDig -1) + "" + (secondDig + 1))
            }
            if (firstDig != 9 && secondDig !=0 ){
                around.add((firstDig +1) + "" + (secondDig - 1))
            }
            if (firstDig != 9 && secondDig !=9 ){
                around.add((firstDig +1) + "" + (secondDig + 1))
            }
        }

        for (value of shipLoc){
            around.delete(value)
        }

        return around;
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

        let newShipLoc = this.checkForCollision(shipLoc);

        return newShipLoc == 1 ? this.generateShip(i) : newShipLoc;
    },

    checkForCollision: function(newShipLoc) {
        for (let i = 0; i < newShipLoc.length; i++) {
           
            if (this.allAround.has(newShipLoc[i])|| this.allLocations.has(newShipLoc[i]))  {
                return 1;
            }
            
        }return newShipLoc;
    },

    displayShip: function(target) {
        for (const value of target) {
        
            let id = value +"C"
            let td = document.getElementById(id);
          
                td.style.background = "red"
            
        }
    },

    displayAround: function(target) {
        for (const value of target) {
            let id = value+"C"
            let td = document.getElementById(id);
          
                td.style.background = "yellow"
            
        }
    },
}


//computer model
playerModel = {

    boardSize : 10,
    numOfShips : 10,
    shoots : [],
    allAround: new Set(),
    allLocations: new Set(),
    
    ships: [
        { location: ["", "", "", ""], hits: [0, 0, 0, 0], around: []},

        { location: ["", "", ""], hits: [0, 0, 0], around: []},
        { location: ["", "", ""], hits: [0, 0, 0], around: []},

        { location: ["", ""], hits: [0, 0], around: [] },
        { location: ["", ""], hits: [0, 0], around: []},
        { location: ["", ""], hits: [0, 0], around: []},

        { location: [""], hits: [0], around: []},
        { location: [""], hits: [0], around: []},
        { location: [""], hits: [0], around: []},
        { location: [""], hits: [0], around: []},    
    ],

    generateShipLocations: function() {  
        let location;
        let aroundLoc;

        for (let i = 0; i < this.numOfShips; i++) {
            
            location = this.generateShip(i);
            this.ships[i].location = location;
            console.log("Player Ship location: " + location);

            for (let i = 0; i < location.length;i++) {
                this.allLocations.add(location[i]);
            }
            
            aroundLoc = this.generateAroundLoc(location);
            
            this.ships[i].around = aroundLoc;

            for (const value of aroundLoc) {
                this.allAround.add(value);
            }
            
        
        }
        
    },

    generateAroundLoc: function(shipLoc) {
        let around = new Set()
        
        for (let i = 0; i < shipLoc.length; i++) {
            let firstDig = Math.floor(shipLoc[i]/10);
            let secondDig = shipLoc[i] % 10;
            
            if (firstDig != 0) {
                around.add((firstDig -1) + "" + secondDig)
            }
            if (firstDig != 9) {
                around.add((firstDig +1) + "" + secondDig)
            }
            if (secondDig != 0) {
                around.add(firstDig + "" + (secondDig - 1))
            }
            if (secondDig != 9) {
                around.add((firstDig ) + "" + (secondDig + 1))
            }
            if (firstDig != 0 && secondDig !=0 ){
                around.add((firstDig -1) + "" + (secondDig - 1))
            }
            if (firstDig != 0 && secondDig !=9 ){
                around.add((firstDig -1) + "" + (secondDig + 1))
            }
            if (firstDig != 9 && secondDig !=0 ){
                around.add((firstDig +1) + "" + (secondDig - 1))
            }
            if (firstDig != 9 && secondDig !=9 ){
                around.add((firstDig +1) + "" + (secondDig + 1))
            }
        }

        for (value of shipLoc){
            around.delete(value)
        }

        return around;
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

        let newShipLoc = this.checkForCollision(shipLoc);

        return newShipLoc == 1 ? this.generateShip(i) : newShipLoc;
    },

    checkForCollision: function(newShipLoc) {
        for (let i = 0; i < newShipLoc.length; i++) {
            if (this.allAround.has(newShipLoc[i])|| this.allLocations.has(newShipLoc[i]))  {
                return 1;
            }
            
        }return newShipLoc;
    },

    displayShip: function(target) {
        for (const value of target) {
        
            let id = value
            let td = document.getElementById(id);
          
                td.style.background = "red"
            
        }
    },

    displayAround: function(target) {
        for (const value of target) {
            let id = value
            let td = document.getElementById(id);
          
                td.style.background = "yellow"
            
        }
    },
}





function init() {
    computerModel.generateShipLocations();
    playerModel.generateShipLocations();
    computerModel.displayShip(computerModel.allLocations);
    computerModel.displayAround(computerModel.allAround);
    playerModel.displayShip(playerModel.allLocations);
    playerModel.displayAround(playerModel.allAround);


    var guessClick = document.getElementsByTagName("td");
    for (var i = 0; i < guessClick.length; i++) {
        guessClick[i].onclick = answer;
    }
}

function answer(eventObj) {
    var shot = eventObj.target;
    var location = shot.id;
    console.log(shot);
    console.log(location);
    document.getElementById(location).style.backgroundColor = "red"
}

window.onload = init;