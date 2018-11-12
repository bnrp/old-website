// Variables
var canvas = document.querySelector("#canvas");
var ctx = canvas.getContext("2d");

var canvas2 = document.querySelector("#canvas2");
var ct2 = document.querySelector("#canvas2").getContext("2d");

var home = null;

var x = null;

var it1 = 0;
var it12 = 1;

var yn = 1;
var yncount = 0;

// Functions
function start() {
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
  
  ct2.canvas.width = window.innerWidth;
  ct2.canvas.height = window.innerHeight;
  
  setInterval(draw, 30);
}

//Lightning
function segment(startX, startY) {
  this.startX = startX;
  this.startY = startY;
  
  this.length = Math.random() * 25 + 1;
  this.theta = Math.random() * (4*Math.PI/6) - (2*Math.PI/6);
  
  this.endX = this.startX + this.length * Math.sin(this.theta);
  this.endY = this.startY + this.length * Math.cos(this.theta);
}

function strand(startX, startY, index) {
  this.startX = startX;
  this.startY = startY;
  
  this.index = index;
  
  this.X = startX;
  this.Y = startY;
  
  this.it = 0;
  this.it2 = 1;
  
  this.opacity = .7;
  
  this.segLen = Math.random() * 20 + 35;
  
  this.segments = [this.segLen];
  this.segments[0] = new segment(this.startX, this.startY);
  
  this.thickness = Math.random() * 1.8 + .7;
  
  for(var i = 1; i < this.segLen; i++){
    this.segments[i] = new segment(this.segments[i-1].endX, this.segments[i-1].endY);
    if(this.segments[i].endX > window.innerWidth || this.segments[i].endX < 0 || this.segments[i].endY > window.innerHeight){
       this.segments[i] = null;
       break;
    }
  }
  
  this.draw = function() {
    drawLight(this);
  }
}

function drawLight(x){
  ct2.beginPath();
  
    for(var i = 0; i < x.it; i++){
      ct2.moveTo(x.segments[i].startX, x.segments[i].startY);
      ct2.lineTo(x.segments[i].endX, x.segments[i].endY);
      ct2.lineWidth = x.thickness;
      ct2.strokeStyle = "rgba(255,255,204, " + x.opacity + ")";
    }
  
    ct2.moveTo(x.segments[x.it].startX, x.segments[x.it].startY);
    ct2.lineTo(x.segments[x.it].startX + x.it2 * Math.sin(x.segments[x.it].theta),x.segments[x.it].startY + x.it2 * Math.cos(x.segments[x.it].theta));
    ct2.lineWidth = x.thickness;
    ct2.strokeStyle = "rgba(255,255,204, " + x.opacity + ")";
    ct2.stroke();
    
    if(x.it2 <= x.segments[x.it].length && x.it+1 < x.segLen && x.segments.[x.it+1] != null){
      x.it += 1;
      x.it2 = 1;
    }else{
      if(x.opacity == 0){
        
      }else{
        x.opacity -= .07;
      }
    }
}

function lightning() {
  this.startX = Math.random() * ((window.innerWidth - 100) - 100) + 100;
  this.startY = Math.random() * (160) + 10;
  
  this.spread = parseInt(Math.random() * 3 + 2);
  
  this.strands = [this.spread];
  
  for(var i = 0; i < this.spread; i++){
    this.strands[i] = new strand(this.startX, this.startY, i);
  }
  
  this.draw = function() {
    for(var i = 0; i < this.spread; i++){
      this.strands[i].draw();
    }
  }
}

function lightLoop() {
  
  if(isElementInViewport(home, 0, "and")){
    if(yn){
      this.rand = Math.floor(Math.random() * 299 + 1);
    }
    
    if(true){
      canvas2.style.opacity = 1;
      canvas2.style.backgroundColor = "transparent";
    }
      
    if(this.rand == 1){
      x = new lightning(); 
      this.rand = 2;
      yn = 0;
      canvas2.style.opacity = .3;
      canvas2.style.backgroundColor = "#ffffcc";
    }

    if(yncount == 150){
      yn = 1;
      yncount = 0;
    }else if(yn == 0){
      yncount += 1;
    }
    if(x != null){
      x.draw();
    }
  }else{
    x = null;
  }  
  
}

// Rain
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
    if(this.y == 0 && this.rand > 99 && (isElementInViewport(home, -home.getBoundingClientRect().height, "and") == true || isElementInViewport(home, -1, "and") == true)) {
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
  
  // Draws Rain
  for(i = 0; i < 1000; i++){
    drops[i].draw();
  }
  
  // Creates Loop for lightning animations
  lightLoop();
}

function isElementInViewport(el, top, andor) {
  var rect = el.getBoundingClientRect();
  if(andor == "and"){
    return (
      rect.top >= top &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }else if(andor == "or"){
    return (
      (rect.bottom <= window.innerHeight || 
      rect.bottom <= document.documentElement.clientHeight)
    );
  }
}

let anchorlinks = document.querySelectorAll('a[href^="#"]');

for (let item of anchorlinks) { // relitere 
    item.addEventListener('click', (e)=> {
        let hashval = item.getAttribute('href');
        let target = document.querySelector(hashval);
        target.scrollIntoView({
            behavior: 'smooth', 
            block: "start", 
            inline: "nearest"
        })
        history.pushState(null, null, hashval);
        e.preventDefault();
    })
}
