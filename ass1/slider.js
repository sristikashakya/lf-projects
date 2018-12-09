var carouselSlide = document.getElementById('carousel-slide');
var carouselImages =document.getElementsByTagName('img');
var prevButton = document.getElementById('prevButton');
var nextButton = document.getElementById('nextButton');
var speed = 1 ;

function moveSlide(){
  carouselSlide.style.marginLeft = -x + 'px';
  x += speed;
  if (x == 0 || x == 960) {
    if (x == 0) {
        speed = 1;
    }
    clearInterval(moveSlide);
    setTimeout(moveSlide, 2000);
} else if (x == 1990) {
    clearInterval(moveSlide);
    speed = -1;
    setTimeout(moveSlide, 2000);
}
}

nextButton.addEventListener('click',function(){
  clearInterval(moveSlide);
  if((x>=0 && x<960) || (x>=960 && x<1990)){
      var nextInterval = setInterval(function(){
          carouselSlide.style.marginLeft = -x + 'px';
          x+=speed;
          if (x == 960 || x == 1990){
              clearInterval(nextInterval);
              setTimeout(moveSlide,2000);
              if (x ==1990) {
                speed = -2;
              }
          }
      });
  }
})
prevButton.addEventListener('click',function(){
    clearInterval(moveSlide);
    if((x>960 && x<=2880)){
        var nextInterval = setInterval(function(){
            carouselSlide.style.marginLeft = x + 'px';
            x+=speed;
            if (x == 0 || x == 960){
                clearInterval(nextInterval);
                setTimeout(moveSlide,2000);
                if (x == 0) {
                    speed = -1;
                }
            }
        });
    }
  })
setInterval(moveSlide,10);
