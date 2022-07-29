var board;
var PlayerR = ['red', '#A63D40']
var PlayerY = ['yellow', '#E9B872']
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
        ClearBoard()
        GameOver = false
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

    board[LowestPlayable][colonne] = currentPlayer[0];
    document.getElementById([LowestPlayable] + '-' + [colonne]).style.backgroundColor = currentPlayer[1]

    if (gagner(LowestPlayable, colonne, currentPlayer) == true) {
        console.log(currentPlayer + '  Won the Game , Congrats');
        return GameOver = true
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


    // Commençons par la manière avec le moins de possibilité soit la victoire vertical (où les 3 jetons sous le jeton joué sont de la couleur du jeton joué)

    // Victoire Vertical Fait
    try {
        let count = 0
        for (let index = 5; index >= 0; index--) {
            count = board[index][column] == currentPlayer[0] ? count + 1 : 0;
            if (count >= 4) return true
        }
        // if (board[line + 1][column] == currentPlayer[0] && board[line + 2][column] == currentPlayer[0] && board[line + 3][column] == currentPlayer[0]) {
        //     return true
        // }
        // else {
        //     return false
        // }
    } catch (error) {
        console.log(error);
    }


    // Victoire Horizontal FAIT (Pas super beau comme code , peut mieux faire , mais c'est fonctionnel)
    try {
        count = 0;
        for (let i = 0; i <= 7; i++) {
            count = board[line][i] == currentPlayer[0] ? count + 1 : 0;
            console.log(count);
            if (count >= 4) return true
        }

        // // Victoire 3 jeton droite
        // if (board[line][column + 1] == currentPlayer[0] && board[line][column + 2] == currentPlayer[0] && board[line][column + 3] == currentPlayer[0]) {
        //     return true
        // }
        // // Victoire 3 jeton gauche
        // if (board[line][column - 1] == currentPlayer[0] && board[line][column - 2] == currentPlayer[0] && board[line][column - 3] == currentPlayer[0]) {
        //     return true
        // }
        // //victoire 2 gauche 1 droite 
        // if (board[line][column - 1] == currentPlayer[0] && board[line][column - 2] == currentPlayer[0] && board[line][column + 1] == currentPlayer[0]) {
        //     return true
        // }
        // // victoire 2 droite 1 gauche
        // if (board[line][column - 1] == currentPlayer[0] && board[line][column + 1] == currentPlayer[0] && board[line][column + 2] == currentPlayer[0]) {
        //     return true
        // }
        // else {
        //     return false
        // }

    } catch (error) {
        console.log(error);
    }



    // Victoire Diagonal (8 possibilité)

    try {
        // diagonal de topleft à bottom right
        // 3 BottomLeft
        if (board[line + 1][column + 1] == currentPlayer[0] && board[line + 2][column + 2] == currentPlayer[0] && board[line + 3][column + 3] == currentPlayer[0]) {
            return true
        }
        // 1 TopLeft 2BottomRight
        if (board[line - 1][column - 1] == currentPlayer[0] && board[line + 1][column + 1] == currentPlayer[0] && board[line + 2][column + 2] == currentPlayer[0]) {
            return true
        }
        // 2 TopLeft 1BottomRight
        if (board[line - 1][column - 1] == currentPlayer[0] && board[line - 2][column - 2] == currentPlayer[0] && board[line + 1][column + 1] == currentPlayer[0]) {
            return true
        }
        // 3 TopLeft
        if (board[line - 1][column - 1] == currentPlayer[0] && board[line - 2][column - 2] == currentPlayer[0] && board[line - 3][column - 3] == currentPlayer[0]) {
            return true
        }
        // Diagonal de BottomLeft à TopRight
        // 3 BottomLeft
        if (board[line + 1][column - 1] == currentPlayer[0] && board[line + 2][column - 2] == currentPlayer[0] && board[line + 3][column - 3] == currentPlayer[0]) {
            return true
        }
        // 2 BottomLeft 1 TopRight
        if (board[line + 1][column - 1] == currentPlayer[0] && board[line + 2][column - 2] == currentPlayer[0] && board[line - 1][column + 1] == currentPlayer[0]) {
            return true
        }
        // 1 BottomLeft 2 TopRight
        if (board[line + 1][column - 1] == currentPlayer[0] && board[line - 1][column + 1] == currentPlayer[0] && board[line - 2][column + 2] == currentPlayer[0]) {
            return true
        }
        // 3 TopRight
        if (board[line - 1][column + 1] == currentPlayer[0] && board[line - 2][column + 2] == currentPlayer[0] && board[line - 3][column + 3] == currentPlayer[0]) {
            return true
        }
        else {
            return false
        }
    } catch (error) {
        console.log(error);
    }



    console.log(line, column, currentPlayer);
    console.log(board[line - 1][column - 1]);
    console.log(board);





    return false

}