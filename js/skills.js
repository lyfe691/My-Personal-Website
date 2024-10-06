document.addEventListener("DOMContentLoaded", function () {
    const skillLevels = document.querySelectorAll(".skill-level");

    skillLevels.forEach(skill => {
        const width = skill.style.width;
        skill.style.width = "0";
        
        setTimeout(() => {
            skill.style.width = width;
        }, 500);
    });
});
