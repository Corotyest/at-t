// Data import
import { data } from './images.js';

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

// Initialize Menu
function initializeMenu() {
    const menuList = document.getElementById('menu-list');
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
        imageElement.src = currentImage.path;
        titleElement.textContent = `${currentBrand.name} ${currentImage.model}`;
    }
}

// Show Menu and Hide Gallery
function showMenu() {
    menu.style.display = 'block';
    gallery.style.display = 'none';
}

// Show Gallery and Hide Menu
function showGallery() {
    menu.style.display = 'none';
    gallery.style.display = 'block';
}

// Navigate to Previous Image
prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateGallery();
    }
});

// Navigate to Next Image
nextButton.addEventListener('click', () => {
    if (currentIndex < currentImages.length - 1) {
        currentIndex++;
        updateGallery();
    }
});

// Go Back to Menu
backButton.addEventListener('click', showMenu);

// Initialize the Menu on Page Load
document.addEventListener('DOMContentLoaded', initializeMenu);
