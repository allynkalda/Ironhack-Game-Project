function Obstacles(canvas) {
    this.speed = 3;
    this.size = 50;
    this.direction = 1;
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.x = x;
    this.y = 10;
}

//let Objects = new Obstacles(canvas, ctx, x, y, size, direction, speed);

//let Meteors = new Obstacles(canvas, ctx, x, y, size, direction, speed);

Obstacles.prototype.draw = function() {
    this.ctx.fillStyle = 'blue';
    this.ctx.fillRect(this.x - this.size/2, this.y - this.size/2, this.size, this.size);

}

Obstacles.prototype.update = function() {
    this.y = this.y + this.direction * this.speed;
}