const fs = require('fs');
const path = require('path');

// Path to the images directory
const imagesDir = path.join(__dirname, 'images');

// Path to the output JSON file
const outputJsonPath = path.join(__dirname, 'images.json');

// Function to generate the list of image filenames
function generateImageList() {
  // Read the files in the images directory
  fs.readdir(imagesDir, (err, files) => {
    if (err) {
      console.error('Error reading the images directory:', err);
      return;
    }

    // Filter only image files (you can add more extensions if needed)
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ext === '.jpg' || ext === '.jpeg' || ext === '.png' || ext === '.gif';
    });

    // Create the JSON object with the list of image filenames
    const imageList = imageFiles.map(file => file);

    // Write the JSON data to the images.json file
    fs.writeFile(outputJsonPath, JSON.stringify(imageList, null, 2), (err) => {
      if (err) {
        console.error('Error writing the JSON file:', err);
      } else {
        console.log('images.json has been generated successfully!');
      }
    });
  });
}

// Run the function to generate the image list
generateImageList();
