function Obstacles(canvas, y) {
    this.speed = 3;
    this.width = 200;
    this.height = 100;
    this.direction = 1;
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.x = 10;
    this.y = 300;
}


Obstacles.prototype.draw = function() {
    let img = document.getElementById('car');
    this.ctx.drawImage(img, x, y, this.width, this.height);
}

Obstacles.prototype.update = function() {
    this.x = this.x + this.direction * this.speed;
}

// New Obstacles

function Enemies(canvas, x, img) {
    this.speed = 3;
    this.width = 100;
    this.height = 75;
    this.direction = 1;
    this.image = img;
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.x = x;
    this.y = 10;
}

Enemies.prototype.draw = function() {
    let image = document.getElementById(this.image);
    this.ctx.drawImage(image, this.x-this.width/2, this.y-this.height/2, this.width, this.height);
}

Enemies.prototype.update = function() {
    this.y = this.y + this.direction * this.speed;
}
