function main() {

  // Method to change screens in every state
  function buildDOM(html) {
    const mainElement = document.querySelector('main');
    mainElement.innerHTML = html;
    return mainElement;
  }
  // Builds splash screen through load event
  function buildSplashScreen() {
    const splashScreen = buildDOM(`
        <section class="splash-screen">
        <div class="inner-box">
        <h1>Don't Kill Kenny!</h1><br>
        <img id="kenny-dancing" src="./Photos/kenny-dancing.gif">
        <p>Use the up, right, left direction button to move Kenny out of harm's way. Catch Cartman angels to gain lives.</p>
        <button id="start-button">Start</button>
        </div>
        </section>
        `);
    const startButton = document.getElementById('start-button');
    startButton.addEventListener('click', buildGameScreen);
  }
  // Builds game screen through click event
  function buildGameScreen() {
    
    const gameScreen = buildDOM(`
        <section class="game-container">
        <div id="header">
        <h2 id="seconds">Countdown: 60</h2>
        <h2 id="lives">Kenny's Lives: 3</h2></div>
        <canvas></canvas>
        </section>
        `);
    // Sets the dimensions of the canvas
    const gameContainerElement = document.querySelector('.game-container');
    
    const width = gameContainerElement.offsetWidth;
    const height = gameContainerElement.offsetHeight;

    const canvasElement = document.querySelector('canvas');

    canvasElement.setAttribute('width', width);
    canvasElement.setAttribute('height', height);

    // Get properties and function from Game constructor
    const game = new Game(canvasElement);
    game.startLoop();

    game.setGameOverCallback(buildGameOverScreen);
    game.setLevelUpCallback(buildLevelUpScreen);
    // Key functions plus boolean to not allow jump twice in a row
    let jump = false;
    document.addEventListener('keydown', function (event) {
      if (event.keyCode === 37) {
        game.player.setDirection(-1);
        jump = false;
      } else if (event.keyCode === 39) {
        game.player.setDirection(1);
        jump = false;
      } else if (event.keyCode === 38) {
        if (jump === false) {
          game.player.ySpeed = -25;
          jump = true;
        } else {
          return;
        }
      }
    });
    document.addEventListener('keyup', function (event) {
      if (event.keyCode === 37 || event.keyCode === 39) {
        game.player.setDirection(0);
      } 
    })
  }
// Build level up screen
  function buildLevelUpScreen() {
    const levelUpScreen = buildDOM(`
        <section class="splash-screen">
        <div class="inner-box">
        <img id="kenny-wave" src="./Photos/kenny-wave.gif">
        <h3>Way to go! You saved Kenny!</h3>
        <button id="continue">Restart</button>
        </div>
        </section>
    `)
    const continueButton = document.getElementById('continue');
    continueButton.addEventListener('click', buildGameScreen);
  }
// Build game over screen through life === 0, has restart button
  function buildGameOverScreen() {
    const gameOverScreen = buildDOM(`
        <section class="splash-screen">
        <div class="inner-box">
        <h1>They killed Kenny!</h1><br>
        <button id="reset">Restart</button>
        </div>
        </section>
        `);

    const restartButton = document.getElementById('reset');
    restartButton.addEventListener('click', buildGameScreen);
  }
  buildSplashScreen();
}
window.addEventListener('load', main);