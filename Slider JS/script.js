function SliderJS(options) {
  const slider = document.querySelector(`#${options.id}`);
  const slides = slider.querySelectorAll('img');
  const carusel = document.createElement('div');

  const controls = options.options.controls;
  const autoplay = options.options.autoplay;
  const loop = options.options.loop;

  let interval;

  slider.classList.add('slider-container');
  carusel.classList.add('carusel');

  slides.forEach(img => {
    img.classList.add('slide')
    carusel.appendChild(img);
  });

  slider.appendChild(carusel);


// начало кода для обработки клика мышкой 
  let isDragStart = false;
  let startX = 0;
  let scrollLeft = 0;
  let currentSlide = 0;

  const dragStart = e => {
    e.preventDefault();
    isDragStart = true;
    startX = e.pageX - carusel.offsetLeft;
    scrollLeft = carusel.scrollLeft;
  };

  const drag = e => {
    if (!isDragStart) return;
    const x = e.pageX - carusel.offsetLeft;
    const walk = (x - startX) * 2;
    carusel.scrollLeft = scrollLeft - walk;
  };

  const dragEnd = () => {
    isDragStart = false;
  };

  carusel.addEventListener('mousedown', dragStart);
  carusel.addEventListener('mouseup', dragEnd);
  carusel.addEventListener('mouseleave', dragEnd);
  carusel.addEventListener('mousemove', drag); 
//конец кода для обработки клика мышкой


function showSlide(slideIndex) {
  const slideWidth = slides[0].clientWidth;
  const containerWidth = carusel.offsetWidth;
  const slideOffset = slideIndex * slideWidth;
  const centrOffst = (containerWidth - slideWidth) / 2;
  const scrollTo = slideOffset - centrOffst;
  carusel.scrollLeft = scrollTo;
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
  if (loop ||currentSlide === 0) {
    stopSlider();
  }
}

function prevSlide() {
  currentSlide = (currentSlide > 0) ? currentSlide - 1 : slides.length - 1;
  showSlide(currentSlide);
  if (loop || currentSlide === slides.length - 1) {
    stopSlider();
  }
}

// код для автоматичской прокрутки слйдера
  function startSlider() {
    interval = setInterval(() => {
      nextPosition();
      if (currentSlide === slides.length - 1 && !loop) {
        clearInterval(interval);
      }
    }, options.options.interval || 3000);
  }

   function stopSlider() {
    clearInterval(interval);
  }
// конец кода для автоматичской прокрутки слайдера


// кнопки и их обработка 
  function initSlider() {
    showSlide(currentSlide);
    const controlsContainer = document.createElement('div');

    controlsContainer.classList.add('slider-controls');
    slider.appendChild(controlsContainer);

    if (controls) {
      const prevBtn = document.createElement('button');
      const nextBtn = document.createElement('button');
      const startStopBtn = document.createElement('button');
      const hideControlsBtn = document.createElement('button');
      const controlsHiddenContainer = document.createElement('div');

      let isPlaying = false;

      prevBtn.classList.add('btn-prev');
      nextBtn.classList.add('btn-next');
      startStopBtn.classList.add('btn-start');
      hideControlsBtn.classList.add('btn-hide-controls');

      startStopBtn.addEventListener('click', () => {
        if (isPlaying) {
          stopSlider();
          startStopBtn.classList.remove('btn-stop'); 
          startStopBtn.classList.add('btn-start'); 
        } else {
          stopSlider();
          startSlider();
          startStopBtn.classList.remove('btn-start'); 
          startStopBtn.classList.add('btn-stop');
          isPlaying = true 
        }
      });
    
      prevBtn.addEventListener('click', () => {
        if (currentSlide === 0 && !loop) {
          return;
        }
        prevSlide();
      });

      nextBtn.addEventListener('click', () => {
        if (currentSlide === slides.length - 1 && !loop) {
          return;
        }
        nextSlide();
      });

      controlsContainer.appendChild(startStopBtn);

      hideControlsBtn.textContent = 'Hide Controls';
      hideControlsBtn.addEventListener('click', () => {
        const buttons = document.querySelectorAll('button:not(.controls-hiddens)');
        buttons.forEach(button => {
          button.style.opacity = button.style.opacity === '0' ? '1' : '0';
        });
      });

      controlsHiddenContainer.classList.add('controls-hiddens');
      controlsHiddenContainer.appendChild(hideControlsBtn);
      slider.appendChild(controlsHiddenContainer);
      slider.appendChild(nextBtn);
      slider.appendChild(prevBtn);
    }

    if (autoplay) {
      startSlider();
    }
  }

  initSlider(); 
}
 