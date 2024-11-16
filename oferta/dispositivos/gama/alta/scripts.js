import { data } from './images.json';

document.addEventListener("DOMContentLoaded", () => {
    const menu = document.getElementById("menu");
    const slideshow = document.getElementById("slideshow");
    const backButton = document.getElementById("backButton");
    const imageContainer = document.getElementById("imageContainer");
    const prevButton = document.getElementById("prevButton");
    const nextButton = document.getElementById("nextButton");
    const subtitle = document.getElementById("subtitle");

    let currentImages = [];
    let currentIndex = 0;

    function showMenu() {
        menu.classList.remove("hidden");
        slideshow.classList.add("hidden");
        backButton.classList.add("hidden");
        subtitle.classList.remove("hidden");
        document.querySelector("header h1").textContent = "Menu de Marcas";
        subtitle.textContent = "La Gran Plaza";
        menu.innerHTML = "";
        data.forEach(item => {
            if (item.type === "directory") {
                const button = document.createElement("button");
                button.textContent = item.name;
                button.classList.add("menuButton"); // Añadimos una clase para el estilo
                button.addEventListener("click", () => showImages(item));
                menu.appendChild(button);
            }
        });
    }

    function showImages(directory) {
        menu.classList.add("hidden");
        slideshow.classList.remove("hidden");
        backButton.classList.remove("hidden");
        prevButton.classList.remove("hidden");
        nextButton.classList.remove("hidden");
        subtitle.classList.add("hidden");
        document.querySelector("header h1").textContent = directory.name;
        currentImages = [];
        currentIndex = 0;
        directory.children.forEach(subDir => {
            if (subDir.type === "directory") {
                subDir.children.forEach(file => {
                    if (file.type === "file" && !file.name.includes("normal")) {
                        currentImages.push({
                            path: file.path,
                            name: `${directory.name} ${subDir.name} ${file.name.split('-')[0]}`
                        });
                    }
                });
            }
        });
        updateSlideshow();
    }

    function updateSlideshow() {
        if (currentImages.length > 0) {
            const image = currentImages[currentIndex];
            imageContainer.innerHTML = `<img src="${image.path}" alt="${image.name}"><p>${image.name}</p>`;
            prevButton.disabled = currentIndex === 0;
            nextButton.disabled = currentIndex === currentImages.length - 1;
        }
    }

    prevButton.addEventListener("click", () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlideshow();
        }
    });

    nextButton.addEventListener("click", () => {
        if (currentIndex < currentImages.length - 1) {
            currentIndex++;
            updateSlideshow();
        }
    });

    backButton.addEventListener("click", showMenu);

    // Inicializar con el menú visible
    showMenu();
});
