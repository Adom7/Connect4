var board;
var PlayerR = 'red'
var PlayerY = 'yellow'
var currentPlayer = PlayerR;
var GameOver = false

window.onload = function () {
    setGame();
}

let ButtonClear = document.getElementById('ResetBoard')

ButtonClear.addEventListener('click', ClearBoard)

function ClearBoard() {

    board = [
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '']
    ]

    for (let ligne = 0; ligne < 6; ligne++) {
        for (let colonne = 0; colonne < 7; colonne++) {
            document.getElementById([ligne] + '-' + [colonne]).innerText = null
            document.getElementById([ligne] + '-' + [colonne]).style.background = null
        }
    }

    console.log(board);
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
    for (let ligne = 0; ligne < 6; ligne++) {
        for (let colonne = 0; colonne < 7; colonne++) {
            let jeton = document.createElement('div');
            jeton.id = ligne.toString() + "-" + colonne.toString();
            // <div id='ligne-colonne'></div> 
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
    let ligne = parseInt(coords[0]);
    let colonne = parseInt(coords[1]);

    // on recupére les coordonnées savoir où le joueur souhaite jouer, et appliquer notre logique au coup qu'il souhaite jouer
    let LowestPlayable = LowestLigne(colonne)
    // On veut faire en sorte que le jeton aille en bas du plateau de jeu (ligne la plus élevé en suivant la logique du code)
    function LowestLigne(colonne) {
        for (let ligne = 5; ligne >= 0; ligne--) {
            const XYCheck = board[ligne][colonne]
            if (XYCheck == '') {
                return ligne
            }
        }
    }

    board[LowestPlayable][colonne] = currentPlayer;
    document.getElementById([LowestPlayable] + '-' + [colonne]).innerText = currentPlayer
    document.getElementById([LowestPlayable] + '-' + [colonne]).style.backgroundColor = currentPlayer

    if (gagner(LowestPlayable, colonne, currentPlayer) == true) {
        console.log(currentPlayer + 'Won the Game , Congrats');
    }

    if (currentPlayer == PlayerR) {
        currentPlayer = PlayerY
    }
    else
        currentPlayer = PlayerR



}


function gagner(line, column, currentPlayer) {
    //NOTE 
    // Une fois un jeton jouer, il faut verifier si le joueur a gagner, Pour voir si un jouer a gagner, il faut d'abord verifier si il y a un jeton de même couleur adjacent a ce jeton
    // Nous avons donc dans le 'pire' des cas 7 jetons adjacent a verifier Top-Left, Left, Bottom-left, Bottom, Bottom-Right, Right et Top-Right 
    // on check donc si une de ces possibilité est verifier.  si le jeton joué est Rouge et le jeton Adjagent 'Right' est également rouge
    // donc si le jeton jouer est en (ligne-colonne) on verifie le jeton de droite (ligne-(colonne+1)) si le jeton en c+1 est de même couleur on check le c+2 et le c+3 si les 4 sont de meme couleurs c'est gagner

    //Dans le cas ou 2 Possibilité ou plus sont juste, nous avons des paires de possibilité compatible , exemple Top-Left et Bottom-right sont tout les 2 de la couleur de notre jeton joué
    // alors il nous suffit de verifier uniquement 1 jeton dans cette direction soit ((l+1)-(c-1)) et ((l-1)-(c+1)) pour verifier si le joueur a gagner
    // ça semble clair, maintenant il faut le coder :)


    //ANCHOR Equations de chaques possibilité
    // TopLeft = board[ligne - 1][colonne - 1]
    // Left = board[ligne][colonne - 1]
    // BottomLeft = board[ligne + 1][colonne - 1]
    // Bottom = board[ligne + 1][colonne]
    // BottomRight = board[ligne + 1][colonne + 1]
    // Right = board[ligne][colonne + 1]
    // TopRight = board[ligne - 1][colonne + 1]


    let TopLeft = false
    let Left = false
    let BottomLeft = false
    let Bottom = false
    let BottomRight = false
    let Right = false
    let TopRight = false

    console.log(line, column, currentPlayer);
    console.log(board[line - 1][column - 1]);
    console.log(board);

    if (board[ligne][colonne + 1] == currentPlayer) {
        if (board[ligne][colonne + 2] == currentPlayer) {
            if (board[ligne][colonne + 3] == currentPlayer) {
                console.log(currentPlayer + 'WON');
                return true
            }
        }
    }







    return false

}