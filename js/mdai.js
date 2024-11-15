function mdai() {
    const popup = document.createElement('div');
    popup.className = 'custom-popup';
    popup.innerHTML = `
        <div class="popup-content">
            <span class="close-popup">&times;</span>
            <div id="popup-message">This project was completed with AI assistance</div>
        </div>
    `;

    document.body.appendChild(popup);

    popup.style.display = "block";

    const closePopup = () => {
        popup.remove();
    };

    popup.querySelector('.close-popup').onclick = closePopup;
    popup.onclick = (e) => {
        if (e.target === popup) closePopup();
    };
}