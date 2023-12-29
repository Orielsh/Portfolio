'use strict'

// reference html elements:
// ------------------------
const elmGuessInput = document.querySelector('#guessInput');
const elmLastGuess = document.querySelector('.number');
const elmScore = document.querySelector('.score');
const elmHighScore = document.querySelector('.highscore');
const elmMessage = document.querySelector('.message');
const elmBody = document.querySelector('body');
const elmCheckButton = document.querySelector('#checkButton');

// initialize variables:
// ---------------------
let score = 100;
let highScore = 0;
let secretNumber = Math.trunc((Math.random() * 20) + 1);

// cheat code:
// -----------
// log the secret number - REMOVE LATER !!!!!!!
console.log(secretNumber);

function again() {
  // 1. reset variables (except high-score)
  score = 100;
  
  // 2. reset html texts
  elmGuessInput.value = '';
  elmScore.innerText = 100;
  elmLastGuess.innerText = '?';
  elmMessage.innerText = 'Start guessing...';

  elmCheckButton.innerText = 'Check!';
  elmCheckButton.style.fontSize = '2rem';
  elmCheckButton.disabled = false;
  
  // 3. reset bg-color
  elmBody.style.backgroundColor = '#222';
  
  // 4. generate new secret number
  secretNumber = Math.trunc((Math.random() * 20) + 1);

  // cheat code:
  // -----------
  // log the secret number - REMOVE LATER !!!!!!!
  console.log(secretNumber);
}

function check() {

  // Get the guess and convert to number
  const guess = Number(elmGuessInput.value);
  
  // If guess is not in range, notify and return
  if (guess < 1 || guess > 20) {
    elmMessage.innerText = 'Enter a number between 1 and 20 !';
    elmLastGuess.innerText = '?';
    elmBody.style.backgroundColor = '#222';
    return;
  }

  if (guess === secretNumber) {  // user guessed correctly
    elmMessage.innerText = 'You won !';
    elmLastGuess.innerText = guess;
    elmBody.style.backgroundColor = '#41692d';

    elmCheckButton.style.fontSize = '1.3rem';
    elmCheckButton.innerText = "Press Again!";

    elmCheckButton.disabled = true;
    if (score > highScore) {
      highScore = score;
      elmHighScore.innerText = highScore;
    }
  } else {                      // wrong guess (too high / too low)
    elmMessage.innerText = (guess > secretNumber) ? 'Too high !' : 'Too low !';
    elmLastGuess.innerText = guess;
    elmBody.style.backgroundColor = '#8a2727';
    score -= 10;
    elmScore.innerText = score;
    if (score === 0) {
      elmMessage.innerText = 'You lost';

      elmCheckButton.style.fontSize = '1.3rem';
      elmCheckButton.innerText = "Press Again!";
      elmCheckButton.disabled = true;
    }
  }
}

