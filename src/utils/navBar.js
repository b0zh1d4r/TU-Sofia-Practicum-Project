const navbarToggle = document.querySelector('.navbar-toggle');
const navbarMenu = document.querySelector('.navbar-menu');
const navLinks = document.querySelectorAll('.navbar-menu li a');

// Toggle menu open/close
navbarToggle.addEventListener('click', () => {
    navbarToggle.classList.toggle('active');
    navbarMenu.classList.toggle('active');
});

// Set active class based on current URL
const currentPath = window.location.pathname;
navLinks.forEach(link => {
    const linkPath = new URL(link.href).pathname;
    if (linkPath === currentPath) {
        link.classList.add('active');
    }
});

// Handle link clicks (optional for visual feedback without reload)
navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        // Remove active from all links
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');

        // Close mobile menu if open
        if (window.innerWidth <= 880) {
            navbarToggle.classList.remove('active');
            navbarMenu.classList.remove('active');
        }
    });
});
