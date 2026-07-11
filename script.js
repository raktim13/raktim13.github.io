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

// 3. TIME
document.addEventListener("DOMContentLoaded", function() {
    const greetingText = document.getElementById('greeting-text');
    const greetingIcon = document.getElementById('greeting-icon');

    if (greetingText && greetingIcon) {
        const hour = new Date().getHours();
        
        if (hour >= 5 && hour < 12) {
            greetingText.innerText = "Good morning!";
            greetingIcon.innerText = "sunny"; // Material Icon
        } else if (hour >= 12 && hour < 17) {
            greetingText.innerText = "Good afternoon!";
            greetingIcon.innerText = "flare";
        } else if (hour >= 17 && hour < 20) {
            greetingText.innerText = "Good evening!";
            greetingIcon.innerText = "wb_twilight"; // Sunset look
        } else {
            greetingText.innerText = "Hey there, fellow night owl!";
            greetingIcon.innerText = "bedtime"; // Moon/Night look
        }
    }
    
    // ... your existing fetch menu code ...
});


// 4. CURSOR TRAIL
document.addEventListener("DOMContentLoaded", function() {
    // 1. Cursor Dot Logic
    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    document.body.appendChild(dot);

    window.addEventListener('mousemove', (e) => {
        dot.style.left = e.clientX + 'px';
        dot.style.top = e.clientY + 'px';
    });

    // ... rest of your code ...
});
