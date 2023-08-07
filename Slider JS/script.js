function SliderJS(options) {
  const slider = document.querySelector(`#${options.id}`);
  const slides = slider.querySelectorAll('img');
  const carusel = document.createElement('div');

  slider.classList.add('slider-container');
  carusel.classList.add('carusel');

  slides.forEach(img => {
    carusel.appendChild(img);
  });

  slider.appendChild(carusel);

  let isDragStart = false;
  let startX = 0;
  let scrollLeft = 0;

  const dragStart = (e) => {
    e.preventDefault();
    isDragStart = true;
    startX = e.pageX - carusel.offsetLeft;
    scrollLeft = carusel.scrollLeft;
  };
  
  const drag = (e) => {
    if (!isDragStart) return;
    const x = e.pageX - carusel.offsetLeft;
    const walk = (x - startX) * 1.5;
    carusel.scrollLeft = scrollLeft - walk;
  };

  const dragEnd = () => {
    isDragStart = false;
  };


  carusel.addEventListener('mousedown', dragStart);
  carusel.addEventListener('mouseup', dragEnd);
  carusel.addEventListener('mouseleave', dragEnd);
  carusel.addEventListener('mousemove', drag);
}

