"use strict";

function Player(canvas) {
    this.lives = 3;
    this.height = 80;
    this.width = 59;
    this.canvas = canvas;
    this.x = this.canvas.width/2;
    this.y = this.canvas.height - 100;
    this.ctx = this.canvas.getContext('2d');
    this.speed = 3;
    this.direction = 0;
}

Player.prototype.draw = function() {
    let img = document.getElementById('kenny');
    this.ctx.drawImage(img, this.x-this.width/2, this.y-this.height/2, this.width, this.height);
   // this.ctx.fillStyle = 'blue';
   // this.ctx.fillRect(this.x - this.size/2, this.y-this.size/2, this.size, this.size);

}

Player.prototype.update = function() {
    if (this.direction === -4) {
        this.y = this.y + this.direction * this.speed;   
    } else if (this.direction === 4) {
        this.y = this.y + 4;
    } else {
        this.x = this.x + this.direction * this.speed;
    } 
}

// same as updatePlayer.prototype.updateJump = function() {
//   this.y = this.y + this.direction * this.speed;
//}

Player.prototype.setDirection = function(newDirection) {
    this.direction = newDirection;
}

Player.prototype.setLives = function() {
    this.lives--;
}

Player.prototype.checkCollisions = function(enemy) {
    const collisionRight = this.x + this.width/2 > enemy.x - enemy.width/2;
    const collisionLeft = this.x - this.width/2 < enemy.x + enemy.width/2;
    const collisionTop = this.y - this.height/2 < enemy.y + enemy.height/2;
    const collisionBottom = this.y + this.height/2 > enemy.y - enemy.height/2;

    return collisionRight && collisionLeft && collisionTop && collisionBottom;
}
