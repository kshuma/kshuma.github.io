const puzzlePhrase = "TROPICAL PARADISE AWAITS".toUpperCase();
const playerCodeWords = {
    "jennifer": "BEACH",
    "andrew": "SUN",
    "max": "SAND"
};

const codeWordToLetters = {
    "BEACH": ['T', 'R', 'P', 'O'],
    "SUN": ['C', 'A', 'L', 'D'],
    "SAND": ['I', 'S', 'W', 'E']
};

let selectedLetter = '';

const puzzleContainer = document.getElementById('puzzle-container');
const letterContainer = document.getElementById('letter-container');

// Initialize puzzle board
puzzlePhrase.split('').forEach((char, index) => {
    const tile = document.createElement('div');
    tile.className = 'tile';
    tile.textContent = char === ' ' ? ' ' : '_';
    tile.dataset.index = index;
    tile.dataset.letter = char;
    tile.addEventListener('click', () => placeLetter(tile));
    puzzleContainer.appendChild(tile);
});

// Create placeholders for letter boxes
Object.keys(playerCodeWords).forEach(player => {
    codeWordToLetters[playerCodeWords[player]].forEach(letter => {
        const letterBox = document.createElement('div');
        letterBox.className = 'letter-box';
        letterBox.textContent = letter;
        letterBox.dataset.letter = letter;
        letterBox.addEventListener('click', () => selectLetter(letterBox));
        letterContainer.appendChild(letterBox);
    });
});

// Check code in real-time
function checkCode(player) {
    const codeWordInput = document.getElementById(`code-word-${player}`).value.toUpperCase();
    const expectedCodeWord = playerCodeWords[player];
    const iconElement = document.getElementById(`icon-${player}`);

    if (codeWordInput === expectedCodeWord) {
        iconElement.className = 'fas fa-unlock'; // Change icon to unlocked
        document.querySelectorAll(`.letter-box[data-letter]`).forEach(letterBox => {
            if (codeWordToLetters[expectedCodeWord].includes(letterBox.dataset.letter)) {
                letterBox.classList.add('enabled');
            }
        });
    } else {
        iconElement.className = 'fas fa-lock'; // Keep icon as locked
    }
}

// Select a letter
function selectLetter(letterBox) {
    selectedLetter = letterBox.dataset.letter;
    // Highlight all empty slots
    document.querySelectorAll('.tile').forEach(tile => {
        if (tile.textContent === '_') {
            tile.classList.add('active');
        } else {
            tile.classList.remove('active');
        }
    });
}

// Place the selected letter
function placeLetter(tile) {
    if (tile.classList.contains('active')) {
        if (tile.dataset.letter === selectedLetter) {
            tile.textContent = selectedLetter;
            checkForCompletion(); // Check if the puzzle is solved
        }
        tile.classList.remove('active');
    }

    // Clear active state and reset selected letter
    selectedLetter = '';
    document.querySelectorAll('.tile').forEach(t => t.classList.remove('active'));
}

// Check if the puzzle is solved
function checkForCompletion() {
    const currentPhrase = Array.from(document.querySelectorAll('.tile'))
        .map(tile => tile.textContent)
        .join('');

    // Redirect if the puzzle is solved
    if (currentPhrase === puzzlePhrase) {
        window.location.href = "congratulations.html";
    }
}