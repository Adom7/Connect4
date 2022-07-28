var board;
var PlayerR = ['R', 'red']
var PlayerY = ['Y', 'yellow']
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
    // la ligne sélection par le joueur n'est pas importante car elle sera modifié par la suite du code
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
    document.getElementById([LowestPlayable] + '-' + [colonne]).innerText = currentPlayer[0];
    document.getElementById([LowestPlayable] + '-' + [colonne]).style.backgroundColor = currentPlayer[1]

    if (currentPlayer == PlayerR) {
        currentPlayer = PlayerY
    }
    else
        currentPlayer = PlayerR
}


function gagner(CoordsJeton) {
    // Une fois un jeton jouer, il faut verifier si le joueur a gagner, Pour voir si un jouer a gagner, il faut d'abord verifier si il y a un jeton de même couleur adjacent a ce jeton
    // Nous avons donc dans le 'pire' des cas 7 jetons adjacent a verifier Top-Left, Left, Bottom-left, Bottom, Bottom-Right, Right et Top-Right 
    // on check donc si une de ces possibilité est verifier.  si le jeton joué est Rouge et le jeton Adjagent 'Right' est également rouge
    // donc si le jeton jouer est en (ligne-colonne) on verifie le jeton de droite (ligne-(colonne+1)) si le jeton en c+1 est de même couleur on check le c+2 et le c+3 si les 4 sont de meme couleurs c'est gagner

    //Dans le cas ou 2 Possibilité ou plus sont juste, nous avons des paires de possibilité compatible , exemple Top-Left et Bottom-right sont tout les 2 de la couleur de notre jeton joué
    // alors il nous suffit de verifier uniquement 1 jeton dans cette direction soit ((l+1)-(c-1)) et ((l-1)-(c+1)) pour verifier si le joueur a gagner
    // ça semble clair, maintenant il faut le coder :)


    // Equations de chaques possibilité
    let TopLeft = board[ligne + 1][colonne - 1]
    let Left = board[ligne][colonne - 1]
    let BottomLeft = board[ligne - 1][colonne - 1]
    let Bottom = board[ligne - 1][colonne]
    let BottomRight = board[ligne - 1][colonne + 1]
    let Right = board[ligne][colonne + 1]
    let TopRight = board[ligne + 1][colonne + 1]

}