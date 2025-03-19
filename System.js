const bird = document.getElementById('bird');
const gameContainer = document.querySelector('.game-container');
const playButton = document.getElementById('play-button');
const playAgainButton = document.getElementById('play-again-button');
const gameOverScreen = document.getElementById('game-over-screen');
const scoreDisplay = document.getElementById('score');

let birdPosition = 250;
let gravity = 2;
let isGameRunning = false;
let pipeGap = 200; // Gap between top and bottom pipes
let pipeSpeed = 2; // Speed of pipes moving left
let score = 0;

// Function to make the bird jump
function jump() {
    if (!isGameRunning) return;
    birdPosition -= 50;
    bird.style.top = birdPosition + 'px';
}

// Keyboard event listener (for PC)
document.addEventListener('keydown', (event) => {
    if (event.code === 'Enter' || event.code === 'Space') {
        jump();
    }
});

// Touch event listener (for mobile)
document.addEventListener('touchstart', () => {
    jump();
});

// Function to create a pair of pipes (top and bottom)
function createPipes() {
    const pipeHeight = Math.floor(Math.random() * 200) + 100; // Random height for the gap
    const topPipe = document.createElement('div');
    const bottomPipe = document.createElement('div');

    topPipe.classList.add('pipe', 'pipe-top');
    bottomPipe.classList.add('pipe', 'pipe-bottom');

    topPipe.style.height = `${pipeHeight}px`;
    bottomPipe.style.height = `${600 - pipeHeight - pipeGap}px`;

    gameContainer.appendChild(topPipe);
    gameContainer.appendChild(bottomPipe);

    movePipes(topPipe, bottomPipe);
}

// Function to move pipes
function movePipes(topPipe, bottomPipe) {
    let pipePosition = parseInt(window.getComputedStyle(topPipe).getPropertyValue('right'));

    const pipeInterval = setInterval(() => {
        if (!isGameRunning) {
            clearInterval(pipeInterval);
            return;
        }

        pipePosition += pipeSpeed;
        topPipe.style.right = `${pipePosition}px`;
        bottomPipe.style.right = `${pipePosition}px`;

        // Remove pipes when they go off-screen
        if (pipePosition > 500) {
            topPipe.remove();
            bottomPipe.remove();
            clearInterval(pipeInterval);
            increaseScore();
        }

        // Check for collision with the bird
        if (
            pipePosition > 50 && pipePosition < 130 &&
            (birdPosition < parseInt(topPipe.style.height) || birdPosition > 600 - parseInt(bottomPipe.style.height))
        ) {
            endGame();
        }
    }, 20);
}

// Function to increase score
function increaseScore() {
    score++;
    scoreDisplay.textContent = `Score: ${score}`;
}

// Function to end the game
function endGame() {
    isGameRunning = false;
    gameOverScreen.classList.remove('hidden');
}

// Function to reset the game
function resetGame() {
    birdPosition = 250;
    bird.style.top = `${birdPosition}px`;
    score = 0;
    scoreDisplay.textContent = `Score: ${score}`;
    gameOverScreen.classList.add('hidden');
    document.querySelectorAll('.pipe').forEach(pipe => pipe.remove());
    startGame();
}

// Function to start the game
function startGame() {
    isGameRunning = true;
    playButton.classList.add('hidden');
    gameLoop();
    setInterval(createPipes, 2000);
}

// Game loop
function gameLoop() {
    if (!isGameRunning) return;

    birdPosition += gravity;
    bird.style.top = birdPosition + 'px';

    // Check for collision with the ground
    if (birdPosition > 550) {
        endGame();
    }

    requestAnimationFrame(gameLoop);
}

// Event listeners for buttons
playButton.addEventListener('click', startGame);
playAgainButton.addEventListener('click', resetGame);
