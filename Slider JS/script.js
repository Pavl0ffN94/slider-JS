function SliderJS(options) {
  const slider = document.querySelector(`#${options.id}`);
  const slides = slider.querySelectorAll('img');
  const controlsContainer = document.createElement('div');

  let currentSlide = 0;
  let interval;
  let touchStartX = 0;

  slider.classList.add('slider-container');

  function showSlide(slideIndex) {
    slides.forEach((slide, index) => {
      slide.style.opacity = index === slideIndex ? '1' : '0';
    });
  }

  slider.addEventListener('touchstart', (event) => {
    touchStartX = event.touches[0].clientX;
  });

  slider.addEventListener('touchend', (event) => {
    const touchEndX = event.changedTouches[0].clientX;
    const touchDiff = touchEndX - touchStartX;

    if (touchDiff > 50) {
      prevSlide();
    } else if (touchDiff < -50) {
      nextSlide();
    }
  });

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  }

  function startSlider() {
    interval = setInterval(() => {
      nextSlide();
    }, options.options.interval || 3000);
  }

  function stopSlider() {
    clearInterval(interval);
  }

  function initSlider() {
    showSlide(currentSlide);

    controlsContainer.classList.add('slider-controls'); 
    slider.appendChild(controlsContainer)

    if (options.options.controls) {
      const prevBtn = document.createElement('button');
      prevBtn.classList.add('btn-prev');
      prevBtn.textContent = 'Previous';
      prevBtn.addEventListener('click', () => {
        prevSlide();
      });

      const stopShow = document.createElement('button');
      stopShow.textContent = 'Stop Show';
      stopShow.addEventListener('click', () => {
        stopSlider();
      });

      const startShow = document.createElement('button');
      startShow.textContent = 'Start Show';
      startShow.addEventListener('click', () => {
        startSlider();
      });

      const nextBtn = document.createElement('button');
      nextBtn.classList.add('btn-next');
      nextBtn.textContent = 'Next';
      nextBtn.addEventListener('click', () => {
        nextSlide();
      });

      controlsContainer.appendChild(prevBtn);
      controlsContainer.appendChild(stopShow);
      controlsContainer.appendChild(startShow);
      controlsContainer.appendChild(nextBtn);
    }

    if (!options.options.hideControls) {
      const hideControlsBtn = document.createElement('button');
      hideControlsBtn.textContent = 'Hide Controls';
      hideControlsBtn.addEventListener('click', () => {
        const buttons = document.querySelectorAll('button:not(.controls-hiddens)');
        
        buttons.forEach(button => {
          button.style.opacity = button.style.opacity === '0' ? '1' : '0';
        });
      });

      const controlsHiddenContainer = document.createElement('div');
      controlsHiddenContainer.classList.add('controls-hiddens');
      controlsHiddenContainer.appendChild(hideControlsBtn);
      slider.appendChild(controlsHiddenContainer);
    }

    if (options.options.autoplay) {
      startSlider();
    }
  }

  initSlider();
}
