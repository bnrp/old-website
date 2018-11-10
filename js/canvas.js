// Variables
var canvas = document.querySelector("#canvas");
var ctx = canvas.getContext("2d");

var canvas2 = document.querySelector("#canvas2");
var ct2 = document.querySelector("#canvas2").getContext("2d");

var home = null;

// Functions
function start() {
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
  
  ct2.canvas.width = window.innerWidth;
  ct2.canvas.height = window.innerHeight;
  
  setInterval(draw, 30);
}

//LIGHTNING WIP
function segment(startX, startY) {
  this.startX = startX;
  this.startY = startY;
  
  this.length = Math.random() * 25 + 1;
  this.theta = Math.random() * (4*Math.PI/6) - (2*Math.PI/6);
  
  this.endX = this.startX + this.length * Math.sin(this.theta);
  this.endY = this.startY + this.length * Math.cos(this.theta);
}

function strand(startX, startY) {
  this.startX = startX;
  this.startY = startY;
  
  this.X = startX;
  this.Y = startY;
  
  this.segLen = Math.random() * 15 + 35;
  
  this.segments = [this.segLen];
  this.segments[0] = new segment(this.startX, this.startY);
  
  for(var i = 1; i < this.segLen; i++){
    this.segments[i] = new segment(this.segments[i-1].endX, this.segments[i-1].endY);
    if(this.segments[i].endX > window.innerWidth || this.segments[i].endX < 0 || this.segments[i].endY > window.innerHeight){
       this.segments[i] = null;
       break;
    }
  }
  
  this.draw = function() {
    ct2.beginPath();
    ct2.moveTo(this.startX, this.startY);
    for(var i = 0; i < this.segLen; i++){
      ct2.lineTo(this.segments[i].endX, this.segments[i].endY);
    }
    ct2.lineWidth = 3;
    ct2.strokeStyle = "yellow";
    ct2.stroke();
  }
}

function lightning() {
  this.startX = Math.random() * ((window.innerWidth - 100) - 100) + 100;
  this.startY = Math.random() * (160) + 10;
  
  this.spread = parseInt(Math.random() * 3 + 2);
  
  this.strands = [this.spread];
  
  for(var i = 0; i < this.spread; i++){
    this.strands[i] = new strand(this.startX, this.startY);
  }
  
  this.draw = function() {
    if (isElementInViewport(home, 0)){
      for(var i = 0; i < this.spread; i++){
        this.strands[i].draw();
      }
    }
  }
}

// RAIN
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
    home = document.getElementById("home");
    if(this.y == 0 && this.rand > 99 && (isElementInViewport(home, -home.getBoundingClientRect().height) == true)) {
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
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ct2.clearRect(0, 0, canvas.width, canvas.height);
  
  for(i = 0; i < 1000; i++){
    drops[i].draw();
  }
  
  //x = new lightning();  
  //x.draw();
}

function isElementInViewport(el, top) {
  var rect = el.getBoundingClientRect();
  return (
    rect.top >= top &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document. documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document. documentElement.clientWidth)
  );
}

let anchorlinks = document.querySelectorAll('a[href^="#"]');

for (let item of anchorlinks) { // relitere 
    item.addEventListener('click', (e)=> {
        let hashval = item.getAttribute('href');
        let target = document.querySelector(hashval);
        target.scrollIntoView({
            behavior: 'smooth', block: "start", inline: "nearest",
        })
        history.pushState(null, null, hashval);
        e.preventDefault();
    })
}
