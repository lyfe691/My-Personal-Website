// set the inital theme (localstorage)
(function() {
    const currentTheme = localStorage.getItem('theme') || 'dark';
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
})();

document.addEventListener('DOMContentLoaded', function() {
    const toggleSwitch = document.getElementById('dark-mode-toggle');

    function setTheme(theme) {
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
            toggleSwitch.innerHTML = '<div class="feather-sun"><i data-feather="sun"></i></div>'; 
        } else {
            document.body.classList.remove('dark-mode');
            toggleSwitch.innerHTML = '<div class="feather-moon"><i data-feather="moon"></i></div>'; 
        }
        localStorage.setItem('theme', theme);
        feather.replace(); // Replace the feather icons
    }

    // Initialize the theme toggle icon
    const isDarkMode = document.body.classList.contains('dark-mode');
    toggleSwitch.innerHTML = isDarkMode 
        ? '<div class="feather-sun"><i data-feather="sun"></i></div>'
        : '<div class="feather-moon"><i data-feather="moon"></i></div>';
    feather.replace();

    toggleSwitch.addEventListener('click', function() {
        const newTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
        setTheme(newTheme);
    });

    // MutationObserver
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const isDarkMode = document.body.classList.contains('dark-mode');
                toggleSwitch.innerHTML = isDarkMode 
                    ? '<div class="feather-sun"><i data-feather="sun"></i></div>'
                    : '<div class="feather-moon"><i data-feather="moon"></i></div>';
                feather.replace(); // Replace the feather icons
            }
        });
    });

    observer.observe(document.body, { attributes: true });
});
