body {
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #70c5ce;
    overflow: hidden;
    font-family: Arial, sans-serif;
}

.game-container {
    position: relative;
    width: 100%;
    max-width: 400px;
    height: 600px;
    border: 2px solid #000;
    overflow: hidden;
    margin: 0 auto;
}

#bird {
    position: absolute;
    width: 50px;
    height: 50px;
    top: 50%;
    left: 50px;
    background-color: yellow;
    border-radius: 50%;
}

.pipe {
    position: absolute;
    width: 80px;
    right: -80px; /* Start off-screen */
}

.pipe-top {
    top: 0;
}

.pipe-bottom {
    bottom: 0;
}

#score {
    position: absolute;
    top: 10px;
    left: 10px;
    font-size: 24px;
    color: white;
    z-index: 10; /* Ensure score is on top */
}

#play-button, #play-again-button {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 10px 20px;
    font-size: 20px;
    cursor: pointer;
    z-index: 10; /* Ensure buttons are on top */
}

#game-over-screen {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    z-index: 10; /* Ensure game over screen is on top */
}

.hidden {
    display: none;
      }
      
