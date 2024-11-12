document.addEventListener('DOMContentLoaded', function() {
  const sliderContainer = document.getElementById('slider-container');
  const slider = document.getElementById('slider');
  const gradient = document.querySelector('.gradient');
  const menuContainer = document.getElementById('menu-container');
  const backButton = document.getElementById('back-btn');

  let currentSlide = 0;
  let images = [];
  let totalImages = 0;

  // Cargar las imágenes desde el archivo images.json
  //fetch('./images.json')
    //.then(response => response.json())
    //.then(data => {
      //images = data;
//      totalImages = images.length;
//      renderMenu();  // Llamar a la función para renderizar el menú
//    })
//    .catch(error => {
//      console.error('Error fetching images:', error);
//    });

  // Renderizar el menú de marcas de teléfonos
  function renderMenu() {
    // Limpiar el contenedor del menú
    menuContainer.innerHTML = '';

    images.forEach(imageData => {
      // Crear un botón para cada marca
      const button = document.createElement('button');
      button.classList.add('menu-button');
      button.textContent = imageData.name;
      
      // Evento para mostrar las imágenes al hacer clic en la marca
      button.addEventListener('click', () => showImages(imageData));
      
      // Añadir el botón al contenedor del menú
      menuContainer.appendChild(button);
    });

    // Mostrar el contenedor del menú
    menuContainer.style.display = 'block';
  }

  // Mostrar las imágenes de una marca seleccionada
  function showImages(imageData) {
    // Limpiar el slider
    slider.innerHTML = '';

    // Comentar esta sección para evitar el error de carga de imágenes
    /*
    imageData.children.forEach(image => {
      const imgElement = document.createElement('img');
      imgElement.src = image.path;
      imgElement.alt = image.name;
      imgElement.classList.add('slider-image');
      slider.appendChild(imgElement);
    });
    */

    // Cambiar el título
    const topHud = document.getElementById('tophud');
    topHud.textContent = imageData.name;

    // Ocultar el menú y mostrar el slider
    menuContainer.style.display = 'none';
    sliderContainer.style.display = 'block';
  }

  // Volver al menú principal
  backButton.addEventListener('click', () => {
    // Ocultar el slider y mostrar el menú
    sliderContainer.style.display = 'none';
    menuContainer.style.display = 'block';
  });

  // Funciones de navegación en el slider
  function changeSlide(direction) {
    currentSlide += direction;

    if (currentSlide < 0) {
      currentSlide = totalImages - 1;
    } else if (currentSlide >= totalImages) {
      currentSlide = 0;
    }

    const images = slider.querySelectorAll('.slider-image');
    images.forEach((image, index) => {
      image.style.display = index === currentSlide ? 'block' : 'none';
    });
  }

  // Eventos para los botones de navegación del slider
  document.getElementById('prev-btn').addEventListener('click', () => changeSlide(-1));
  document.getElementById('next-btn').addEventListener('click', () => changeSlide(1));

  // Mostrar la primera imagen
  changeSlide(0);
});
