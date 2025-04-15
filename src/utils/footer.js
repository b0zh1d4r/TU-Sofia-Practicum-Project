document.addEventListener('DOMContentLoaded', function () {
    const links = document.querySelectorAll('.footer ul li a');
    const currentPath = window.location.pathname;

    links.forEach(link => {
        const linkPath = new URL(link.href).pathname;
        if (linkPath === currentPath) {
            link.classList.add('active');
        }
    });
});