const bird = document.getElementById("bird");
const gameContainer = document.querySelector(".game-container");
const scoreElement = document.getElementById("score");

let birdY = 250;
let gravity = 0.6;
let velocity = 0;
let jumpStrength = -10;
let gameWidth = 400;
let gameHeight = 600;
let pipeGap = 150;
let pipeWidth = 60;
let pipeSpeed = 2;
let pipes = [];
let score = 0;
let gameOver = false;

// Make the bird jump
document.addEventListener("keydown", (e) => {
  if (e.code === "Space" && !gameOver) {
    velocity = jumpStrength;
  }
});

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
      }
    }

    // Increase score if bird passes a pipe
    if (!pipe.passed && pipe.x + pipeWidth < 50) {
      pipe.passed = true;
      score++;
      scoreElement.textContent = "Score: " + score;
    }
  });

  // Render pipes
  renderPipes();

  requestAnimationFrame(gameLoop);
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
  alert("Game Over! Your score: " + score);
  location.reload(); // Restart the game
}

// Start the game
let frames = 0;
setInterval(() => frames++, 1000 / 60);
gameLoop();
