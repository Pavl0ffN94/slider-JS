document.addEventListener('DOMContentLoaded', SliderJS(options) ) 
 function SliderJS(options) {
  const slider = document.querySelector(`#${options.id}`);
  const slides = slider.querySelectorAll('img');
  const carusel = document.createElement('div');
  const loop = options.options.loop

  slider.appendChild(carusel)
  slider.classList.add('slider-container');
  carusel.classList.add('carusel');

  slides.forEach(img => {
    img.classList.add('slider-item')
    carusel.appendChild(img);
  });

if (loop) {
  const firstImage = carusel.firstElementChild.cloneNode(true);
  const lastImage = carusel.lastElementChild.cloneNode(true);

  firstImage.id = 'firstClone';
  lastImage.id = 'lastClone';

  carusel.insertBefore(lastImage, carusel.firstElementChild);
  carusel.appendChild(firstImage);
}
  const updateSlides = [...carusel.querySelectorAll('img')]

const nextBtn = document.createElement('button');
nextBtn.classList.add('btn-next');

const prevBtn = document.createElement('button');
prevBtn.classList.add('btn-prev');

const controlsContainer = document.createElement('div');
controlsContainer.classList.add('slider-controls');

slider.after(nextBtn);
slider.after(prevBtn);

  let counter = 1;
  const size = slides[0].clientWidth;
  carusel.style.transform = 'translateX('+(-size * counter)+ 'px)';

  function nextSlide () {
    if (counter >= updateSlides.length - 1 && loop) return;
    if(counter >= updateSlides.length - 1) return;
    carusel.style.transition = `transform  0.4s ease-in`;
    counter++;
    carusel.style.transform = 'translateX('+(-size * counter)+ 'px)';
  };
 
  function prevSlide () {
    if (counter <= 0 && loop) return;
    if(counter <=0)return;
    carusel.style.transition = `transform  0.4s ease-in`;
    counter--;
    carusel.style.transform = 'translateX('+(-size * counter)+ 'px)';
  };

  nextBtn.addEventListener('click', nextSlide)
  prevBtn.addEventListener('click', prevSlide)


slider.addEventListener('transitionend', ()=> {
  if(updateSlides[counter].id === 'lastClone'){
    carusel.style.transition = `none`;
    counter = updateSlides.length - 2;
    carusel.style.transform = 'translateX('+(-size * counter)+ 'px)';
  }
  if(updateSlides[counter].id === 'firstClone'){
    carusel.style.transition = `none`;
    counter = updateSlides.length - counter;
    carusel.style.transform = 'translateX('+(-size * counter)+ 'px)';
  }
})

let isDragging = false;
let startPosX = 0;
let draggedDistance = 0;

slider.addEventListener('mousedown', (event) => {
  event.preventDefault();
  isDragging = true;
  startPosX = event.clientX;
  draggedDistance = 0;
  carusel.style.transition = 'none';
});

slider.addEventListener('mousemove', (event) => {
  if (!isDragging) return;
  const currentPosX = event.clientX;
  draggedDistance = currentPosX - startPosX;
  carusel.style.transform = `translateX(${ -size * counter + draggedDistance }px)`;
});

slider.addEventListener('mouseup', () => {
  isDragging = false;
  carusel.style.transition = 'transform 0.4s ease-in';
  
  if (draggedDistance > size / 3) {
    prevSlide();
  } else if (draggedDistance < -size / 3) {
    nextSlide();
  } else {
    carusel.style.transform = `translateX(${-size * counter}px)`;
  }
});

slider.addEventListener('mouseleave', () => {
  if (isDragging) {
    isDragging = false;
    carusel.style.transition = 'transform 0.4s ease-in';
    carusel.style.transform = `translateX(${-size * counter}px)`;
  }
});

}

