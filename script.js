

const categories = document.querySelectorAll('#categories li');
const countdown = document.querySelector('#countdown');
const currentLetter = document.querySelector('#current-letter');
const wordList = document.querySelector('#word-list');
const resetButton = document.querySelector('#reset-button');
const bell = document.querySelector('#bell');

let timeLeft = 60;
let letter = '';
let words = [];

function startGame() {
  // Choose a random letter
  letter = String.fromCharCode(Math.floor(Math.random() * 26) + 97);
  currentLetter.textContent = letter.toUpperCase();

  // Clear the word list
  words = [];
  wordList.innerHTML = '';

  // Start the countdown
  let timer = setInterval(() => {
    timeLeft--;
    countdown.textContent = timeLeft;
    if (timeLeft === 0) {
      clearInterval(timer);
      endGame();
      bell.play();
    }
  }, 1000);
}

  resetButton.addEventListener('click', () => {
    timeLeft = 60;
    countdown.textContent = timeLeft;
    letter = String.fromCharCode(Math.floor(Math.random() * 26) + 97);
    currentLetter.textContent = letter.toUpperCase();
  });



function endGame() {
  // Display the final score
  alert(`Temps écoulé ! Vous avez trouvé ${words.length} mots : ${words.join(', ')}`);

  // Reset the game
  timeLeft = 60;
  countdown.textContent = timeLeft;
  startGame();
}

function addWord(word) {
  // Check if the word starts with the current letter and hasn't been added already
  if (word.charAt(0).toLowerCase() === letter && !words.includes(word)) {
    words.push(word);
    let li = document.createElement('li');
    li.textContent = word;
    wordList.appendChild(li);
  }
}

// Add event listeners to the category list items
categories.forEach(category => {
  category.addEventListener('click', () => {
    let word = prompt(`Un mot de la catégorie ${category.textContent} qui commence par la lettre ${letter.toUpperCase()} :`);
    if (word) {
      addWord(word.toLowerCase());
    }
  });
});

  

// Start the game
startGame();

