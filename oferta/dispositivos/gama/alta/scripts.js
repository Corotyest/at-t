document.addEventListener('DOMContentLoaded', function() {
  const sliderContainer = document.getElementById('slider-container');
  const slider = document.getElementById('slider');
  const gradient = document.querySelector('.gradient');

  let currentSlide = 0;
  let images = [];
  let totalImages = 0;

  fetch('images.json')
    .then(response => {
      console.log(response);  // Verifica la respuesta antes de intentar convertirla a JSON
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log(data);  // Verifica los datos cargados desde JSON
      images = data.images;  // Accedemos a la propiedad 'images' del JSON
      totalImages = images.length;

      if (totalImages === 0) {
        console.error("No se encontraron imágenes en el archivo JSON.");
        return;
      }

      // Asegurémonos de que el slider esté vacío antes de agregar imágenes
      slider.innerHTML = '';

      // Crear dinámicamente los elementos <img> para cada imagen
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

      // Establecer el color de fondo inicial basado en la primera imagen
      if (slider.children.length > 0) {
        updateBackgroundColor(slider.children[0]);
        showSlide(currentSlide);  // Mostrar la primera imagen cuando se carga la página
      }

      // Modificar los textos de los botones para 'Atrás' y 'Siguiente'
      document.getElementById('next-btn').textContent = 'Siguiente';
      document.getElementById('prev-btn').textContent = 'Atrás';

      // Añadir los event listeners para los botones 'Siguiente' y 'Atrás'
      document.getElementById('next-btn').addEventListener('click', nextSlide);
      document.getElementById('prev-btn').addEventListener('click', prevSlide);
    })
    .catch(error => console.log("Error fetching images:", error));

  // Función para actualizar el color de fondo según la imagen
  function updateBackgroundColor(img) {
    const color = getDominantColor(img);
    gradient.style.backgroundColor = color;
  }

  // Función para obtener el color dominante de la imagen (puedes usar una librería como Color Thief para obtener un color real)
  function getDominantColor(img) {
    return 'rgba(0, 0, 0, 0.7)';  // Color de fondo ficticio (puedes sustituirlo por una librería de extracción de color)
  }

  // Función para mostrar la diapositiva actual
  function showSlide(index) {
    // Ocultar todas las imágenes primero
    Array.from(slider.children).forEach(img => img.style.display = 'none');
    
    // Mostrar la imagen actual
    const currentImage = slider.children[index];
    if (currentImage) {
      currentImage.style.display = 'block';
      updateBackgroundColor(currentImage);  // Actualizar el color de fondo de la imagen actual
    }
  }

  // Función para ir a la siguiente diapositiva
  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalImages;  // Avanzar al siguiente slide (y volver al primero si estamos en el último)
    showSlide(currentSlide);
  }

  // Función para ir a la diapositiva anterior
  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalImages) % totalImages;  // Retroceder al slide anterior (y volver al último si estamos en el primero)
    showSlide(currentSlide);
  }
});
