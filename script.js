<script>
        function toggleTheme() {
            const body = document.documentElement;
            const themeIcon = document.getElementById('theme-icon');
            
            if (body.getAttribute('data-theme') === 'light') {
                body.removeAttribute('data-theme');
                themeIcon.innerText = 'light_mode'; 
            } else {
                body.setAttribute('data-theme', 'light');
                themeIcon.innerText = 'dark_mode'; 
            }
        }
  </script>
