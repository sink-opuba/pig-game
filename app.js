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

document.querySelector('.btn-roll').addEventListener('click', function () {
    //Roll dice function

    if (gamePlaying) {

        //1. Generate a random number
        var dice = Math.floor(Math.random() * 6) + 1;


        //2. Display the result
        /*
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        */
        let diceDom = document.querySelector('.dice');
        diceDom.style.display = 'block';
        diceDom.src = 'dice-' + dice + '.png';
        /*
        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';
        */

        //3. Update the round score if the roll number was NOT 1
        if (dice !== 1) {
            //add score to roundScore
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;

        } else {
            //next player
            nextPlayer();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function () {

    if (gamePlaying) {

        //Add current score to global score;
        scores[activePlayer] += roundScore;
        //Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        //check player won the game
        if (scores[activePlayer] >= 100) {
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