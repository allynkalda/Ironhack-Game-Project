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
        <canvas></canvas>
        </section>
        `);
        // Sets the dimensions of the canvas
        const width = window.innerWidth;
        const height = window.innerHeight;
        const canvasElement = document.querySelector('canvas');
        canvasElement.setAttribute('width', width);
        canvasElement.setAttribute('height', height);

        // Get properties and function from Game constructor
        const game = new Game(canvasElement);
        game.startLoop();

        // Key functions
        document.addEventListener('keydown', function(event) {
            if (event.keyCode === 37) {
                game.player.setDirection(-1);
            } else if (event.keyCode === 39) {
                game.player.setDirection(1);
            } else if (event.keyCode === 38) {
                game.player.setDirection(-4);
            }
        });
        document.addEventListener('keyup', function(event) {
            if (event.keyCode === 37 || event.keyCode === 39) {
                game.player.setDirection(0);
            } else if (event.keyCode === 38) {
                game.player.setDirection(4);  
            }
        })
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