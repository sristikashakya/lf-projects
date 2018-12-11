(function(){
  var 
    WIDTH = 900,
    HEIGHT = 500,
    container,
    text = "abcdef",
    LENGTH = text.length,
    wordArray = [],
    userSpace;

  var getRandom = function(max,min){
    var random = Math.floor(Math.random() * (max - min + 1) + min);
    if (random === 0){
      return getRandom(max, min);
    }
    return random;
  };
  
  var word = function(){
    this.x = 0;
    this.y = 0;
    this.myWord;
    this.index = 0;
    this.text = 'f';
    this.init = function(){
      this.myWord = document.createElement('p');
      this.myWord.className = 'my-word';
      this.myWord.innerHTML = this.text;
      this.myWord.style.top = this.y + 'px';
      this.myWord.style.left = this.x + 'px';
      container.appendChild(this.myWord);
    }
    this.update = function(){
      speed += 0.05;
      this.y += 20+speed;
    }
    this.draw = function(){
      this.myWord.style.transition = "0.5s linear";
      this.myWord.style.left = this.x + 'px';
      this.myWord.style.top = this.y + 'px';
    }
  };

  function mainGame(){
    container = document.createElement('div');
    container.id = 'container';
    container.width = WIDTH;
    container.height = HEIGHT;
    document.body.appendChild(container);
    userSpace = document.createElement('div');
    userSpace.id = 'user-space';
    container.appendChild(userSpace);
    var that = this;
    
    function init(){
      speed = 1;
      count = 0;

      generationLoop = setInterval(function(){
        var newWord = new word();
        newWord.x = getRandom(10, 850);
        newWord.y = 0;
        newWord.index = count;
        newWord.length = getRandom(1, 6);
        (function(){ 
          for (var i = 0; i < newWord.length; i++){
            newWord.text += text.charAt(getRandom(0, LENGTH));
          }
        })();

        newWord.init();

        wordArray.push(newWord);
        count++;
        moveWord(newWord);

      }, 1000);
    }

    init();
    function moveWord(currentWord){
      animationLoop = setInterval(function(){
        currentWord.update();
        currentWord.draw();
      },500);
    }
  }
  mainGame();
})();