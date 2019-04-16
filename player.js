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
    this.ySpeed = 5;
    this.direction = 0;
    this.originY = 0;
    this.gravity = 0.9;
}
// Image of Kenny alive
Player.prototype.draw = function() {
    let img = document.getElementById('kenny');
    this.ctx.drawImage(img, this.x-this.width/2, this.y-this.height/2, this.width, this.height);
}
// Replace image to dead Kenny
Player.prototype.dead = function() {
    let img = document.getElementById('deadkenny');
    this.ctx.drawImage(img, this.x-this.width/2, this.y-this.height/2, this.width, this.height);
}
// Replace image to bonked Kenny (MIGHT NEED TO ERASE)
Player.prototype.bonk = function() {
    let img = document.getElementById('bonk');
    this.ctx.drawImage(img, this.x-this.width/2, this.y-this.height/2, this.width, this.height);
}

Player.prototype.update = function() {

    this.x = this.x + this.direction * this.speed;

    this.y += this.ySpeed
    if (this.y < this.canvas.height - 100) {
        this.ySpeed += this.gravity
    } else {
        this.ySpeed = 0;
    }
}

Player.prototype.setDirection = function(newDirection) {
    this.direction = newDirection;
}

Player.prototype.setLives = function() {
    this.lives--;
    document.getElementById('lives').innerHTML = "Kenny's lives: " + this.lives;
}

Player.prototype.addLives = function() {
    this.lives++;
    document.getElementById('lives').innerHTML = "Kenny's lives: " + this.lives;
}

Player.prototype.checkCollisions = function(enemy) {
    const collisionRight = this.x + this.width/2 > (enemy.x + 10) - enemy.width/2;
    const collisionLeft = this.x - this.width/2 < (enemy.x - 10) + enemy.width/2;
    const collisionTop = this.y - this.height/2 < (enemy.y - 10) + enemy.height/2;
    const collisionBottom = this.y + this.height/2 > (enemy.y + 10) - enemy.height/2;

    return collisionRight && collisionLeft && collisionTop && collisionBottom;
}
