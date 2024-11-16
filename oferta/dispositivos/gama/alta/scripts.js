// Data import
import { data } from './imagesIni.js';

// Variables for current state
let currentBrand = null;
let currentIndex = 0;
let currentImages = [];

// Elements
const menu = document.getElementById('menu');
const gallery = document.getElementById('gallery');
const backButton = document.getElementById('back-button');
const nextButton = document.getElementById('next-button');
const prevButton = document.getElementById('prev-button');
const titleElement = document.getElementById('title');

// Check if elements exist before adding event listeners
if (backButton) {
    backButton.addEventListener('click', showMenu);
}
if (nextButton) {
    nextButton.addEventListener('click', showNextImage);
}
if (prevButton) {
    prevButton.addEventListener('click', showPrevImage);
}

// Initialize Menu
function initializeMenu() {
    const menuList = document.getElementById('menu-list');
    if (menuList) {
        data.forEach(item => {
            if (item.type === 'directory') {
                const button = document.createElement('button');
                button.textContent = item.name.toUpperCase();
                button.classList.add('menu-button');
                button.addEventListener('click', () => {
                    loadGallery(item);
                });
                menuList.appendChild(button);
            }
        });
    }
}

// Load Gallery for a Brand
function loadGallery(brand) {
    currentBrand = brand;
    currentIndex = 0;
    currentImages = [];

    brand.children.forEach(model => {
        model.children.forEach(image => {
            if (image.type === 'file') {
                currentImages.push({
                    model: model.name,
                    path: image.path.replace('./', 'images/')
                });
            }
        });
    });

    updateGallery();
    showGallery();
}

// Update Gallery Display
function updateGallery() {
    const imageElement = document.getElementById('gallery-image');
    const titleElement = document.getElementById('title');

    if (currentImages.length > 0) {
        const currentImage = currentImages[currentIndex];
        if (imageElement && titleElement) {
            imageElement.src = currentImage.path;
            titleElement.textContent = `${currentBrand.name.toUpperCase()} ${currentImage.model.toUpperCase()}`;
            updateBackgroundColor(currentImage.path);
        }
    }
}

// Show Next Image
function showNextImage() {
    if (currentIndex < currentImages.length - 1) {
        currentIndex++;
        updateGallery();
    }
}

// Show Previous Image
function showPrevImage() {
    if (currentIndex > 0) {
        currentIndex--;
        updateGallery();
    }
}

// Show Menu and Hide Gallery
function showMenu() {
    if (menu && gallery) {
        menu.style.display = 'flex';
        gallery.style.display = 'none';
        titleElement.textContent = "Menu De Marcas";
        document.getElementById('subtitle').textContent = "La Gran Plaza";
    }
}

// Show Gallery and Hide Menu
function showGallery() {
    if (menu && gallery) {
        menu.style.display = 'none';
        gallery.style.display = 'block';
    }
}

// Initialize the Menu on Page Load
document.addEventListener('DOMContentLoaded', initializeMenu);

// Add swipe event listeners
let touchStartX = 0;

gallery.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
});

gallery.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    if (touchStartX - touchEndX > 50) {
        showNextImage();
    } else if (touchStartX - touchEndX < -50) {
        showPrevImage();
    }
});

// Function to update background color based on the current image
function updateBackgroundColor(imagePath) {
    const img = new Image();
    img.src = imagePath;
    img.crossOrigin = 'Anonymous';
    img.onload = function () {
        // Get the image data
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);

        // Extract dominant color
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;

        let colorCount = {};
        for (let i = 0; i < pixels.length; i += 4) {
            const r = pixels[i];
            const g = pixels[i + 1];
            const b = pixels[i + 2];
            const color = `rgb(${r},${g},${b})`;
            if (colorCount[color]) {
                colorCount[color]++;
            } else {
                colorCount[color] = 1;
            }
        }

        let dominantColor = '';
        let maxCount = 0;
        for (const color in colorCount) {
            if (colorCount[color] > maxCount) {
                dominantColor = color;
                maxCount = colorCount[color];
            }
        }

        // Set the background color
        document.body.style.backgroundColor = dominantColor;
    };
}
