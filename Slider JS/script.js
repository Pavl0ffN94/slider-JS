function SliderJS(options) {
  const slider = document.querySelector(`#${options.id}`);
  const slides = slider.querySelectorAll('img');

  let currentSlide = 0;
  let interval;

  function showSlide(slideIndex) {
    slides.forEach((slide, index) => {
      slide.style.display = index === slideIndex ? 'block' : 'none';
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  }

  function startSlider() {
    interval = setInterval(nextSlide, options.options.interval || 3000);
  }

  function stopSlider() {
    clearInterval(interval);
  }

  function initSlider() {
    showSlide(currentSlide);

    if (options.options.controls) {
      const controlsContainer = document.createElement('div');
      controlsContainer.classList.add('slider-controls');

      const prevBtn = document.createElement('button');
      prevBtn.textContent = 'Previous';
      prevBtn.addEventListener('click', () => {
        prevSlide();
        console.dir(prevBtn);
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
      nextBtn.textContent = 'Next';
      nextBtn.addEventListener('click', () => {
        nextSlide();
      });

      controlsContainer.appendChild(prevBtn);
      controlsContainer.appendChild(stopShow);
      controlsContainer.appendChild(startShow);
      controlsContainer.appendChild(nextBtn);
      slider.appendChild(controlsContainer);
    }

    if (!options.options.hideControls) {
      const hideControlsBtn = document.createElement('button');
      hideControlsBtn.textContent = 'Hide Controls';
      hideControlsBtn.addEventListener('click', () => {
        const controlsContainer = document.querySelector('.slider-controls');
        controlsContainer.style.display =
          controlsContainer.style.display === 'none' ? 'block' : 'none';
      });

      const controlsContainer = document.createElement('div');
      controlsContainer.classList.add('slider-controls');
      controlsContainer.appendChild(hideControlsBtn);
      slider.appendChild(controlsContainer);
    }

  }

  initSlider();
} 