function Game(canvas) {
    this.player = null;
    this.obstacles = [];
    this.newobstacles = [];
    this.addlife = [];
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.gameOver = false;
    this.timer = 60;
    this.loopC = 0;
    this.numberObjects = 0.998;
}
// Start animation loop
Game.prototype.startLoop = function() {
    // sets timer when started;
    this.setIntervals();
    this.startSound();

    this.player = new Player(this.canvas);

    const loop = () => {

        if (this.loopC == 600) {
            this.numberObjects = 0.994;
        } else if (this.loopC === 2000) {
            this.numberObjects = 0.990;
        }
       
        // Objects
        this.loopC ++;
        console.log(this.loopC);
        if (Math.random() > 0.9982) {
             this.obstacles.push(new Obstacles(this.canvas, (Math.random() * this.canvas.height)));
        }

        this.generateEnemy = function (image) {
            if (Math.random() > this.numberObjects) {
                this.newobstacles.push(new Enemies(this.canvas, (Math.random() * this.canvas.width) + 15, image));
            }
        }

        this.generateEnemy('elephant');
        this.generateEnemy('meteor');
        this.generateEnemy('piano');
        this.generateEnemy('piggy');

        if (Math.random() > 0.998) {
            this.addlife.push(new Life(this.canvas, (Math.random() * this.canvas.width) + 15, 'cupid'));
        }

      
        this.clearCanvas();
        this.updateCanvas();
        this.drawCanvas();
        this.checkCollisions();
        // Ends game when timer is 0, winning condition
        if (this.timer === 0) {
            this.gameOver = true;
            this.stopSound();
            setTimeout(this.LevelUpGame, 2000);
            setTimeout(this.winSound, 2000);
            return;
        }
        // Game ends when gameOver is true, losing condition
        if (this.gameOver === false) {
            window.requestAnimationFrame(loop);
        } else {
            this.stopSound();
            this.player.dead();
            setTimeout(this.endOfGame, 2000);
            setTimeout(this.killedSound, 2000);
            this.timer = 0;
        }
    }
    window.requestAnimationFrame(loop);
}

Game.prototype.clearCanvas = function() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

Game.prototype.updateCanvas = function() {
    this.player.update();
    this.obstacles.forEach(function (objects) {
        objects.update();
    });
    this.newobstacles.forEach(function (objects) {
        objects.update();
    });
    this.addlife.forEach(function (objects) {
        objects.update();
    });
}

Game.prototype.drawCanvas = function() {
    if (this.gameOver === false) {
        this.player.draw();
    }
    this.drawFunc = (array) => {
        array.forEach( function(objects) {
            objects.draw();
        });
    }
    this.drawFunc(this.obstacles);
    this.drawFunc(this.newobstacles);
    this.drawFunc(this.addlife);
}

Game.prototype.checkCollisions = function() {
    this.obstacles.forEach((objects, index) => {
       const isColliding = this.player.checkCollisions(objects);
    
       if(isColliding) {
           this.obstacles.splice(index, 1);
           this.player.setLives();
           if (this.player.lives === 0) {
               this.gameOver = true;  
           }
       } 
    })
    this.newobstacles.forEach((objects, index) => {
        const isColliding = this.player.checkCollisions(objects);
     
        if(isColliding) {
            this.newobstacles.splice(index, 1);
            this.player.setLives();
            if (this.player.lives === 0) {
                this.gameOver = true;  
            }
        } 
     })
     this.addlife.forEach((objects, index) => {
        const isColliding = this.player.checkCollisions(objects);
        
        if(isColliding) {
            this.addlife.splice(index, 1);
            this.player.addLives();
        } 
     })
     
}
// Setting intervals for timer
Game.prototype.setIntervals = function() {
    const setSeconds = () => {
        if (this.timer === 0) {
            clearInterval(intervals);
        } else {
        this.timer -= 1;
        let seconds = document.getElementById('seconds');
        seconds.innerHTML = `Countdown: ${this.timer}`;
        }
    }
    let intervals = setInterval(setSeconds, 1000);
}

Game.prototype.setGameOverCallback = function(callback) {
    this.endOfGame = callback;
}

Game.prototype.setLevelUpCallback = function(callback) {
    this.LevelUpGame = callback;
}

Game.prototype.killedSound = function() {
    var killed = document.getElementById('killed');
    killed.play();
}

Game.prototype.startSound = function() {
    var start = document.getElementById('jaunty');
    start.volume = 0.2;
    start.play();
}

Game.prototype.stopSound = function() {
    var start = document.getElementById('jaunty');
    start.pause();
}

Game.prototype.winSound = function() {
    var win = document.getElementById('win');
    win.play();
}