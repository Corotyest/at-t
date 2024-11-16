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
    nextButton.addEventListener('click', () => {
        if (currentIndex < currentImages.length - 1) {
            currentIndex++;
            updateGallery();
        }
    });
}
if (prevButton) {
    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateGallery();
        }
    });
}

// Initialize Menu
function initializeMenu() {
    const menuList = document.getElementById('menu-list');
    if (menuList) {
        data.forEach(item => {
            if (item.type === 'directory') {
                const button = document.createElement('button');
                button.textContent = item.name;
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
        }
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
