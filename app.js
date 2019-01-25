/* 
GAME RULES

-The game has 2 players, playing in rounds
-In each turn, a player rolls the dice as many times as he wishes. Each result gets added to the ROUND score
-But if the player rolls a 1, all his round scores get lost. After that it's the next player's turn
-The player can choose to HOLD, which means his round score gets added to the GLOBAL score. After that it's the next players turn
-The first player to reach points on global score wins the game
*/
var scores, roundScore, activePlayer, gamePlaying, previousDice;

//GamePlaying is state variable----a state varible tells the condition of a system.

//calling  game initialization function
init();

document.querySelector('.btn-roll').addEventListener('click', () => {
    //Roll dice function
    if (gamePlaying) {

        //1. Generate a random number
        let dice1 = Math.floor(Math.random() * 6) + 1;
        let dice2 = Math.floor(Math.random() * 6) + 1;
        let dice = dice1 + dice2;//adds scores for both dice


        //2. Display the result
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';

        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';

        if (previousDice === 12 && dice === 12) {
            //if player gets 4 six in a row the entire score is set to zero
            alert('Oh sorry! You got 4 six in a row');

            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = '0';
            nextPlayer();

        } else if (dice1 !== 1 && dice2 !== 1) {
            //3. Update the round score if of the roll number was NOT 1

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

document.querySelector('.btn-hold').addEventListener('click', () => {

    if (gamePlaying) {

        //Add current score to global score;
        scores[activePlayer] += roundScore;
        //Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        let input = document.querySelector('.final-score').value;
        let winningScore;

        //Checks input value. undefined, 0, null or "" are COERCED to false
        //Anything else is coerced to true

        if (input) {
            winningScore = input;
        } else {
            winningScore = 100;//Default winning Score
        }

        //check if player won the game
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';

            hideDice();

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

    hideDice();
}

//Hides the dice
hideDice = () => {
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';

}

//Game initialization function
function init() {

    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;


    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';


    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    document.getElementById('name-0').innerHTML = 'Player 1';
    document.getElementById('name-1').innerHTML = 'Player 2';
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('winner');
}
