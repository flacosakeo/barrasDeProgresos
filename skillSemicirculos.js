function skillSemicirculo(etiquetasfiltro) {
    const container = document.getElementById('containerSkillsSemicirculos');
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    const trackColor = isLight ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.1)';

    etiquetasfiltro.forEach(etiqueta => {
        const divContainerSemicirculoyEtiqueta = document.createElement('div');
        const divContainerSemicirculo = document.createElement('div');
        const divContainerSemicirculoInterno = document.createElement('div');
        const h2Porcentaje = document.createElement('h2');
        const h6Etiqueta = document.createElement('h6');

        divContainerSemicirculoyEtiqueta.classList.add('divContainerSemicirculoyEtiqueta');
        divContainerSemicirculo.classList.add('divContainerSemicirculo');
        divContainerSemicirculoInterno.classList.add('divContainerSemicirculoInterno');

        divContainerSemicirculoyEtiqueta.id = `divContainerSemicirculoyEtiqueta${etiqueta}`;
        divContainerSemicirculo.id = `divContainerSemicirculo${etiqueta}`;
        divContainerSemicirculoInterno.id = `divContainerSemicirculoInterno${etiqueta}`;

        h6Etiqueta.textContent = etiqueta.toUpperCase();

        // Ensamblado en el DOM
        divContainerSemicirculoInterno.appendChild(h2Porcentaje);
        divContainerSemicirculo.appendChild(divContainerSemicirculoInterno);
        divContainerSemicirculoyEtiqueta.appendChild(divContainerSemicirculo);
        divContainerSemicirculoyEtiqueta.appendChild(h6Etiqueta);
        container.appendChild(divContainerSemicirculoyEtiqueta);

        const color = generarColor();
        const porcentaje = Math.floor(Math.random() * 90) + 10;

        let animFrameId = null;

        function animarSemicirculo() {
            if (animFrameId) {
                cancelAnimationFrame(animFrameId);
            }

            const duracion = 1200; // ms
            const inicioTiempo = performance.now();

            function paso(ahora) {
                const transcurrido = ahora - inicioTiempo;
                const progresoFraccion = Math.min(transcurrido / duracion, 1);
                
                // Curva de aceleración/desaceleración suave
                const easeOut = 1 - Math.pow(1 - progresoFraccion, 3);
                const actual = easeOut * porcentaje;
                
                // Arco de 180 grados (de izquierda a derecha en semicírculo superior)
                const angulo = (actual / 100) * 180;

                divContainerSemicirculo.style.background = `conic-gradient(from 270deg, ${color} 0deg ${angulo}deg, ${trackColor} ${angulo}deg 180deg, transparent 180deg)`;
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
        animarSemicirculo();

        // Reinicio limpio con clic
        divContainerSemicirculoyEtiqueta.addEventListener('click', () => {
            animarSemicirculo();
        });
    });
}

// Exponer globalmente
window.skillSemicirculo = skillSemicirculo;

document.getElementById('cambiarSemicirculo').addEventListener('click', () => {
    const container = document.getElementById('containerSkillsSemicirculos');
    container.innerHTML = '';
    skillSemicirculo(inicio());
});

// Inicialización
skillSemicirculo(inicio());
