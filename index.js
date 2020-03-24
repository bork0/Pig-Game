/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/
document.querySelector('.dice').classList.add('hide');

let score = [0,0];
let roundScore = 0;
let activePlayer = 0;
let message = document.querySelector('.message');
let action = document.querySelector('.action');
let roll = document.querySelector('.btn-roll');
let hold = document.querySelector('.btn-hold');
let newGame = document.querySelector('.btn-new');

function hide () {
    message.classList.add('hide');
    action.classList.add('hide');
}

function messageCall () {
    message.classList.remove('hide');
    message.textContent = `Your move, player ${activePlayer===0?'1':'2'}`;
}

function actionCall () {
    action.classList.remove('hide');
    action.textContent = `Player ${activePlayer===0?'1':'2'} decided to Hold.`
}

function changePlayer () {
    document.querySelector(`#current-${activePlayer}`).textContent = '0';
    document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    document.querySelector('.dice').classList.add('hide');
    messageCall();
    document.querySelector(`.player-${activePlayer}-panel`).classList.add('active');
    roundScore = 0;
}

function startNewGame () {
    document.querySelector('.dice').classList.add('hide');
    hide();
    for (let i = 0; i<2; i++) {
    score[i] = 0;
    document.querySelector(`#current-${i}`).textContent = '0';
    document.querySelector(`#score-${i}`).textContent = '0';
    document.querySelector(`#name-${i}`).textContent = `Player${i+1}`;
    document.querySelector(`#name-${i}`).classList.remove('greenText');
    }
    roll.disabled = false;
    hold.disabled = false;
}

roll.addEventListener('click', function(){
    hide();
    let diceImage = document.querySelector('.dice');
    diceImage.classList.remove('hide');
    let diceArray = [1,2,3,2,1,4,3,2,1,5,4,1,3,2,1,6,5,1,4,3,2,1];
    let diceIndex = Math.floor(Math.random()*diceArray.length);
    let dice = diceArray[diceIndex];
    diceImage.src = `images/dice-${dice}.png`;

    if (dice !== 1) {
        roundScore += dice;
        document.querySelector(`#current-${activePlayer}`).textContent = roundScore;
    } else {
        changePlayer();
    }
});

hold.addEventListener('click', function(){
    score[activePlayer] += roundScore;

    document.querySelector(`#score-${activePlayer}`).textContent = score[activePlayer];

    if (score[activePlayer]>=101) {
        document.querySelector('.dice').classList.add('hide');
        document.querySelector(`#name-${activePlayer}`).textContent = 'Winner!';
        document.querySelector(`#name-${activePlayer}`).classList.add('greenText');

        roll.disabled = true;
        hold.disabled = true;

        action.classList.remove('hide');
        action.textContent = `Press 'New Game'!`;
    }else {
        actionCall();
        messageCall();
        changePlayer();
    }
})

newGame.addEventListener('click', startNewGame);



