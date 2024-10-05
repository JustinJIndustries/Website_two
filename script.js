document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('dark-mode-toggle');
    const menuButton = document.getElementById('menu-toggle');
    const body = document.body;
    const sunIcon = toggleButton.querySelector('.sun');
    const moonIcon = toggleButton.querySelector('.moon');
    const overlay = document.getElementById('overlay');

    // Initialize Theme based on user's preference or saved preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.toggle('dark-mode', savedTheme === 'dark');
    } else {
        // Detect system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        body.classList.toggle('dark-mode', prefersDark);
    }

    // Update Icons based on initial theme
    updateIcons();

    // Dark Mode Toggle Event
    toggleButton.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const isDarkMode = body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        updateIcons();
    });

    // Menu Toggle Event
    menuButton.addEventListener('click', () => {
        menuButton.classList.toggle('active');
        overlay.classList.toggle('active');
        body.classList.toggle('menu-open');

        const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
        menuButton.setAttribute('aria-expanded', !isExpanded);
    });

    // Close overlay when a link is clicked
    const overlayLinks = overlay.querySelectorAll('.overlay-menu a');
    overlayLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuButton.classList.remove('active');
            overlay.classList.remove('active');
            body.classList.remove('menu-open');
            menuButton.setAttribute('aria-expanded', 'false');
        });
    });

    // Close overlay when clicking outside the menu
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            menuButton.classList.remove('active');
            overlay.classList.remove('active');
            body.classList.remove('menu-open');
            menuButton.setAttribute('aria-expanded', 'false');
        }
    });

    // Close overlay with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('active')) {
            menuButton.classList.remove('active');
            overlay.classList.remove('active');
            body.classList.remove('menu-open');
            menuButton.setAttribute('aria-expanded', 'false');
        }
    });

    // Function to Update Icons
    function updateIcons() {
        if (body.classList.contains('dark-mode')) {
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
        } else {
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        }
    }
});