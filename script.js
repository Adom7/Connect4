var board;
var PlayerR = ['R', 'red']
var PlayerY = ['Y', 'yellow']
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
    // Ou x = ligne and y = colonne
    for (let ligne = 0; ligne < 6; ligne++) {
        for (let colonne = 0; colonne < 7; colonne++) {
            let jeton = document.createElement('div');
            jeton.id = ligne.toString() + "-" + colonne.toString();
            // <div id='x-y'></div> 
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
    let LowestPlayable = LowestLigne(colonne)
    console.log(this);

    function LowestLigne(y) {
        for (let x = 5; x > 0; x--) {
            const XYCheck = board[x][y]
            if (XYCheck == '') {
                console.log(x);
                return x
            }
        }
    }


    // On souhaite aplliquer le jeton à la valeur X la plus basse (Graphiquement) ce qui implique qui faut que la valeur de X soit la plus haute (suivant la Logique de notre code)
    board[LowestPlayable][colonne] = currentPlayer;
    // On Change la couleur du background pour la case jouer
    document.getElementById([LowestPlayable] + '-' + [colonne]).innerText = currentPlayer[0];
    document.getElementById([LowestPlayable] + '-' + [colonne]).style.backgroundColor = currentPlayer[1]
    // this.style.backgroundColor = currentPlayer[1];
    console.log(board);
    if (currentPlayer == PlayerR) {
        currentPlayer = PlayerY
    }
    else
        currentPlayer = PlayerR
}
// Grâce à CheckifSupported on verifie qu'il y a bien un jeton sous le jeton que nous souhaitons placer, si non on place le jeton a la position la plus basse soit le y le plus elevé (Voir schéma)

// il manque pour le moment la logique pour voir qui gagne , la 'gravité' l'obligation de jouer en bas du plateau , et d'avoir un jeton sous le nouveau jeton pour le placer