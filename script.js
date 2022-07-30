var board
var PlayerR = ['Red', '#A63D40']
var PlayerY = ['Yellow', '#E9B872']
var currentPlayer = PlayerR;
var GameOver = false
var nbLigne = 6
var nbColonne = 7
var NeedToWin = 4


window.onload = function () {
    setGame()
}

let ButtonClear = document.getElementById('ResetBoard')

ButtonClear.addEventListener('click', ClearBoard)

function ClearBoard() {


    board = []

    // board = [
    //     ['', '', '', '', '', '', ''],
    //     ['', '', '', '', '', '', ''],
    //     ['', '', '', '', '', '', ''],
    //     ['', '', '', '', '', '', ''],
    //     ['', '', '', '', '', '', ''],
    //     ['', '', '', '', '', '', '']
    // ]

    for (let ligne = 0; ligne < nbLigne; ligne++) {
        board.push(new Array(nbColonne))
        for (let colonne = 0; colonne < nbColonne; colonne++) {
            board[ligne][colonne] = ''
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
            jeton.addEventListener('click', () => setJeton(ligne, colonne));
            document.getElementById('board').append(jeton)
        }
    }
}

function setJeton(ligne, colonne) {
    if (GameOver) {
        ClearBoard()
        GameOver = false
        return
    }

    // let coords = this.id.split('-')
    // let ligne = parseInt(coords[0]);
    // let colonne = parseInt(coords[1]);

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

    if (MatchOver(LowestPlayable, colonne, currentPlayer) == true) {
        window.alert('🥳 ' + currentPlayer[0] + ` Player Won the game Congrats !! 🥳  Let's play again !😉`)
        console.log(board);
        return GameOver = true
    }

    if (currentPlayer == PlayerR) {
        currentPlayer = PlayerY
    }
    else
        currentPlayer = PlayerR



}


function MatchOver(line, column, currentPlayer) {
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


    } catch (error) {
        console.log(error);
    }


    // Victoire Horizontal FAIT 
    try {
        count = 0;
        for (let i = 0; i <= 7; i++) {
            count = board[line][i] == currentPlayer[0] ? count + 1 : 0;
            if (count >= 4) return true
        }


    } catch (error) {
        console.log(error);
    }

    // Victoire Diagonal '\'

    console.log(`Piece Jouer ligne : ${line} et colonne : ${column} `);

    // fonctionnne , on cherche le i le plus haut possible donc i = (nbColonne-1) - line

    try {
        count = 0
        for (let i = ((nbLigne - 1) - line); i >= -3; i--) {
            count = board[line + i][column + i] == currentPlayer[0] ? count + 1 : 0;
            if (count >= 4) return true
        }
    } catch (error) {
        console.log(error);
    }



    // Victoire Anti-Diagonal '/'

    // for (let i = ((nbLigne - 1) - line); i >= -3; i--) {
    //     count = board[line + i][column - i] == currentPlayer[0] ? count + 1 : 0;
    //     console.log(`line : ${line + i}`);
    //     console.log(`column : ${column - i}`);
    //     if (count >= 4) return true
    // }




    // var directions = [
    //     [-1, 1],
    //     [-1, -1],
    //     [1, -1],
    //     [1, 1]
    // ]

    // for (let i = 0; i < directions.length; i++) {
    //     count = 0
    //     const direction = directions[i];
    //     for (let j = 0; j < NeedToWin; j++) {
    //         count = board[line + (j * direction[0])][column + (j * direction[1])] = currentPlayer[0] ? count + 1 : 0
    //         if (count >= NeedToWin) return true
    //     }

    // }

    // Victoire Diagonal (8 possibilité) (Pas super beau comme code , peut mieux faire , mais c'est fonctionnel)

    // try {
    //     // diagonal de topleft à bottom right
    //     // 3 BottomLeft
    //     if (board[line + 1][column + 1] == currentPlayer[0] && board[line + 2][column + 2] == currentPlayer[0] && board[line + 3][column + 3] == currentPlayer[0]) {
    //         return true
    //     }
    //     // 1 TopLeft 2BottomRight
    //     if (board[line - 1][column - 1] == currentPlayer[0] && board[line + 1][column + 1] == currentPlayer[0] && board[line + 2][column + 2] == currentPlayer[0]) {
    //         return true
    //     }
    //     // 2 TopLeft 1BottomRight
    //     if (board[line - 1][column - 1] == currentPlayer[0] && board[line - 2][column - 2] == currentPlayer[0] && board[line + 1][column + 1] == currentPlayer[0]) {
    //         return true
    //     }
    //     // 3 TopLeft
    //     if (board[line - 1][column - 1] == currentPlayer[0] && board[line - 2][column - 2] == currentPlayer[0] && board[line - 3][column - 3] == currentPlayer[0]) {
    //         return true
    //     }
    //     // Diagonal de BottomLeft à TopRight
    //     // 3 BottomLeft
    //     if (board[line + 1][column - 1] == currentPlayer[0] && board[line + 2][column - 2] == currentPlayer[0] && board[line + 3][column - 3] == currentPlayer[0]) {
    //         return true
    //     }
    //     // 2 BottomLeft 1 TopRight
    //     if (board[line + 1][column - 1] == currentPlayer[0] && board[line + 2][column - 2] == currentPlayer[0] && board[line - 1][column + 1] == currentPlayer[0]) {
    //         return true
    //     }
    //     // 1 BottomLeft 2 TopRight
    //     if (board[line + 1][column - 1] == currentPlayer[0] && board[line - 1][column + 1] == currentPlayer[0] && board[line - 2][column + 2] == currentPlayer[0]) {
    //         return true
    //     }
    //     // 3 TopRight
    //     if (board[line - 1][column + 1] == currentPlayer[0] && board[line - 2][column + 2] == currentPlayer[0] && board[line - 3][column + 3] == currentPlayer[0]) {
    //         return true
    //     }
    //     else {
    //         return false
    //     }
    // } catch (error) {
    //     console.log(error);
    // }

    // Match nul 
    count = 0
    for (let i = 0; i < 7; i++) {
        count = board[0][i] !== '' ? count + 1 : 0
        if (count >= 6) {
            window.alert(`Sadly no Winner this Time !`)
            GameOver = true
            return false
        }
    }


    return false

}