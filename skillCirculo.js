function skillCirculo(etiquetasfiltro) {
    const container = document.getElementById('containerSkillsCirculos');

    // Opciones seleccionadas por el usuario
    const forma = document.getElementById('selectForma').value;
    let colorFondo = document.getElementById('selectFondo').value;
    const selectColor1 = document.getElementById('selectCirculo1').value;
    const selectColor2 = document.getElementById('selectCirculo2').value;

    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    if (colorFondo === 'auto') {
        colorFondo = isLight ? '#ffffff' : '#1e293b';
    }

    etiquetasfiltro.forEach(etiqueta => {
        const divContainerCirculoExterno = document.createElement('div');
        const divContainerCirculo = document.createElement('div');
        const h2Porcentaje = document.createElement('h2');
        const h2Etiqueta = document.createElement('h2');

        divContainerCirculoExterno.classList.add('divContainerCirculoExterno');
        divContainerCirculo.classList.add('divContainerCirculo');

        divContainerCirculoExterno.id = `divContainerCirculoExterno${etiqueta}`;
        divContainerCirculo.id = `divContainerCirculo${etiqueta}`;
        h2Porcentaje.id = `porcentaje${etiqueta}`;

        // Configuración geométrica según "Forma"
        if (forma === "1") {
            // Redondo
            divContainerCirculoExterno.style.borderRadius = '50%';
            divContainerCirculo.style.borderRadius = '50%';
            divContainerCirculo.style.setProperty('--forma', '50%');
        } else if (forma === "2") {
            // Cuadrado estilizado (squircle)
            divContainerCirculoExterno.style.borderRadius = '18px';
            divContainerCirculo.style.borderRadius = '14px';
            divContainerCirculo.style.setProperty('--forma', '10px');
        } else if (forma === "3") {
            // Híbrido: contenedor cuadrado, medidor circular
            divContainerCirculoExterno.style.borderRadius = '18px';
            divContainerCirculo.style.borderRadius = '50%';
            divContainerCirculo.style.setProperty('--forma', '50%');
        }

        // Fondo y variables CSS
        divContainerCirculoExterno.style.backgroundColor = colorFondo;
        divContainerCirculo.style.setProperty('--color', colorFondo);

        // Contraste automático para el texto según el fondo
        const fondosClaros = ['white', '#ffffff', 'antiquewhite', 'darksalmon', 'silver', 'rgb(240, 240, 240)', 'goldenrod'];
        const colorTexto = fondosClaros.includes(colorFondo.toLowerCase()) ? '#0f172a' : '#ffffff';
        h2Porcentaje.style.color = colorTexto;
        h2Etiqueta.style.color = colorTexto;

        // Establecer la etiqueta de texto una sola vez
        h2Etiqueta.textContent = etiqueta.toUpperCase();

        // Ensamblado en el DOM
        divContainerCirculo.appendChild(h2Porcentaje);
        divContainerCirculo.appendChild(h2Etiqueta);
        divContainerCirculoExterno.appendChild(divContainerCirculo);
        container.appendChild(divContainerCirculoExterno);

        // Colores del gradiente
        const c1 = selectColor1 === 'random' ? generarColor() : selectColor1;
        const c2 = selectColor2 === 'random' ? generarColor() : selectColor2;
        const porcentaje = Math.floor(Math.random() * 90) + 10;
        const trackColor = isLight ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.08)';

        let animFrameId = null;

        function animarCirculo() {
            if (animFrameId) {
                cancelAnimationFrame(animFrameId);
            }

            const duracion = 1200; // ms
            const inicioTiempo = performance.now();

            function paso(ahora) {
                const transcurrido = ahora - inicioTiempo;
                const progresoFraccion = Math.min(transcurrido / duracion, 1);
                
                // Suavizado cubic-bezier easeOut
                const easeOut = 1 - Math.pow(1 - progresoFraccion, 3);
                const actual = easeOut * porcentaje;
                const angulo = (actual / 100) * 360;

                divContainerCirculo.style.background = `conic-gradient(${c1}, ${c2} ${angulo}deg, ${trackColor} ${angulo}deg 360deg)`;
                h2Porcentaje.textContent = `${Math.round(actual)}%`;

                if (progresoFraccion < 1) {
                    animFrameId = requestAnimationFrame(paso);
                } else {
                    animFrameId = null;
                }
            }

            animFrameId = requestAnimationFrame(paso);
        }

        // Iniciar animación
        animarCirculo();

        // Reinicio limpio con clic
        divContainerCirculoExterno.addEventListener('click', () => {
            animarCirculo();
        });
    });
}

// Exponer globalmente para permitir redibujo al cambiar tema
window.skillCirculo = skillCirculo;

document.getElementById('cambiarCirculo').addEventListener('click', () => {
    const container = document.getElementById('containerSkillsCirculos');
    container.innerHTML = '';
    skillCirculo(inicio());
});

// Inicialización
skillCirculo(inicio());
