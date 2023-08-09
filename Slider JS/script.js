function SliderJS(options) {
  const slider = document.querySelector(`#${options.id}`);
  const slides = slider.querySelectorAll('img');
  const carusel = document.createElement('div');

  slider.classList.add('slider-container');
  carusel.classList.add('carusel');

  slides.forEach(img => {
    img.classList.add('slider-item')
    carusel.appendChild(img);
  });

  slider.appendChild(carusel);

  const arraySlidesItem = [];

  slides.forEach((slide, i) => {
    arraySlidesItem[i] = slide.src;
    slide.remove();
});
console.log(arraySlidesItem);

  let step = 0;
  let offset = 0;
  const slideWidth = slides[0].clientWidth

  console.log(innerWidth);
  function draw() {
    let img = document.createElement('img');
    img.src = arraySlidesItem[step];
    img.classList.add('slider-item');
    img.style.left = offset * slideWidth + 'px' ;
    carusel.appendChild(img)
    if(step + 1 === slides.length){
      step = 0
    } else{
      step++;
    }
    offset = 1;
  }

  function nextSlide(){
    document.onclick = null
    const repeatSlides = slider.querySelectorAll('img');
    let offset2= 0;
    repeatSlides.forEach((slide) => {
      slide.style.left = offset2 * slideWidth - 2100 + 'px';
  });
  setTimeout(()=>{
    repeatSlides[0].remove();
    draw();
    document.onclick = nextSlide;
  }, 1000)
  }

  draw();
document.onclick = nextSlide;

}

 