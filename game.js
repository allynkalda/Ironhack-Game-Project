function Game(canvas) {
    this.player = null;
    this.obstacles = [];
    this.newobstacles = [];
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.gameOver = false;
}

Game.prototype.startLoop = function() {
    
    this.player = new Player(this.canvas);

    const loop = () => {
        
        if (Math.random() > 0.998) {
             this.obstacles.push(new Obstacles(this.canvas, (Math.random() * this.canvas.height) - 80));
        } 
        if (Math.random() > 0.998) {
            const anotherRandomNum = (Math.random() * this.canvas.width) + 15;
            this.newobstacles.push(new Enemies(this.canvas, (Math.random() * this.canvas.width) + 15, 'piggy'));
        }
        if (Math.random() > 0.998) {
            const anotherRandomNum = (Math.random() * this.canvas.width) + 15;
            this.newobstacles.push(new Enemies(this.canvas, (Math.random() * this.canvas.width) + 15, 'piano'));
        }
        if (Math.random() > 0.998) {
            const anotherRandomNum = (Math.random() * this.canvas.width) + 15;
            this.newobstacles.push(new Enemies(this.canvas, (Math.random() * this.canvas.width) + 15, 'anvil'));
        }
        if (Math.random() > 0.998) {
            const anotherRandomNum = (Math.random() * this.canvas.width) + 15;
            this.newobstacles.push(new Enemies(this.canvas, (Math.random() * this.canvas.width) + 15, 'elephant'));
        }
        this.clearCanvas();
        this.updateCanvas();
        this.drawCanvas();
        this.checkCollisions();

        if (this.gameOver === false) {
            window.requestAnimationFrame(loop);
        } else {
            setTimeout(this.endOfGame, 1500);
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
}

Game.prototype.setGameOverCallback = function(callback) {
    this.endOfGame = callback;
}