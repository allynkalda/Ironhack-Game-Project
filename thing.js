function Obstacles(canvas, x) {
    this.speed = 3;
    this.width = 100;
    this.height = 75;
    this.direction = 1;
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.x = x;
    this.y = 10;
}

//let Objects = new Obstacles(canvas, ctx, x, y, size, direction, speed);

//let Meteors = new Obstacles(canvas, ctx, x, y, size, direction, speed);

Obstacles.prototype.draw = function() {

let img = document.getElementById('elephant');
    this.ctx.drawImage(img, this.x-this.width/2, this.y-this.height/2, this.width, this.height);
    //this.ctx.fillStyle = 'blue';
    //this.ctx.fillRect(this.x - this.size/2, this.y - this.size/2, this.size, this.size);

}

Obstacles.prototype.update = function() {
    this.y = this.y + this.direction * this.speed;
}

