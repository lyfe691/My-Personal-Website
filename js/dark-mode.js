document.addEventListener('DOMContentLoaded', function() {
    const toggleSwitch = document.getElementById('dark-mode-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';

    function setTheme(theme) {
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
            toggleSwitch.innerHTML = '☀'; 
        } else {
            document.body.classList.remove('dark-mode');
            toggleSwitch.innerHTML = '☽'; 
        }
        localStorage.setItem('theme', theme);
    }

    setTheme(currentTheme);

    toggleSwitch.addEventListener('click', function() {
        const newTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
        setTheme(newTheme);
    });
});