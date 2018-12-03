var carouselSlide = document.getElementById('carousel-slide');
var carouselImages =document.getElementsByTagName('img');
carouselImages[0].style.marginLeft = "0px";
carouselImages[1].style.marginLeft = "960px";
carouselImages[2].style.marginLeft = "1920px";
carouselImages[3].style.marginLeft = "2880px";
carouselImages[4].style.marginLeft = "3840px";
for(i=1;i<carouselImages.length-1;i++){
  carouselImages[i].style.marginTop = "-640px";
}

// var prevButton = document.getElementById('prevButton');
// var nextButton = document.getElementById('nextButton');

// var counter = 1;
// var size = carouselImages[0].clientWidth;

// carouselSlide.style.transform = 'translateX(' + (-size * counter)+'px';

// nextButton.addEventListener('click',function(){
//   carouselSlide.style.transition = "transform 0.4 ease-in-out";
//   counter++;
//   carouselSlide.style.transform = 'translateX(' + (-size * counter)+'px';
  
// })
// prevButton.addEventListener('click',function(){
//   carouselSlide.style.transition = "transform 0.4 ease-in-out";
//   counter--;
//   carouselSlide.style.transform = 'translateX(' + (-size * counter)+'px';
  
// })
// carouselSlide.addEventListener('transitionend',function(){
//   if (carouselImages[counter].id === "firstClone"){
//     carouselSlide.style.transition = "none";
//     counter = carouselImages.length - 2;
//     carouselSlide.style.transform = 'translateX(' + (-size * counter)+'px';
//   }

// })