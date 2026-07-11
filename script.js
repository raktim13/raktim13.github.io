// --- 0. THEME MEMORY CHECK (Run immediately when page loads) ---
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
}

// 1. THEME TOGGLE LOGIC
function toggleTheme() {
    const body = document.documentElement;
    const themeIcon = document.getElementById('theme-icon');
    
    // Toggle the theme
    if (body.getAttribute('data-theme') === 'light') {
        body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'dark'); // Save choice
        if (themeIcon) themeIcon.innerText = 'light_mode'; 
    } else {
        body.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light'); // Save choice
        if (themeIcon) themeIcon.innerText = 'dark_mode'; 
    }
}

// 2. NAVIGATION MENU LOADER
document.addEventListener("DOMContentLoaded", function() {
    // Update the icon correctly based on the current theme
    const themeIcon = document.getElementById('theme-icon');
    if (themeIcon) {
        themeIcon.innerText = (localStorage.getItem('theme') === 'light') ? 'dark_mode' : 'light_mode';
    }

    const navPlaceholder = document.getElementById('nav-placeholder');
    if (navPlaceholder) {
        fetch('menu.html')
            .then(response => response.text())
            .then(data => {
                navPlaceholder.innerHTML = data;
            })
            .catch(error => console.error('Error loading menu:', error));
    }
});

// 3. Daenerys Easter Egg
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            document.getElementById('daenerys-drogon-easter-egg').style.display = 'flex';
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function closeDragon() {
    document.getElementById('daenerys-drogon-easter-egg').style.display = 'none';
}
