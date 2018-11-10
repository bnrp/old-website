// Variables
var canvas = document.querySelector("#canvas");
var ctx = canvas.getContext("2d");

// Functions
function start() {
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
  
  draw()
}

function rainDrop() {
  this.x = Math.random() * window.innerWidth;
  this.y = 0;
  this.length = Math.random() * 17 + 3;
  this.dx = (Math.random() * 1 - .5) * 3;
  this.dy = (Math.random() * 3 + 2) * 3;
  this.ddy = .1;
  this.theta = Math.atan(this.dx/this.dy);
  this.endX = this.length * Math.sin(this.theta);
  this.endY = this.length * Math.cos(this.theta);
  
  this.draw = function() {
    this.rand = Math.random() * 101+ 1;
    if(this.y == 0 && this.rand > 99) {
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.x + this.endX, this.y + this.endY);
      ctx.strokeStyle = 'rgba(174,194,224,0.5)';
      ctx.stroke();

      this.x += this.dx;
      this.dy += this.ddy;
      this.y+= this.dy;
    }else if(this.y != 0){
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.x + this.endX, this.y + this.endY);
      ctx.strokeStyle = 'rgba(174,194,224,0.5)';
      ctx.stroke();

      this.x += this.dx;
      this.dy += this.ddy;
      this.y+= this.dy;
      
      if(this.x >= canvas.width || this.y >= canvas.height){
        this.y = 0;
        this.x = Math.random() * window.innerWidth;
        this.length = Math.random() * 17 + 3;
        this.dx = (Math.random() * 1 - .5);
        this.dy = (Math.random() * 3 + 2) * 3;
      }
    }
  }
}

var drops = [1000];

for(i = 0; i < 1000; i++){
  drops[i] = new rainDrop();
}

function draw() {  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  for(i = 0; i < 1000; i++){
    drops[i].draw();
  }
}

setInterval(draw, 30);
