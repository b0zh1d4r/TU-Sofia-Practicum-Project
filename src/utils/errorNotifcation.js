function closeNotification() {
    const notif = document.getElementById('errorNotification');
    if (notif) {
        notif.classList.remove('show');
        setTimeout(() => {
            notif.style.display = 'none';
        }, 500); // match transition duration
    }
}

// Show the notification smoothly on load
window.addEventListener('DOMContentLoaded', () => {
    const notif = document.getElementById('errorNotification');
    if (notif) {
        notif.classList.add('show');
        setTimeout(closeNotification, 5000);
    }
});