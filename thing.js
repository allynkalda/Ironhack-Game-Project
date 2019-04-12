"use strict";

function Enemy(canvas, x) {
    this.speed = 3;
    this.size = 50;
    this.direction = 1;
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.x = x;
    this.y = 10;
    // this.canvas.width + this.size/2;
}

Enemy.prototype.draw = function() {
    this.ctx.fillStyle = 'blue';
    this.ctx.fillRect(this.x - this.size/2, this.y - this.size/2, this.size, this.size);

}

Enemy.prototype.update = function() {
    this.y = this.y + this.direction * this.speed;
}