(function(){
  var containerHeight = 600;
  var containerWidth = 600;
  direction = [-1,1];
  function getRandom(min,max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor((Math.random()*(max-min))+min);
  }
  function Box(x,y,parentElement,dx,dy,radius,index){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.element;
    this.radius = radius;
    this.index;
    this.createBox = function(){
      this.element = document.createElement('div');
      this.element.classList.add('box');
      var color='rgb('+Math.ceil(Math.random()*256)+','+Math.ceil(Math.random()*256)+','+Math.ceil(Math.random()*256)+')'
      this.element.style.background=color;
      this.element.style.height = this.radius*2 + 'px';
      this.element.style.width = this.radius*2 + 'px';
      parentElement.appendChild(this.element);
    }
    this.draw = function(){
      this.element.style.top = this.y +'px';
      this.element.style.left = this.x +'px';
    }
    this.update = function(){
      this.x += this.dx;
      this.y += this.dy;
    }
    this.checkwallCollision = function(){
      //wall collision
      if(this.x + this.radius*2 >= containerWidth || this.x - this.radius*2 <=0 ){
        this.dx = -this.dx;
        console.log('hi')
      }
      else if( this.y + this.radius*2 >= containerHeight || this.y -this.radius*2<=0){
        this.dy = -this.dy;
      }
    }
      //ball collision
    this.checkballCollision = function(boxes,index){
      for (var i=0;i<boxes.length;i++){
        if(i == index){
          break;
        }
        var nextBall = boxes[i];
        distx = nextBall.x - this.x ;
        disty = nextBall.y - this.y;
        var distance = Math.sqrt(distx*distx + disty*disty);
        if (nextBall.radius+this.radius > distance){
          var tempX,tempY;
          tempX = this.dx;
          this.dx = nextBall.dx;
          nextBall.dx = tempX;
          tempY = this.dy;
          this.dy = nextBall.dy;
          nextBall.dy = tempY;
        }
      }
    }
  }
  function Game(){
    var boxes = [];
    var timeInterval;
    this.init = function(){
      var container = document.getElementById('container');
      for(i=0;i<10;i++){
        var randomX = getRandom(0,containerWidth);
        var randomY = getRandom(0,containerHeight);
        var dx = direction[Math.floor(Math.random()*2)];
        var dy = direction[Math.floor(Math.random()*2)];
        var r = getRandom(10,30);
        var box = new Box(randomX,randomY,container,dx,dy,r,i);
        box.createBox();
        boxes.push(box);
      }
      timeInterval = setInterval(this.move,40);
    };
    this.move = function(){
      boxes.forEach(function(box,index){
        box.draw();
        box.update();
        box.checkwallCollision();
        box.checkballCollision(boxes,index);
      })
    }
  }
  new Game().init();
})()