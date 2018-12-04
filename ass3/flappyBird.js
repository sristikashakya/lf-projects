(function(){
  var
    WIDTH = 900,
    HEIGHT = 500,
    flappyBird = document.getElementById('flappy-bird'),
    bg = document.getElementById('bg'),
    canvas,ctx;
  function mainGame(){
    canvas = document.createElement('canvas');
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    ctx = canvas.getContext('2d');
    document.body.appendChild(canvas);
  }
})();