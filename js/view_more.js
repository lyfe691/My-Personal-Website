document.addEventListener('DOMContentLoaded', function() {
    const viewMoreButton = document.getElementById('view-more-button');
    const viewMoreText = document.getElementById('view-more-text');
    const moreProjects = document.getElementById('more-projects');
    const hiddenProjects = moreProjects.querySelectorAll('.project');
    let isExpanded = false;

    viewMoreButton.addEventListener('click', function() {
        isExpanded = !isExpanded;
        
        if (isExpanded) {
            moreProjects.style.maxHeight = moreProjects.scrollHeight + "px";
            viewMoreText.textContent = "View Less";
            hiddenProjects.forEach((project, index) => {
                setTimeout(() => {
                    project.classList.add('show');
                }, index * 100);
            });
        } else {
            moreProjects.style.maxHeight = "0";
            viewMoreText.textContent = "View More";
            hiddenProjects.forEach(project => {
                project.classList.remove('show');
            });
        }
        
        viewMoreButton.classList.toggle('active');
    });
});