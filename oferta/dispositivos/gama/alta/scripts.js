document.addEventListener('DOMContentLoaded', function() {
  const sliderContainer = document.getElementById('slider-container');
  const slider = document.getElementById('slider');
  const gradient = document.querySelector('.gradient');

  let currentSlide = 0;
  let images = [];
  let totalImages = 0;

  let touchStartX = 0;
  let touchEndX = 0;

  fetch('images.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      images = data.images;
      totalImages = images.length;

      if (totalImages === 0) {
        console.error("No se encontraron imágenes en el archivo JSON.");
        return;
      }

      slider.innerHTML = '';

      images.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = `images/${image}`;
        imgElement.alt = image;
        imgElement.style.display = 'none';  // Inicialmente oculta
        imgElement.onload = () => {
          console.log(`Imagen cargada correctamente: ${image}`);
        };
        imgElement.onerror = () => {
          console.error(`Error al cargar la imagen: ${image}`);
        };
        slider.appendChild(imgElement);
      });

      if (slider.children.length > 0) {
        showSlide(currentSlide);
        updateBackgroundColor(slider.children[0]);
      }

      // Agregar event listeners a los botones
      document.getElementById('next-btn').addEventListener('click', nextSlide);
      document.getElementById('prev-btn').addEventListener('click', prevSlide);

      // Agregar los eventos de deslizamiento
      sliderContainer.addEventListener('touchstart', handleTouchStart, false);
      sliderContainer.addEventListener('touchmove', handleTouchMove, false);
      sliderContainer.addEventListener('touchend', handleTouchEnd, false);
    })
    .catch(error => {
      console.log("Error fetching images:", error);
    });

  // Función para manejar el inicio del toque
  function handleTouchStart(event) {
    touchStartX = event.touches[0].clientX;  // Almacenar la posición del toque inicial
  }

  // Función para manejar el movimiento del toque (aunque no es estrictamente necesario, pero es útil para detectar deslizamientos)
  function handleTouchMove(event) {
    touchEndX = event.touches[0].clientX;  // Actualizar la posición del toque mientras se mueve
  }

  // Función para manejar el final del toque
  function handleTouchEnd() {
    if (touchEndX < touchStartX) {
      // Deslizó a la izquierda, ir al siguiente slide
      nextSlide();
    } else if (touchEndX > touchStartX) {
      // Deslizó a la derecha, ir al slide anterior
      prevSlide();
    }
  }

  // Función para actualizar el color de fondo basado en la imagen
  function updateBackgroundColor(img) {
    const color = getDominantColor(img);
    gradient.style.backgroundColor = color;
  }

  // Función ficticia para obtener un color dominante de la imagen
  function getDominantColor(img) {
    return 'rgba(0, 0, 0, 0.7)';  // Placeholder, puede usar una librería real como Color Thief
  }

  // Función para mostrar la imagen actual
  function showSlide(index) {
    Array.from(slider.children).forEach(img => img.style.display = 'none');
    const currentImage = slider.children[index];
    if (currentImage) {
      currentImage.style.display = 'block';
      updateBackgroundColor(currentImage);
    }
  }

  // Función para ir a la siguiente imagen
  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalImages;
    showSlide(currentSlide);
  }

  // Función para ir a la imagen anterior
  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalImages) % totalImages;
    showSlide(currentSlide);
  }
});
