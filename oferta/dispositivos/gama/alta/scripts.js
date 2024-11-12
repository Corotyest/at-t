// scripts.js
import { data } from './imagesData.js';

document.addEventListener('DOMContentLoaded', function() {
  const menuContainer = document.getElementById('menu-container');
  const sliderContainer = document.getElementById('slider-container');
  const slider = document.getElementById('slider');
  const gradient = document.querySelector('.gradient');
  const backBtn = document.getElementById('back-btn');
  let currentSlide = 0;
  let images = [];
  let totalImages = 0;
  let touchStartX = 0;
  let touchEndX = 0;

  function generateMenu(brands) {
    brands.forEach(brand => {
      const button = document.createElement('button');
      button.className = 'menu-button';
      button.textContent = brand.name;
      button.addEventListener('click', () => showCatalog(brand));
      menuContainer.appendChild(button);
    });
  }

  function showCatalog(brand) {
    menuContainer.style.display = 'none';
    sliderContainer.style.display = 'flex';
    backBtn.style.display = 'block';

    images = [];
    extractImages(brand, brand.name);
    totalImages = images.length;

    if (totalImages === 0) {
      console.error("No se encontraron imágenes para la marca seleccionada.");
      return;
    }

    slider.innerHTML = '';
    images.forEach(image => {
      const imgElement = document.createElement('img');
      imgElement.src = `images/${brand.name}/${image}`;
      imgElement.alt = image;
      imgElement.style.display = 'none';
      slider.appendChild(imgElement);
    });

    if (slider.children.length > 0) {
      showSlide(currentSlide);
      updateBackgroundColor(slider.children[0]);
    }
  }

  function extractImages(directory, parentPath) {
    directory.children.forEach(child => {
      if (typeof child === 'string') {
        images.push(`${parentPath}/${child}`);
      } else if (child.type === 'directory') {
        extractImages(child, `${parentPath}/${child.name}`);
      }
    });
  }

  function showSlide(index) {
    Array.from(slider.children).forEach(img => img.style.display = 'none');
    const currentImage = slider.children[index];
    if (currentImage) {
      currentImage.style.display = 'block';
      updateBackgroundColor(currentImage);
    }
  }

  function updateBackgroundColor(img) {
    const color = getDominantColor(img);
    gradient.style.backgroundColor = color;
  }

  function getDominantColor(img) {
    return 'rgba(0, 0, 0, 0.7)';
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalImages;
    showSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalImages) % totalImages;
    showSlide(currentSlide);
  }

  function handleTouchStart(event) {
    touchStartX = event.touches[0].clientX;
  }

  function handleTouchMove(event) {
    touchEndX = event.touches[0].clientX;
  }

  function handleTouchEnd() {
    if (touchEndX < touchStartX) {
      nextSlide();
    } else if (touchEndX > touchStartX) {
      prevSlide();
    }
  }

  document.getElementById('next-btn').addEventListener('click', nextSlide);
  document.getElementById('prev-btn').addEventListener('click', prevSlide);
  sliderContainer.addEventListener('touchstart', handleTouchStart, false);
  sliderContainer.addEventListener('touchmove', handleTouchMove, false);
  sliderContainer.addEventListener('touchend', handleTouchEnd, false);

  backBtn.addEventListener('click', () => {
    sliderContainer.style.display = 'none';
    menuContainer.style.display = 'flex';
    backBtn.style.display = 'none';
  });

  generateMenu(data);
});
