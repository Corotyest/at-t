document.addEventListener('DOMContentLoaded', function() {
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

      if (totalImages === 0) {
        console.error("No se encontraron imágenes en el archivo JSON.");
        return;
      }

      // Asegurémonos de que el slider esté vacío antes de agregar imágenes
      slider.innerHTML = '';

      // Dynamically create <img> elements for each image
      images.forEach(image => {
        console.log("Cargando imagen:", image);  // Verifica el nombre de cada imagen
        const imgElement = document.createElement('img');
        imgElement.src = `images/${image}`;
        imgElement.alt = image;
        imgElement.style.display = 'none';
        imgElement.onload = () => {
          console.log(`Imagen cargada correctamente: ${image}`);
        };
        imgElement.onerror = () => {
          console.error(`Error al cargar la imagen: ${image}`);
        };
        slider.appendChild(imgElement);
      });


      // Set the initial background color based on the first image
      if (slider.children.length > 0) {
        updateBackgroundColor(slider.children[0]);
        showSlide(currentSlide);  // Show the first slide when the page loads
      }

      // Add event listeners for the next and previous buttons after the images are loaded
      document.getElementById('next-btn').addEventListener('click', nextSlide);
      document.getElementById('prev-btn').addEventListener('click', prevSlide);
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

});
