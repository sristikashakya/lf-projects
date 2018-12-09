(function(){
  var 
    WIDTH = 900,
    HEIGHT = 500,
    container,
    userSpace;
  function mainGame(){
    container = document.createElement('div');
    container.id = 'container';
    container.width = WIDTH;
    container.height = HEIGHT;
    document.body.appendChild(container);
    userSpace = document.createElement('div');
    userSpace.id = 'user-space';
    container.appendChild(userSpace);
  }
  mainGame();
})();