const bird = document.getElementById("bird");
const gameContainer = document.querySelector(".game-container");
const scoreElement = document.getElementById("score");
const gameOverScreen = document.getElementById("game-over");
const finalScoreElement = document.getElementById("final-score");
const playAgainButton = document.getElementById("play-again-button");
const homeScreen = document.querySelector(".home-screen");
const playButton = document.getElementById("play-button");
const highestScoreElement = document.getElementById("highest-score");

let birdY = 250;
let gravity = 0.4; // Reduced gravity for slower fall
let velocity = 0;
let jumpStrength = -8; // Reduced jump strength for smoother jumps
let gameWidth = 400;
let gameHeight = 600;
let pipeGap = 150;
let pipeWidth = 60;
let pipeSpeed = 2;
let pipes = [];
let score = 0;
let gameOver = false;
let gameStarted = false;
let animationFrameId;

// Load highest score from localStorage
let highestScore = localStorage.getItem("highestScore") || 0;
highestScoreElement.textContent = `Highest Score: ${highestScore}`;

// Start the game when "Play" button is clicked
playButton.addEventListener("click", () => {
  homeScreen.style.display = "none";
  gameContainer.style.display = "block";
  startGame();
});

// Restart the game when "Play Again" button is clicked
playAgainButton.addEventListener("click", () => {
  gameOverScreen.style.display = "none";
  startGame();
});

// Make the bird jump on spacebar or screen tap
document.addEventListener("keydown", (e) => {
  if (e.code === "Space" && !gameOver && gameStarted) {
    velocity = jumpStrength;
  }
});

// Add touch support for mobile devices
document.addEventListener("touchstart", (e) => {
  if (!gameOver && gameStarted) {
    e.preventDefault(); // Prevent default touch behavior
    velocity = jumpStrength;
  }
});

// Start the game
function startGame() {
  birdY = 250;
  velocity = 0;
  pipes = [];
  score = 0;
  gameOver = false;
  gameStarted = true;
  scoreElement.textContent = "Score: 0";
  gameOverScreen.style.display = "none";
  bird.style.top = birdY + "px";
  cancelAnimationFrame(animationFrameId); // Stop any existing game loop
  gameLoop();
}

// Game loop
function gameLoop() {
  if (gameOver) return;

  // Apply gravity
  velocity += gravity;
  birdY += velocity;
  bird.style.top = birdY + "px";

  // Check for collisions with top and bottom
  if (birdY <= 0 || birdY >= gameHeight - 40) {
    endGame();
    return;
  }

  // Generate pipes
  if (frames % 90 === 0) {
    let pipeHeight = Math.random() * (gameHeight - pipeGap - 100) + 50;
    pipes.push({
      x: gameWidth,
      height: pipeHeight,
      passed: false,
    });
  }

  // Move pipes
  pipes.forEach((pipe, index) => {
    pipe.x -= pipeSpeed;
    if (pipe.x + pipeWidth < 0) {
      pipes.splice(index, 1);
    }

    // Check for collisions with pipes
    if (
      birdY < pipe.height ||
      birdY + 40 > pipe.height + pipeGap
    ) {
      if (pipe.x < 70 && pipe.x + pipeWidth > 50) {
        endGame();
        return;
      }
    }

    // Increase score if bird passes a pipe
    if (!pipe.passed && pipe.x + pipeWidth < 50) {
      pipe.passed = true;
      score++;
      scoreElement.textContent = `Score: ${score}`;
    }
  });

  // Render pipes
  renderPipes();

  animationFrameId = requestAnimationFrame(gameLoop);
}

// Render pipes
function renderPipes() {
  // Clear existing pipes
  document.querySelectorAll(".pipe").forEach((pipe) => pipe.remove());

  pipes.forEach((pipe) => {
    let topPipe = document.createElement("div");
    topPipe.className = "pipe";
    topPipe.style.left = pipe.x + "px";
    topPipe.style.height = pipe.height + "px";
    topPipe.style.top = "0";
    gameContainer.appendChild(topPipe);

    let bottomPipe = document.createElement("div");
    bottomPipe.className = "pipe";
    bottomPipe.style.left = pipe.x + "px";
    bottomPipe.style.height = gameHeight - pipe.height - pipeGap + "px";
    bottomPipe.style.bottom = "0";
    gameContainer.appendChild(bottomPipe);
  });
}

// End the game
function endGame() {
  gameOver = true;
  gameStarted = false;
  finalScoreElement.textContent = `Score: ${score}`;
  gameOverScreen.style.display = "block";

  // Update highest score
  if (score > highestScore) {
    highestScore = score;
    localStorage.setItem("highestScore", highestScore);
    highestScoreElement.textContent = `Highest Score: ${highestScore}`;
  }

  cancelAnimationFrame(animationFrameId); // Stop the game loop
}

// Start the game loop
let frames = 0;
setInterval(() => frames++, 1000 / 60);
