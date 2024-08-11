/*------------------------ File Input Change Event Listener ------------------------*/

document.getElementById('file-input').addEventListener('change', function(event) {
    var file = event.target.files[0];
    if (file) {
        // Display the file name next to the "Choose file" button
        document.getElementById('file-name').textContent = file.name;
        // Show the "X" remove icon
        document.getElementById('remove-file').style.display = 'inline';
    }
});

// Event listener for the "X" remove icon
document.getElementById('remove-file').addEventListener('click', function() {
    // Clear the file input
    document.getElementById('file-input').value = '';
    // Reset the displayed file name
    document.getElementById('file-name').textContent = 'No file chosen';
    // Hide the "X" remove icon
    document.getElementById('remove-file').style.display = 'none';
});