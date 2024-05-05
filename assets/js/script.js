document.addEventListener("DOMContentLoaded", function () {


    const guessClick = document.getElementsByClassName("avail");
    for (let guess of guessClick) {
        guess.addEventListener("click", listener);
    }

    function listener(e) {
        shoot(e);
    }

    function shoot(e) {
        let shot = e.target;
        let location = shot.id.charAt([0]) + "" + shot.id.charAt([1]);
        playerController.round(location);
    }



    //player model
    playerModel = {

        boardSize: 10,
        numOfShips: 10,
        shoots: new Set(),
        allAround: new Set(),
        allLocations: new Set(),

        ships: [
            { location: ["", "", "", ""], hits: [0, 0, 0, 0], around: [] },

            { location: ["", "", ""], hits: [0, 0, 0], around: [] },
            { location: ["", "", ""], hits: [0, 0, 0], around: [] },

            { location: ["", ""], hits: [0, 0], around: [] },
            { location: ["", ""], hits: [0, 0], around: [] },
            { location: ["", ""], hits: [0, 0], around: [] },

            { location: [""], hits: [0], around: [] },
            { location: [""], hits: [0], around: [] },
            { location: [""], hits: [0], around: [] },
            { location: [""], hits: [0], around: [] },
        ],

        generateShipLocations: function () {

            let location;
            let aroundLoc;

            for (let i = 0; i < this.numOfShips; i++) {

                location = this.generateShip(i);
                this.ships[i].location = location;

                for (let i = 0; i < location.length; i++) {
                    this.allLocations.add(location[i]);
                }

                aroundLoc = this.generateAroundLoc(location);

                this.ships[i].around = aroundLoc;

                for (const value of aroundLoc) {
                    this.allAround.add(value);
                }
            }
        },

        generateAroundLoc: function (shipLoc) {

            let around = new Set()

            for (let i = 0; i < shipLoc.length; i++) {
                let firstDig = Math.floor(shipLoc[i] / 10);
                let secondDig = shipLoc[i] % 10;

                if (firstDig != 0) {
                    around.add(parseInt((firstDig - 1) + "" + secondDig));
                }
                if (firstDig != 9) {
                    around.add(parseInt((firstDig + 1) + "" + secondDig));
                }
                if (secondDig != 0) {
                    around.add(parseInt(firstDig + "" + (secondDig - 1)));
                }
                if (secondDig != 9) {
                    around.add(parseInt((firstDig) + "" + (secondDig + 1)));
                }
                if (firstDig != 0 && secondDig != 0) {
                    around.add(parseInt((firstDig - 1) + "" + (secondDig - 1)));
                }
                if (firstDig != 0 && secondDig != 9) {
                    around.add(parseInt((firstDig - 1) + "" + (secondDig + 1)));
                }
                if (firstDig != 9 && secondDig != 0) {
                    around.add(parseInt((firstDig + 1) + "" + (secondDig - 1)));
                }
                if (firstDig != 9 && secondDig != 9) {
                    around.add(parseInt((firstDig + 1) + "" + (secondDig + 1)));
                }
            }

            for (value of shipLoc) {
                around.delete(value);
            }

            return around;
        },

        generateShip: function (i) {

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
                    shipLoc.push(parseInt(row + "" + (col + j)));
                } else {
                    shipLoc.push(parseInt((row + j) + "" + col));
                }
            }

            let newShipLoc = this.checkForCollision(shipLoc);

            return newShipLoc == 1 ? this.generateShip(i) : newShipLoc;
        },

        checkForCollision: function (newShipLoc) {
            for (let i = 0; i < newShipLoc.length; i++) {
                if (this.allAround.has(newShipLoc[i]) || this.allLocations.has(newShipLoc[i])) {
                    return 1;
                }
            } return newShipLoc;
        },

        displayShip: function (target) {

            let string = '<i class="fa-solid fa-ship fa-lg "></i>';
            for (const value of target) {

                let id = value;
                let div = document.getElementById(id);
                div.innerHTML = string;
            }
        },

        markAround: function (shipIndex) {

            let string = '<i class="fa-solid fa-burst fa-lg"></i>';
            let ship = this.ships[shipIndex];

            for (let id of ship.around) {
                this.shoots.add(id);
                let div = document.getElementById(id);
                div.innerHTML = string;

                let indexToRemove = computerModel.availShoots.indexOf(id);
                if (indexToRemove != -1)
                    computerModel.availShoots.splice(indexToRemove, 1);
            }

        }
    }

    //computer model
    computerModel = {

        boardSize: 10,
        numOfShips: 10,
        allAround: new Set(),
        allLocations: new Set(),
        availShoots: [],

        ships: [
            { location: ["", "", "", ""], hits: [0, 0, 0, 0], around: [] },

            { location: ["", "", ""], hits: [0, 0, 0], around: [] },
            { location: ["", "", ""], hits: [0, 0, 0], around: [] },

            { location: ["", ""], hits: [0, 0], around: [] },
            { location: ["", ""], hits: [0, 0], around: [] },
            { location: ["", ""], hits: [0, 0], around: [] },

            { location: [""], hits: [0], around: [] },
            { location: [""], hits: [0], around: [] },
            { location: [""], hits: [0], around: [] },
            { location: [""], hits: [0], around: [] },
        ],

        shootCloseAssistant: {
            lastShot: 0,
            lastGoodShot: 0,
        },

        generateShipLocations: function () {

            let location;
            let aroundLoc;

            for (let i = 0; i < this.numOfShips; i++) {

                location = this.generateShip(i);
                this.ships[i].location = location;

                for (let i = 0; i < location.length; i++) {
                    this.allLocations.add(location[i]);
                }

                aroundLoc = this.generateAroundLoc(location);

                this.ships[i].around = aroundLoc;

                for (const value of aroundLoc) {
                    this.allAround.add(value);
                }
            }
        },

        generateAroundLoc: function (shipLoc) {

            let around = new Set()

            for (let i = 0; i < shipLoc.length; i++) {
                let firstDig = Math.floor(shipLoc[i] / 10);
                let secondDig = shipLoc[i] % 10;

                if (firstDig != 0) {
                    around.add((firstDig - 1) + "" + secondDig);
                }
                if (firstDig != 9) {
                    around.add((firstDig + 1) + "" + secondDig);
                }
                if (secondDig != 0) {
                    around.add(firstDig + "" + (secondDig - 1));
                }
                if (secondDig != 9) {
                    around.add((firstDig) + "" + (secondDig + 1));
                }
                if (firstDig != 0 && secondDig != 0) {
                    around.add((firstDig - 1) + "" + (secondDig - 1));
                }
                if (firstDig != 0 && secondDig != 9) {
                    around.add((firstDig - 1) + "" + (secondDig + 1));
                }
                if (firstDig != 9 && secondDig != 0) {
                    around.add((firstDig + 1) + "" + (secondDig - 1));
                }
                if (firstDig != 9 && secondDig != 9) {
                    around.add((firstDig + 1) + "" + (secondDig + 1));
                }
            }

            for (value of shipLoc) {
                around.delete(value);
            }
            return around;
        },

        generateShip: function (i) {

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

        checkForCollision: function (newShipLoc) {

            for (let i = 0; i < newShipLoc.length; i++) {
                if (this.allAround.has(newShipLoc[i]) || this.allLocations.has(newShipLoc[i])) {
                    return 1;
                }
            }
            return newShipLoc;
        },

        displayShip: function (target) {

            let string = '<i class="fa-solid fa-ship fa-lg "></i>';
            for (const value of target) {

                let id = value + "C";
                let div = document.getElementById(id);
                div.innerHTML = string;
            }
        },

        markAround: function (shipIndex) {

            let string = '<i class="fa-solid fa-burst fa-lg"></i>';
            let ship = this.ships[shipIndex];

            for (let loc of ship.around) {
                let id = loc + "C";
                let div = document.getElementById(id);
                div.removeEventListener("click", listener);
                div.innerHTML = string;
            }
        }
    }

    //player controller
    let playerController = {

        round: function (shootLoc) {

            gameController.generateMessage("");


            let div = document.getElementById(shootLoc + "C")
            div.removeEventListener("click", listener);

            if (gameController.checkIfHit("user", shootLoc)) {

                let shipIndex = gameController.findShipIndex("user", shootLoc);
                playerController.markAsHit(shootLoc, shipIndex);

                let isSunk = gameController.checkIfSunk("user", shipIndex);

                if (isSunk) {
                    gameController.generateMessage("You sink it!");
                    computerModel.markAround(shipIndex);

                    if (gameController.checkIfWin("user")) {
                        gameController.generateMessage("You won, grats!");
                        window.stop();
                    }
                } else {
                    gameController.generateMessage("You hit the ship");
                }
            } else {
                playerController.markAsMiss(shootLoc);
                setTimeout(computerController.generateTarget, 1000);
            }
        },


        markAsMiss: function (location) {
            let string = '<i class="fa-solid fa-burst fa-lg"></i>';
            const div = document.getElementById(location + "C");
            div.innerHTML = string;

        },

        markAsHit: function (location, index) {
            let string = '<img src="assets/media/fire.png" alt="fire">';
            const div = document.getElementById(location + "C");
            div.innerHTML = string;

            let hitIndex = computerModel.ships[index].hits.indexOf(0);
            if (hitIndex != -1) {
                computerModel.ships[index].hits[hitIndex] = 1;
            }
        }
    }

    // computer controller
    let computerController = {

        generateTarget: function () {
            let target;
            if (!computerModel.shootCloseAssistant["lastGoodShot"]) {
                target = computerModel.availShoots.shift();
                computerController.round(target);
            } else {
                setTimeout(computerController.shootClose, 1000);
            }
        },

        round: function (shootLoc) {

            gameController.generateMessage("");
            playerModel.shoots.add(shootLoc)
            console.log(computerModel.availShoots.length)
            console.log(playerModel.shoots)
            let isHit = gameController.checkIfHit("computer", shootLoc)

            if (isHit) {
                computerModel.shootCloseAssistant["lastGoodShot"] = shootLoc;

                let shipIndex = gameController.findShipIndex("computer", shootLoc);

                computerController.markAsHit(shootLoc, shipIndex);
                let isSunk = gameController.checkIfSunk("computer", shipIndex);

                if (isSunk) {
                    playerModel.markAround(shipIndex);
                    if (gameController.checkIfWin("computer")) {
                        gameController.generateMessage("You lost, wonna try again?");

                    } else {
                        gameController.generateMessage("Computer sunk your ship.");
                        computerModel.shootCloseAssistant["lastShot"] = 0;
                        computerModel.shootCloseAssistant["lastGoodShot"] = 0;
                        setTimeout(computerController.generateTarget, 1000);
                    }
                } else {
                    setTimeout(computerController.shootClose, 1000);
                }
            } else {
                computerController.markAsMiss(shootLoc);
                computerModel.shootCloseAssistant["lastShot"] = 0;
                computerModel.shootCloseAssistant["lastGoodShot"] = 0;
                gameController.generateMessage("Your turn, hit.");
            }
        },

        markAsHit: function (location, index) {
            let string = '<img src="assets/media/fire.png" alt="fire">'
            let div = document.getElementById(location);
            div.innerHTML = string;

            let hitIndex = playerModel.ships[index].hits.indexOf(0);
            if (hitIndex != -1) {
                playerModel.ships[index].hits[hitIndex] = 1;
            }
        },

        markAsMiss: function (location) {
            let string = '<i class="fa-solid fa-burst fa-lg"></i>'
            let div = document.getElementById(location);
            div.innerHTML = string;

        },
        generateCloseTargets: function (location) {

            let firstDig = Math.floor(location / 10);
            let secondDig = location % 10;
            let result;
            let targets = [];
            if (firstDig != 0) {
                result = ((firstDig - 1) + "" + secondDig)
                if (!playerModel.shoots.has(result))
                    targets.push(parseInt(result))
            }
            if (firstDig != 9) {
                result = ((firstDig + 1) + "" + secondDig)
                if (!playerModel.shoots.has(result))
                    targets.push(parseInt(result))
            }
            if (secondDig != 0) {
                result = (firstDig + "" + (secondDig - 1))
                if (!playerModel.shoots.has(result))
                    targets.push(parseInt(result))
            }
            if (secondDig != 9) {
                result = ((firstDig) + "" + (secondDig + 1))
                if (!playerModel.shoots.has(result))
                    targets.push(parseInt(result))
            }
            return targets;
        },

        shootClose: function () {
            let location = computerModel.shootCloseAssistant["lastGoodShot"];
            let targets = computerController.generateCloseTargets(location);
            let targetIndex = Math.floor(Math.random() * targets.length);
            let lastShot = targets[targetIndex]
            computerModel.shootCloseAssistant["lastShot"] = lastShot;

            let indexToRemove = computerModel.availShoots.indexOf(lastShot);
            if (indexToRemove != -1)
                computerModel.availShoots.splice(indexToRemove, 1);

            computerController.round(lastShot);
        },

    }

    //game controller

    gameController = {

        checkIfWin: function (player) {
            let model = (player == "computer") ? playerModel : computerModel;
            if (model.numOfShips == 0) {
                return true;
            }
            return false;
        },

        checkIfSunk: function (player, index) {
            let model = (player == "computer") ? playerModel : computerModel;
            if (model.ships[index].hits.indexOf(0) == -1) {
                model.numOfShips -= 1;
                return true;
            } else {
                return false;
            }
        },

        checkIfHit: function (player, location) {
            let model = (player == "computer") ? playerModel : computerModel;
            return model.allLocations.has(location);
        },

        findShipIndex: function (player, location) {
            let model = (player == "computer") ? playerModel : computerModel;

            for (let i = 0; i < model.ships.length; i++) {
                if (model.ships[i].location.indexOf(location) != -1) {
                    return i;
                }
            }
        },

        generateMessage: function (text) {
            document.getElementById("message").innerText = text;
        },
    }


    startGame();
});

function startGame() {
    computerModel.generateShipLocations();
    playerModel.generateShipLocations();
    playerModel.displayShip(playerModel.allLocations);
    generateAvailShoots();
    gameController.generateMessage("Let the game begin. Press any location to shoot!");
}

function generateAvailShoots() {
    for (let i = 0; i < 100; i++) {
        computerModel.availShoots.push(i);
    }
    computerModel.availShoots.sort(function () { return 0.5 - Math.random() });
}

