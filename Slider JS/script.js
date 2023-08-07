function SliderJS(options) {
  const slider = document.querySelector(`#${options.id}`);
  const slides = slider.querySelectorAll('carusel img');
  const controlsContainer = document.createElement('div');
  const carusel = document.createElement('div');
  carusel.classList.add('carusel');
  slider.classList.add('slider-container');

  const loop = options.loop;
  const controls = options.controls;
  const autoplay = options.autoplay;

  let currentSlide = 0;
  let interval;

  slides.forEach(img => {
    carusel.appendChild(img);
  });

  slider.appendChild(carusel);

  let isDragStart = false;
  let startX = 0;
  let scrollLeft = 0;

  const dragStart = (e) => {
    console.log(e);
    isDragStart = true;
    startX = e.pageX - carusel.offsetLeft;
    scrollLeft = carusel.scrollLeft;
  };

  const dragEnd = () => {
    isDragStart = false;
  };

  const drag = (e) => {
    if (!isDragStart) return;
    const x = e.pageX - carusel.offsetLeft;
    const walk = (x - startX) * 3;
    carusel.scrollLeft = scrollLeft - walk;
  };

  carusel.addEventListener('mousedown', dragStart);
  carusel.addEventListener('mouseup', dragEnd);
  carusel.addEventListener('mouseleave', dragEnd);
  carusel.addEventListener('mousemove', drag);
}

