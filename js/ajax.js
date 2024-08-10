document.querySelector('#contact-form form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission since i dont have a sub to formspree

    var form = event.target;
    var data = new FormData(form);

    // if the checkbox is not checked submit to formspree instantly
    submitFormToFormspree(form, data);
});

function submitFormToFormspree(form, data) {
    fetch(form.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json' // json response
        },
    })
    .then(response => {
        if (response.ok) {
            return response.json(); 
        } else {
            throw new Error('Server responded with a status: ' + response.status);
        }
    })
    .then(data => {
        var messageElement = document.getElementById('resultMessage');
        if (data.ok) {
            messageElement.innerText = 'Thank you for your message!';
            messageElement.className = 'success show'; //  show success message
            form.reset(); // Reset the form fields to default
        } else {
            throw new Error('Form submission error: ' + (data.error ? data.error : 'Unknown error'));
        }
        setTimeout(function() {
            messageElement.className += ' fade'; // Begin fade out
            setTimeout(function() {
                messageElement.style.display = 'none'; // Hide after fade
            }, 2500); 
        }, 5000); // 5 sec delay
    })
    .catch(error => {
        var messageElement = document.getElementById('resultMessage');
        messageElement.innerText = error.message;
        messageElement.className = 'error show'; // show error message
        setTimeout(function() {
            messageElement.className += ' fade';
            setTimeout(function() {
                messageElement.style.display = 'none';
            }, 2500); 
        }, 5000); // 5 sec delay
    });
}
