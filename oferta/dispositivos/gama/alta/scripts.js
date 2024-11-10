const sliderContainer = document.getElementById('slider-container');
const slider = document.getElementById('slider');
const gradient = document.querySelector('.gradient');

let currentSlide = 0;
let images = [];
let totalImages = 0;

fetch('images.json')
  .then(response => response.json())
  .then(data => {
    images = data;  // Array of image filenames
    totalImages = images.length;

    // Dynamically create <img> elements for each image
    images.forEach(image => {
      const imgElement = document.createElement('img');
      imgElement.src = `images/${image}`;  // Path to the image in the images folder
      imgElement.alt = image;
      slider.appendChild(imgElement);
    });

    // Set the initial background color based on the first image
    updateBackgroundColor(slider.children[0]);
  })
  .catch(error => console.log("Error fetching images:", error));

// Function to update the background color based on the image
function updateBackgroundColor(img) {
  const color = getDominantColor(img);
  gradient.style.backgroundColor = color;
}

// Dummy function to get a dominant color from the image (can use libraries like Color Thief for more accuracy)
function getDominantColor(img) {
  return 'rgba(0, 0, 0, 0.7)';  // Placeholder color
}

// Handle swipe gestures for changing images
sliderContainer.addEventListener('touchstart', (e) => {
  startTouchX = e.touches[0].clientX;
});

sliderContainer.addEventListener('touchmove', (e) => {
  const moveTouchX = e.touches[0].clientX;
  const distance = startTouchX - moveTouchX;

  if (distance > 50 && currentSlide < totalImages - 1) {
    currentSlide++;
    updateSliderPosition();
    updateBackgroundColor(slider.children[currentSlide]);
  }

  if (distance < -50 && currentSlide > 0) {
    currentSlide--;
    updateSliderPosition();
    updateBackgroundColor(slider.children[currentSlide]);
  }
});

function updateSliderPosition() {
  const slideWidth = window.innerWidth;
  slider.style.transform = `translateX(-${slideWidth * currentSlide}px)`;
}
