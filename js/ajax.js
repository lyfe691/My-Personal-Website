// Free Alternative to FormSpree file uploads, it'll show the cloudiary link in the form submission so i can just download it.
// This is only needed because i dont want to purchase a subscription to uload files.



/*------------------------ Free Alternative to FormSpree File Uploads ------------------------
    This script uploads the selected file to Cloudinary and includes the file URL in the form submission
    to FormSpree, allowing you to download the file later.
--------------------------------------------------------------------------------------------*/

document.querySelector('#myForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    var form = event.target;
    var fileInput = document.getElementById('file-input');
    var file = fileInput.files[0];

    if (file) {
        var formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'unsigned_upload'); // Replace with your actual unsigned upload preset

        // Upload the file to Cloudinary
        fetch('https://api.cloudinary.com/v1_1/dfgoxrimk/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            // Store the Cloudinary file URL in a hidden input field
            document.getElementById('fileUrl').value = data.secure_url; 
            // Now submit the form to Formspree
            submitFormToFormspree(form);
        })
        .catch(error => {
            console.error('Error uploading file:', error);
            alert('Failed to upload the file.');
        });
    } else {
        // No file selected, just submit the form directly
        submitFormToFormspree(form);
    }
});

/*------------------------ Form Submission to FormSpree ------------------------
    This function handles the form submission to FormSpree, ensuring that only the
    Cloudinary URL is sent (since FormSpree is too greedy to handle the file itself for free).
--------------------------------------------------------------------------------*/

function submitFormToFormspree(form) {
    var data = new FormData(form);

    // Remove the file input from the form data (only sending the file URL)
    data.delete('attachment');

    fetch(form.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        },
    })
    .then(response => {
        if (response.ok) {
            return response.json(); 
        } else {
            return response.json().then(err => {
                console.error('Formspree error response:', err);
                throw new Error('Server responded with a status: ' + response.status);
            });
        }
    })
    .then(data => {
        var messageElement = document.getElementById('resultMessage');
        if (data.ok) {
            // Success: Show a thank you message and reset the form
            messageElement.innerText = 'Thank you for your message!';
            messageElement.className = 'success show';
            form.reset();
            document.getElementById('file-name').textContent = 'No file chosen'; 
        } else {
            throw new Error('Form submission error: ' + (data.error ? data.error : 'Unknown error'));
        }
        // Hide the message after a delay
        setTimeout(function() {
            messageElement.className += ' fade';
            setTimeout(function() {
                messageElement.style.display = 'none';
            }, 2500); 
        }, 5000);
    })
    .catch(error => {
        // Error: Show an error message
        var messageElement = document.getElementById('resultMessage');
        messageElement.innerText = error.message;
        messageElement.className = 'error show';
        console.error('Form submission failed:', error);
        // Hide the message after a delay
        setTimeout(function() {
            messageElement.className += ' fade';
            setTimeout(function() {
                messageElement.style.display = 'none';
            }, 2500); 
        }, 5000);
    });
}

