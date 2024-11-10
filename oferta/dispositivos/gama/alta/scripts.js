fetch('images.json')
  .then(response => response.json())
  .then(data => {
    images = data;  // Array of image filenames
    totalImages = images.length;

    // Dynamically create <img> elements for each image
    images.forEach(image => {
      const imgElement = document.createElement('img');
      imgElement.src = `images/${image}`;  // Path to the image in the images folder
      imgElement.alt = image;
      slider.appendChild(imgElement);
    });

    // Set the initial background color based on the first image
    updateBackgroundColor(slider.children[0]);
  })
  .catch(error => console.log("Error fetching images:", error));
