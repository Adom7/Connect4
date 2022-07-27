var board;
var PlayerR = ['R', 'red']
var PlayerY = ['Y', 'yellow']
var PlayerRed = "Red";
var PlayerYellow = "Yellow";
var currentPlayer = PlayerR;
var GameOver = false

window.onload = function () {
    setGame();
}

function setGame() {
    board = [
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '']
    ]
    // where x = row and y = column
    for (let x = 0; x < 6; x++) {
        for (let y = 0; y < 7; y++) {
            // <div id='x-y'></div>
            let jeton = document.createElement('div');
            jeton.id = x.toString() + "-" + y.toString();
            jeton.classList.add('jeton')
            jeton.addEventListener('click', setJeton);
            document.getElementById('board').append(jeton)
        }
    }
}

function setJeton() {
    if (GameOver) {
        return
    }

    let coords = this.id.split('-')
    let x = parseInt(coords[0]);
    let y = parseInt(coords[1]);

    board[x][y] = currentPlayer;
    this.innerText = currentPlayer[0];
    this.style.backgroundColor = currentPlayer[1];
    if (currentPlayer == PlayerR) {
        currentPlayer = PlayerY
    }
    else
        currentPlayer = PlayerR
}