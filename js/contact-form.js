/*------------------------ File Input Change Event Listener ------------------------*/

document.getElementById('file-input').addEventListener('change', function(event) {
    var file = event.target.files[0];
    if (file) {
        // Display the file name next to the "Choose file" button
        document.getElementById('file-name').textContent = file.name;
    }
});
