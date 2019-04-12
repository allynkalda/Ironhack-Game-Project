function main() {
    
    const mainElement = document.querySelector('main');
    // Method to change screens in every state
    function buildDOM(html) {
        mainElement.innerHTML = html;
        return mainElement;
    }
    // Builds splash screen through load event
    function buildSplashScreen() {
        const splashScreen = buildDOM(`
        <section class="splash-screen">
        <div class="inner-box"><h1>Don't Kill Kenny!</h1>
        <button>Start</button></div>
        </section>
        `);
        const startButton = document.querySelector('button');
        startButton.addEventListener('click', buildGameScreen);
    }
/*
    function buildGameScreen() {
        const gameScreen = buildDOM(`
        <section class="game-container>
        <canvas></canvas>
        </section>
        `);
        // Sets the dimensions of the canvas
        const canvasElement = document.querySelector('canvas');
        const width = window.innerWidth;
        const height = window.innerHeight;
        canvasElement.setAttribute('width', width);
        canvasElement.setAttribute('height', height);
        // Get properties and function from Game constructor
        const game = new Game(canvasElement);
        game.startLoop();

        // Key functions
        

    }

    function buildGameOverScreen() {

    }   */
    buildSplashScreen();
}
window.addEventListener('load', main);