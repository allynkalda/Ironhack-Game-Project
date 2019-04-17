function Game(canvas) {
    this.player = null;
    this.obstacles = [];
    this.newobstacles = [];
    this.addlife = [];
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.gameOver = false;
    this.timer = 30;
}
// Start animation loop
Game.prototype.startLoop = function() {
    // sets timer when started;
    this.setIntervals();
    this.startSound();
    this.player = new Player(this.canvas);

    const loop = () => {
        
        if (Math.random() > 0.998) {
             this.obstacles.push(new Obstacles(this.canvas, (Math.random() * this.canvas.height)));
        } 
        if (Math.random() > 0.998) {
            this.newobstacles.push(new Enemies(this.canvas, (Math.random() * this.canvas.width) + 15, 'piggy'));
        }
        if (Math.random() > 0.998) {
            this.newobstacles.push(new Enemies(this.canvas, (Math.random() * this.canvas.width) + 15, 'piano'));
        }
        if (Math.random() > 0.998) {
            this.newobstacles.push(new Enemies(this.canvas, (Math.random() * this.canvas.width) + 15, 'meteor'));
        }
        if (Math.random() > 0.998) {
            this.newobstacles.push(new Enemies(this.canvas, (Math.random() * this.canvas.width) + 15, 'elephant'));
        }
        if (Math.random() > 0.998) {
            this.addlife.push(new Life(this.canvas, (Math.random() * this.canvas.width) + 15, 'cupid'));
        }
        this.clearCanvas();
        this.updateCanvas();
        this.drawCanvas();
        this.checkCollisions();

        if (this.timer === 0) {
            this.gameOver = true;
            setTimeout(this.LevelUpGame, 2000);
            this.stopSound();
            return;
        }

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
    this.obstacles.forEach( function(objects) {
        objects.draw();
    });
    this.newobstacles.forEach(function (objects) {
        objects.draw();
    });
    this.addlife.forEach(function (objects) {
        objects.draw();
    });
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