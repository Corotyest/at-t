const sliderContainer = document.getElementById('slider-container');
const slider = document.getElementById('slider');
const gradient = document.querySelector('.gradient');

let currentSlide = 0;
let images = [];
let totalImages = 0;

fetch('images.json')
  .then(response => response.json())
  .then(data => {
    images = data.images;  // Accedemos a la propiedad 'images' del JSON
    totalImages = images.length;

    // Asegurémonos de que el slider está vacío antes de agregar imágenes
    slider.innerHTML = '';

    // Dynamically create <img> elements for each image
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      const imgElement = document.createElement('img');
      imgElement.src = `images/${image}`;  // Path to the image in the images folder
      imgElement.alt = image;
      imgElement.style.display = 'none';  // Initially hide all images
      slider.appendChild(imgElement);
    }

    // Set the initial background color based on the first image
    if (slider.children.length > 0) {
      updateBackgroundColor(slider.children[0]);
      showSlide(currentSlide);  // Show the first slide when the page loads
    }
  })
  .catch(error => console.log("Error fetching images:", error));

// Function to update the background color based on the image
function updateBackgroundColor(img) {
  const color = getDominantColor(img);
  gradient.style.backgroundColor = color;
}

// Dummy function to get a dominant color from the image (can use libraries like Color Thief for more accuracy)
function getDominantColor(img) {
  return 'rgba(0, 0, 0, 0.7)';  // Placeholder color (use a library like Color Thief for real implementation)
}

// Function to display the current slide
function showSlide(index) {
  // Hide all images first
  Array.from(slider.children).forEach(img => img.style.display = 'none');
  
  // Show the current image
  const currentImage = slider.children[index];
  if (currentImage) {
    currentImage.style.display = 'block';
    updateBackgroundColor(currentImage);  // Update background color for current image
  }
}

// Function to go to the next slide
function nextSlide() {
  currentSlide = (currentSlide + 1) % totalImages;
  showSlide(currentSlide);
}

// Function to go to the previous slide
function prevSlide() {
  currentSlide = (currentSlide - 1 + totalImages) % totalImages;
  showSlide(currentSlide);
}

// Optionally, set up buttons for next/prev slide navigation
document.getElementById('next-btn').addEventListener('click', nextSlide);
document.getElementById('prev-btn').addEventListener('click', prevSlide);
