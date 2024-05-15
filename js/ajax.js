document.querySelector('#contact-form form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    var form = event.target;
    var data = new FormData(form);

    // Check if the "Send me a copy" checkbox is checked
    var sendCopy = document.getElementById('copy-checkbox').checked;

    // If the checkbox is checked, send a copy to the submitter's email address
    if (sendCopy) {
        var submitterEmail = data.get('_replyto');
        var subject = 'Copy of your message from ' + window.location.hostname;
        var body = 'Here is a copy of the message you submitted:\n\n' + data.get('message');
        var mailtoLink = 'mailto:' + submitterEmail + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
        window.location.href = mailtoLink;

        // Wait for a short delay to allow the email client to open
        setTimeout(function() {
            // Submit the form to Formspree after the delay
            submitFormToFormspree(form, data);
        }, 1000); // Adjust the delay as needed
    } else {
        // If the checkbox is not checked, submit the form to Formspree immediately
        submitFormToFormspree(form, data);
    }
});

function submitFormToFormspree(form, data) {
    fetch(form.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json' // Ensures you're getting a JSON response
        },
    })
    .then(response => {
        if (response.ok) {
            return response.json(); // Proceed to interpret the JSON response
        } else {
            throw new Error('Server responded with a status: ' + response.status);
        }
    })
    .then(data => {
        var messageElement = document.getElementById('resultMessage');
        if (data.ok) {
            messageElement.innerText = 'Thank you for your message!';
            messageElement.className = 'success show'; // Show message with success styling
            form.reset(); // Reset the form fields to default
        } else {
            throw new Error('Form submission error: ' + (data.error ? data.error : 'Unknown error'));
        }
        setTimeout(function() {
            messageElement.className += ' fade'; // Begin fade out
            setTimeout(function() {
                messageElement.style.display = 'none'; // Hide after fade
            }, 2500); // Wait for fade to finish
        }, 5000); // 5 seconds delay before starting to fade out
    })
    .catch(error => {
        var messageElement = document.getElementById('resultMessage');
        messageElement.innerText = error.message;
        messageElement.className = 'error show'; // Show message with error styling
        setTimeout(function() {
            messageElement.className += ' fade';
            setTimeout(function() {
                messageElement.style.display = 'none';
            }, 2500);
        }, 5000);
    });
}