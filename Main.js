
let inputs = Array.from(Array(3), () => Array(3).fill(null));
let divs = Array.from(document.querySelectorAll('.grid div'));
var gameEnded = false;
let currentCharacter = 'o';
let currentPlayer = document.querySelector('div.current-player');
let numberOfPlayer1 = 0;
let numberOfPlayer2 = 0;
let character = "";

divs.forEach((div, index) => {
    div.addEventListener('click', e => {
        if (div.className != "") { return; }
        if (gameEnded) { return; }

        let i = Math.floor(index / 3);
        let j = Math.floor(index % 3);
        inputs[i][j] = div.className = currentCharacter;
        currentCharacter = (currentCharacter == 'o') ? 'x' : 'o';
       
        currentPlayer.className = "current-player disabled";
        setTimeout(() => currentPlayer.className = "current-player " + currentCharacter, 200);
        CheckWinner();
        if(currentCharacter != 'o' && gameEnded()) { alert("ss"); }
    });
});

let checkers = Array(8);

function CheckWinner() {
    SetCheckers();
    let checkerIndex = -1;
    checkers.forEach((checker, index) => {
        if (checker) { checkerIndex = index; return; }
    });

    if (checkerIndex == -1) { return;  }
    document.querySelector(".line").className += " " + "i" + checkerIndex; 
    gameEnded = true;

    let player1Won = currentCharacter == 'x';
    document.querySelector(`.value-for-${player1Won ? 'o' : 'x'}`).innerText =
        `Player${player1Won ? '1' : '2'}: ` + (player1Won ? (numberOfPlayer1 += 1) : (numberOfPlayer2 += 1));

    document.querySelector('.section2 p').innerText = `Player ${player1Won ? 'o' : 'x'} has won`;
    setTimeout(() => document.querySelector(".section2").classList.add('shown'), 500);
}

function SetCheckers() {
    for (let i = 0; i < 3; i++) {
        checkers[i] = inputs[i][0] != null && inputs[i][0] == inputs[i][1] && inputs[i][1] == inputs[i][2];
    }
    for (let i = 0; i < 3; i++) {
        checkers[i + 3] = inputs[0][i] != null && inputs[0][i] == inputs[1][i] && inputs[1][i] == inputs[2][i];
    }
    checkers[6] = inputs[0][0] != null && inputs[0][0] == inputs[1][1] && inputs[1][1] == inputs[2][2];
    checkers[7] = inputs[0][2] != null && inputs[0][2] == inputs[1][1] && inputs[1][1] == inputs[2][0];
}


document.querySelector(".continue-button").addEventListener('click', e => NextGame());
document.querySelector(".restart-button").addEventListener('click', e => {
    numberOfPlayer1 = numberOfPlayer2 = 0;
    document.querySelector(`.value-for-o`).innerText =  "Player1: 0";
    document.querySelector(`.value-for-x`).innerText =  "Player2: 0";

   
    currentCharacter = 'o';
    currentPlayer.className = 'current-player o';

    NextGame();
});

function NextGame() {
    gameEnded = false;
    document.querySelector('.line').className = 'line';

    Array.from(document.querySelectorAll('.grid div')).forEach(div => {
        div.className = "";
    });

    document.querySelector('.section2').className = 'section2';

    checkers = Array(8);
    inputs = Array.from(Array(3), () => Array(3).fill(null));
}