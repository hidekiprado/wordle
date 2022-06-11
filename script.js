const wordsArray = [
  'which',
  'later',
  'there',
  'their',
  'about',
  'would',
  'great',
  'other',
  'words',
  'parts',
  'could',
];
const NumberofGuesses = 6;
let counterRows = NumberofGuesses;
let currentGuess = [];
let nextLetter = 0;
const h2El = document.querySelector('h2');
let rightGuessString =
  wordsArray[Math.floor(Math.random() * wordsArray.length)];
console.log(rightGuessString);

createGame();
function createGame() {
  const board = document.getElementById('game');

  for (let i = 0; i < NumberofGuesses; i++) {
    let row = document.createElement('div');
    row.className = 'letter-row';

    for (let j = 0; j < 5; j++) {
      let box = document.createElement('div');
      box.className = 'letter-box';
      row.appendChild(box);
    }
    board.appendChild(row);
  }
}

document.addEventListener('keyup', e => {
  let keyPressed = String(e.key);

  if (keyPressed === 'Enter') {
    checkGuess();
    return;
  }
  if (keyPressed === 'Backspace' && nextLetter !== 0) {
    deleteLetter();
    return;
  }
  let found = keyPressed.match(/[a-z]/gi);
  if (!found || found.length > 1) {
    return;
  } else {
    // console.log(keyPressed);
    insertLetter(keyPressed);
  }
});

function insertLetter(keyPressed) {
  if (nextLetter > 4) {
    return;
  }
  if (nextLetter === 4) {
    console.log('Press Enter to confirm');
    h2El.innerHTML = 'Press enter to corfirm';
  }

  keyPressed = keyPressed.toLowerCase();
  let row = document.getElementsByClassName('letter-row')[6 - counterRows];
  let box = row.children[nextLetter];
  box.textContent = keyPressed;
  box.classList.add('filled-box');
  currentGuess.push(keyPressed);
  nextLetter += 1;
}
function deleteLetter() {
  let row = document.getElementsByClassName('letter-row')[6 - counterRows];
  let box = row.children[nextLetter - 1];
  box.textContent = '';
  box.classList.remove('filled-box');
  currentGuess.pop();
  nextLetter -= 1;
  h2El.innerHTML = '';
}

function checkGuess() {
  // rightGuessString
  // currentGuess
  let row = document.getElementsByClassName('letter-row')[6 - counterRows];

  let guessString = '';
  let rightGuess = Array.from(rightGuessString);

  for (const letter of currentGuess) {
    guessString += letter;
  }
  if (guessString == rightGuessString) {
    console.log('certo');
  } else {
    console.log('errado');
  }
  currentGuess = [];
  nextLetter = 0;
  counterRows--;
  if (counterRows === 0) {
    console.log('No more tempts! Game over!');

    console.log(`The right word was: "${rightGuessString}"`);
  }
}
