function mdai() {
    const popup = document.getElementById('custom-popup');
    const popupMessage = document.getElementById('popup-message');
    const closePopup = document.getElementsByClassName('close-popup')[0];

    popupMessage.textContent = "This project was completed with AI assistance";
    popup.style.display = "block";

    closePopup.onclick = function() {
        popup.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == popup) {
            popup.style.display = "none";
        }
    }
}