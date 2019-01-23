/* 
GAME RULES

-The game has 2 players, playing in rounds
-In each turn, a player rolls the dice as many times as he wishes. Each result gets added to the ROUND score
-But if the player rolls a 1, all his round scores get lost. After that it's the next player's turn
-The player can choose to HOLD, which means his round score gets added to the GLOBAL score. After that it's the next players turn
-The first player to reach points on global score wins the game
*/
var scores, roundScore, activePlayer, gamePlaying;

//GamePlaying is state variable----a state varible tells the condition of a system.

//calling  game initialization function
init();

var previousDice;

document.querySelector('.btn-roll').addEventListener('click', function () {
    //Roll dice function

    if (gamePlaying) {

        //1. Generate a random number
        let dice = Math.floor(Math.random() * 6) + 1;


        //2. Display the result
        let diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        if (previousDice === 6 && dice === 6) {
            //When a player gets two 6 in a row, he loses entire scores
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = '0';
            nextPlayer();

        } else if (dice !== 1) {

            //3. Update the round score if the roll number was NOT 1
            //add score to roundScore
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;

        } else {
            //next player
            nextPlayer();
        }

        previousDice = dice;
    }
});

document.querySelector('.btn-hold').addEventListener('click', function () {

    if (gamePlaying) {

        //Add current score to global score;
        scores[activePlayer] += roundScore;
        //Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        var input = document.querySelector('.final-score').value;
        var winningScore;

        //undefined, 0, null or "" are COERCED to false
        //Anything else is coerced to true

        if (input) {
            winningScore = input;
        } else {
            winningScore = 100;
        }


        //check player won the game
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;


        } else {
            //Next player
            nextPlayer();
        }
    }
});



// new game button
document.querySelector('.btn-new').addEventListener('click', init);

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    // document.querySelector('.player-0-panel').classList.remove('active');
    // document.querySelector('.player-1-panel').classList.add('active');

    document.querySelector('.dice').style.display = 'none';
}

function init() {

    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;


    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    document.getElementById('name-0').innerHTML = 'Player 1';
    document.getElementById('name-1').innerHTML = 'Player 2';
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('winner');
}

// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em';