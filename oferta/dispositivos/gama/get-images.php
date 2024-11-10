<?php
// Set the path to the folder where the images are stored
$imageFolder = 'images/';

// Scan the directory and get all image files (jpg, png, jpeg, gif)
$images = array_filter(scandir($imageFolder), function($file) use ($imageFolder) {
    return preg_match('/\.(jpg|jpeg|png|gif)$/i', $file);
});

// Return the list of images as a JSON array
echo json_encode(array_values($images));
?>
