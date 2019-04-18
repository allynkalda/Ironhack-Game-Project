function Obstacles(canvas) {
    this.speed = 4;
    this.width = 140;
    this.height = 70;
    this.direction = 1;
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.x = 0;
    this.y = this.canvas.height - 100;
}


Obstacles.prototype.draw = function() {
    let img = document.getElementById('car');
    this.ctx.drawImage(img, this.x-this.width/2, this.y-this.height/2, this.width, this.height);
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

// Get life
function Life(canvas, x, img) {
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

Life.prototype.draw = function() {
    let image = document.getElementById(this.image);
    this.ctx.drawImage(image, this.x-this.width/2, this.y-this.height/2, this.width, this.height);
}

Life.prototype.update = function() {
    this.y = this.y + this.direction * this.speed;
}
