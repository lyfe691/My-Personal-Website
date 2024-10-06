document.addEventListener('DOMContentLoaded', function() {
    const toggleSwitch = document.getElementById('dark-mode-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';

    function setTheme(theme) {
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
            toggleSwitch.innerHTML = '<div class="feather-sun"><i data-feather="sun"></i></div>'; 
        } else {
            document.body.classList.remove('dark-mode');
            toggleSwitch.innerHTML = '<div class="feather-moon"><i data-feather="moon"></i></div>'; 
        }
        localStorage.setItem('theme', theme);
        feather.replace(); // replace the feather icons
    }

    setTheme(currentTheme);

    toggleSwitch.addEventListener('click', function() {
        const newTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
        setTheme(newTheme);
    });
});
