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
          
                td.classList.add("red")
            
        }
    },

    displayAround: function(target) {
        for (const value of target) {
            let id = value+"C"
            let td = document.getElementById(id);
          
                td.classList.add("yellow")
            
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
          
                td.classList.add("red")
            
        }
    },

    displayAround: function(target) {
        for (const value of target) {
            let id = value
            let td = document.getElementById(id);
          
                td.classList.add("yellow")
            
        }
    },
}

playerControler = {

    shoot: function(shootLoc) {
        if (this.checkIfHit(shootLoc)) {
            console.log("hitted");
            this.markAsHit(shootLoc);
            this.checkIfSunk(shootLoc);
            this.checkIfWin();
        } else {
            console.log("miss")
            this.markAsMiss(shootLoc)
            computerControler.shoot();
        }
    },

    checkIfHit: function(location) {
        return computerModel.allLocations.has(location);
    },

    markAsHit: function(location){
        const loc = document.getElementById(location+"C");
        loc.classList.add("hit");
        loc.classList.remove("red", "avail")
    },
    markAsMiss: function(location){
        const loc = document.getElementById(location+"C");
        loc.classList.add("miss");
        loc.classList.remove("red", "avail")
    },

    checkIfSunk: function(location){

    },

    checkIfWin: function(){

    },

    waitForClick: function() {
        const guessClick = document.getElementsByClassName("avail");
    for (var i = 0; i < guessClick.length; i++) {
        guessClick[i].onclick = function(eventObj) {
            console.log("click")
            var shot = eventObj.target;
            
            var location = shot.id.charAt([0])+ "" + shot.id.charAt([1]);
            playerControler.shoot(location)
            console.log(shot);
            console.log(location);
            
        };
    }
    }



}

computerontroler = {
    shoot: function(){

    }
}


function init() {
    computerModel.generateShipLocations();
    playerModel.generateShipLocations();
    computerModel.displayShip(computerModel.allLocations);
    //computerModel.displayAround(computerModel.allAround);
    playerModel.displayShip(playerModel.allLocations);
    //playerModel.displayAround(playerModel.allAround);
    playerControler.waitForClick();

}



window.onload = init;