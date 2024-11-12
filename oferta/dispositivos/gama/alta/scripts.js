import { data } from './images.js';

document.addEventListener('DOMContentLoaded', function() {
    const sliderContainer = document.getElementById('slider-container');
    const slider = document.getElementById('slider');
    const menuContainer = document.getElementById('menu-container');
    const backButton = document.getElementById('back-btn');
    const topHud = document.getElementById('main-title');
    const subtitle = document.getElementById('subtitle');

    let images = data;

    // Renderizar el menú de marcas de teléfonos
    function renderMenu() {
        // Limpiar el contenedor del menú
        menuContainer.innerHTML = '';

        images.forEach(imageData => {
            // Crear un botón para cada marca
            const button = document.createElement('button');
            button.classList.add('menu-button');
            button.textContent = imageData.name;

            // Añadir el efecto de animación de explosión al hacer clic
            button.addEventListener('click', () => {
                button.classList.add('explode');
                setTimeout(() => {
                    showImages(imageData);
                }, 600); // Esperar que termine la animación
            });

            // Añadir el botón al contenedor del menú
            menuContainer.appendChild(button);
        });

        // Mostrar el contenedor del menú
        menuContainer.style.display = 'flex';
        sliderContainer.style.display = 'none';  // Asegurarse de ocultar el slider
    }

    // Mostrar las imágenes de una marca seleccionada
    function showImages(imageData) {
        // Limpiar el slider
        slider.innerHTML = '';

        // Cambiar el fondo de la página antes de mostrar las imágenes
        document.body.style.background = 'linear-gradient(to right, #6a11cb, #2575fc)';

        // Recorrer los modelos y sus imágenes
        imageData.children.forEach(model => {
            model.children.forEach(image => {
                if (!image.name.toLowerCase().includes('normal')) {
                    let imageName = `${imageData.name} ${model.name} ${image.name}`;
                    imageName = imageName.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());

                    const imgElement = document.createElement('img');
                    imgElement.src = image.path;
                    imgElement.alt = imageName;
                    imgElement.classList.add('slider-image');
                    slider.appendChild(imgElement);

                    // Cambiar el título
                    topHud.textContent = imageName;
                }
            });
        });

        // Ocultar el menú y mostrar el slider
        menuContainer.style.display = 'none';
        sliderContainer.style.display = 'flex';
    }

    // Volver al menú principal
    backButton.addEventListener('click', () => {
        // Ocultar el slider y mostrar el menú
        sliderContainer.style.display = 'none';
        menuContainer.style.display = 'flex';
        topHud.textContent = 'Menú de Marcas';
        subtitle.textContent = 'La Gran Plaza';
    });

    // Inicializar el menú
    renderMenu();
});
