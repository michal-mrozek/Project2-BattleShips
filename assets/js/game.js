function init() {

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