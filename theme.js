// Manejo de tema Claro / Oscuro con persistencia y detección de preferencia del sistema
(function() {
    const STORAGE_KEY = 'progresos_theme';
    const root = document.documentElement;

    function getPreferredTheme() {
        const storedTheme = localStorage.getItem(STORAGE_KEY);
        if (storedTheme) {
            return storedTheme;
        }
        return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }

    function applyTheme(theme) {
        root.setAttribute('data-theme', theme);
        localStorage.setItem(STORAGE_KEY, theme);

        const themeIcon = document.getElementById('themeIcon');
        const themeText = document.getElementById('themeText');
        if (themeIcon && themeText) {
            if (theme === 'light') {
                themeIcon.textContent = '☀️';
                themeText.textContent = 'Modo Claro';
            } else {
                themeIcon.textContent = '🌙';
                themeText.textContent = 'Modo Oscuro';
            }
        }

        // Si los círculos usan el fondo automático, actualizarlos para que coincidan con el nuevo tema
        const selectFondo = document.getElementById('selectFondo');
        if (selectFondo && selectFondo.value === 'auto' && typeof window.skillCirculo === 'function' && typeof window.inicio === 'function') {
            const container = document.getElementById('containerSkillsCirculos');
            if (container) {
                container.innerHTML = '';
                window.skillCirculo(window.inicio());
            }
        }
    }

    // Aplicar de inmediato
    const initialTheme = getPreferredTheme();
    root.setAttribute('data-theme', initialTheme);

    document.addEventListener('DOMContentLoaded', () => {
        applyTheme(root.getAttribute('data-theme') || initialTheme);

        const toggleBtn = document.getElementById('themeToggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                const activeTheme = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
                applyTheme(activeTheme);
            });
        }
    });

    // Escuchar preferencia del sistema
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', e => {
        if (!localStorage.getItem(STORAGE_KEY)) {
            applyTheme(e.matches ? 'light' : 'dark');
        }
    });
})();
