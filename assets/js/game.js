//computer model
computerModel = {

    boardSize : 10,
    numOfShips : 10,
    allAround: new Set(),
    allLocations: new Set(),
    
    ships: [
        { location: ["", "", "", ""], hits: [0, 0, 0, 0], around: []},

        { location: ["", "", ""], hits: [0, 0, 0], around: []},
        { location: ["", "", ""], hits: [0, 0, 0], around: []},

        { location: ["", ""], hits: [0, 0], around: []},
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
        let string = '<i class="fa-solid fa-ship fa-lg "></i>';
        for (const value of target) {
        
            let id = value +"C"
            let td = document.getElementById(id);
          
                td.innerHTML = string;
            
        }
    },

    displayAround: function(ship) {
        for (const value of ship) {
            let id = value+"C"
            let loc = document.getElementById(id);
          
                loc.classList.add("miss");
                loc.classList.remove("red", "avail");
            
        }
    },

    markAround: function(shipIndex){
        let string = '<i class="fa-solid fa-burst fa-lg"></i>'
        let ship = this.ships[shipIndex]
        for (let loc of ship.around){
            let id = loc+"C"
            loc = document.getElementById(id);
            loc.removeEventListener("click", listener);
            loc.innerHTML = string;
                
        }
}
}
//computer controller
computerControler = {
    round: function(){
            gameControler.generateMessage("");
            let shootLoc = computerControler.generateShot();
            if (gameControler.checkIfHit("computer",shootLoc)) {
                let shipIndex = gameControler.findShipIndex("computer",shootLoc);
                setTimeout(computerControler.markAsHit(shootLoc, shipIndex),500);
                let isSunk = gameControler.checkIfSunk("computer", shipIndex);
                if(isSunk){
                    playerModel.markAround(shipIndex);
                    gameControler.generateMessage("Computer sunk your ship.");
                    if (gameControler.checkIfWin("computer")){
                        gameControler.generateMessage("You lost, wonna try again?");
                    } else {
                        gameControler.generateMessage("Computer hit your ship");
                        setTimeout(computerControler.round, 1000);
                    }
                }else{
                    setTimeout(computerControler.round, 1000);
                }
            } else {
                gameControler.generateMessage("Computer missed.");
                setTimeout(computerControler.markAsMiss(shootLoc),500);
            }
    },

    generateShot: function(){
        let col = Math.floor(Math.random() * 10);
        let row = Math.floor(Math.random() * 10);
        let shootLoc = col+ "" +row
        if (playerModel.shoots.has(shootLoc)){
            computerControler.generateShot
        }else{
            playerModel.shoots.add(shootLoc)
            console.log("Comp shoot at " + shootLoc)
            return shootLoc;
        }
    },

    markAsMiss: function(location){
        let string = '<i class="fa-solid fa-burst fa-lg"></i>'
        const loc = document.getElementById(location);
        loc.innerHTML = string;
    },

    markAsHit: function(location, index){
        let string = '<img src="assets/media/fire.png" alt="fire">'
        const loc = document.getElementById(location);
        loc.innerHTML = string;
        let hitIndex = playerModel.ships[index].hits.indexOf(0);
        if (hitIndex != -1) {
            playerModel.ships[index].hits[hitIndex] = 1;
        }
    },
    }

//player model
playerModel = {

    boardSize : 10,
    numOfShips : 10,
    shoots : new Set(),
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
        let string = '<i class="fa-solid fa-ship fa-lg "></i>';
        for (const value of target) {
        
            let id = value
            let td = document.getElementById(id);
          
                td.innerHTML = string;
            
        }
    },

    displayAround: function(target) {
        for (const value of target) {
            let id = value
            let td = document.getElementById(id);
          
                td.classList.add("yellow")
            
        }
    },

    markAround: function(shipIndex){
        let string = '<i class="fa-solid fa-burst fa-lg"></i>'
        let ship = this.ships[shipIndex]
        for (let id of ship.around){
            this.shoots.add(id);
            loc = document.getElementById(id);
            loc.innerHTML = string;
                
        }
                    
            }
    }



//player controller
playerControler = {

    round: function(shootLoc) {
        gameControler.generateMessage("");
        document.getElementById(shootLoc+"C").removeEventListener("click", listener);
        if (gameControler.checkIfHit("user",shootLoc)) {
            
            let shipIndex = gameControler.findShipIndex("user",shootLoc);
            setTimeout(playerControler.markAsHit(shootLoc, shipIndex),1000);
            let isSunk = gameControler.checkIfSunk("user", shipIndex);
            if(isSunk){
                gameControler.generateMessage("You sink it!");
                computerModel.markAround(shipIndex);
                console.log("here")
                if (gameControler.checkIfWin("user"))
                gameControler.generateMessage("You won, grats!");
            }else{
                gameControler.generateMessage("You hit the ship");
            }
        } else {
            gameControler.generateMessage("You missed.");
            setTimeout(playerControler.markAsMiss(shootLoc),1000)
            setTimeout(computerControler.round, 1000);
            
        }
    },

   
    markAsMiss: function(location){
        let string = '<i class="fa-solid fa-burst fa-lg"></i>'
        const loc = document.getElementById(location+"C");
        loc.innerHTML = string;
        
    },

    markAsHit: function(location, index){
        let string = '<img src="assets/media/fire.png" alt="fire">'
        const loc = document.getElementById(location+"C");
        loc.innerHTML = string;
        let hitIndex = computerModel.ships[index].hits.indexOf(0);
        if (hitIndex != -1) {
            computerModel.ships[index].hits[hitIndex] = 1;
        }
    },

}


//game controller
gameControler = {

    checkIfWin: function(player){
        let model = (player == "computer") ? playerModel:computerModel;
        if (model.numOfShips == 0){
            
            return true;
        }
        return false;
    },

    checkIfSunk: function(player, index){
        let model = (player == "computer") ? playerModel:computerModel;
        if (model.ships[index].hits.indexOf(0) == -1){

            model.numOfShips-=1;
            return true;
        }
    },

    

    checkIfHit: function(player, location) {
        let model = (player == "computer") ? playerModel:computerModel;
        return model.allLocations.has(location);
    },

    findShipIndex: function(player, location){
        let model = (player == "computer") ? playerModel:computerModel;
        
        for (let i=0; i < model.ships.length;i++){
            if (model.ships[i].location.indexOf(location) != -1){
                return i;
            }
        }  
    },
    markAround: function(player, array){
        let model = (player == "computer") ? playerModel:computerModel;
        
    },
    generateMessage: function(text){
        document.getElementById("message").innerText = text;
    },
}

//init func
function init() {
    gameControler.generateMessage("");
    computerModel.generateShipLocations();
    playerModel.generateShipLocations();
    //computerModel.displayShip(computerModel.allLocations);

    //computerModel.displayAround(computerModel.allAround);
    playerModel.displayShip(playerModel.allLocations);
    //playerModel.displayAround(playerModel.allAround);
    const guessClick = document.getElementsByClassName("avail");
    for (let guess of guessClick){
        guess.addEventListener("click", listener);
    }

    
    //     const guessClick = document.getElementsByClassName("avail");
    // for (var i = 0; i < guessClick.length; i++) {
    //     guessClick[i].onclick = function(eventObj) {
    //         var shot = eventObj.target;
            
    //         var location = shot.id.charAt([0])+ "" + shot.id.charAt([1]);
    //         playerControler.round(location)
    //         console.log(shot);
    //         console.log("player shoot at " + location);
            
    //     };
    // }
    
}
function StartGame() {

}

function wonGame() {

}

function lostGame() {

}
function listener(e){
    let shot = e.target;
    console.log(shot)
    let location = shot.id.charAt([0])+ "" + shot.id.charAt([1]);
    playerControler.round(location); 
}


window.onload = init;