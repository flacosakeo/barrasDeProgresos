function skillBarraProgreso(etiquetasfiltro) {
    const container = document.getElementById('containerSkillsBarras');

    etiquetasfiltro.forEach(etiqueta => {
        // Tarjeta envolvente
        const card = document.createElement('div');
        card.classList.add('skill-barra-card');
        card.id = `cardBarra${etiqueta}`;

        // Cabecera superior con información siempre legible
        const header = document.createElement('div');
        header.classList.add('skill-barra-header');

        const nombre = document.createElement('span');
        nombre.classList.add('skill-barra-nombre');
        nombre.textContent = etiqueta.toUpperCase();

        const badgesContainer = document.createElement('div');
        badgesContainer.classList.add('skill-barra-badges');

        const badgeProgreso = document.createElement('span');
        badgeProgreso.classList.add('badge-progreso');

        const badgeResto = document.createElement('span');
        badgeResto.classList.add('badge-resto');

        badgesContainer.appendChild(badgeProgreso);
        badgesContainer.appendChild(badgeResto);
        header.appendChild(nombre);
        header.appendChild(badgesContainer);

        // Pista de la barra de progreso
        const divContainerBarra = document.createElement('div');
        divContainerBarra.classList.add('divContainer');
        divContainerBarra.id = `divContainer${etiqueta}`;

        const barraProgreso = document.createElement('div');
        barraProgreso.classList.add('barraProgreso');
        barraProgreso.id = `barraProgreso${etiqueta}`;

        const barraProgresoResto = document.createElement('div');
        barraProgresoResto.classList.add('barraProgresoResto');
        barraProgresoResto.id = `barraProgresoResto${etiqueta}`;

        // Textos internos sutiles (se muestran únicamente cuando hay espacio suficiente)
        const etiquetaInterna = document.createElement('span');
        etiquetaInterna.classList.add('etiqueta-interna');

        const etiquetaRestoInterna = document.createElement('span');
        etiquetaRestoInterna.classList.add('etiqueta-resto-interna');

        barraProgreso.appendChild(etiquetaInterna);
        barraProgresoResto.appendChild(etiquetaRestoInterna);
        divContainerBarra.appendChild(barraProgreso);
        divContainerBarra.appendChild(barraProgresoResto);

        // Ensamblado final de la tarjeta
        card.appendChild(header);
        card.appendChild(divContainerBarra);
        container.appendChild(card);

        // Color del gradiente
        const porcentaje = Math.floor(Math.random() * 90) + 10;
        const color1 = generarColor();
        const color2 = generarColor();
        barraProgreso.style.background = `linear-gradient(135deg, ${color1}, ${color2})`;

        let animFrameId = null;

        function animarBarra() {
            if (animFrameId) {
                cancelAnimationFrame(animFrameId);
            }

            const duracion = 1200; // ms
            const inicioTiempo = performance.now();

            function paso(ahora) {
                const transcurrido = ahora - inicioTiempo;
                const progresoFraccion = Math.min(transcurrido / duracion, 1);
                
                // Función de suavizado cúbico
                const easeOut = 1 - Math.pow(1 - progresoFraccion, 3);
                const actual = easeOut * porcentaje;
                const actualRedondeado = Math.round(actual);
                const restoRedondeado = Math.round(100 - actual);

                // Anchos físicos
                barraProgreso.style.width = `${actual}%`;
                barraProgresoResto.style.width = `${100 - actual}%`;

                // Badges en la cabecera (100% legibles sin importar el porcentaje)
                badgeProgreso.textContent = `${actualRedondeado}%`;
                badgeResto.textContent = `${restoRedondeado}% restante`;

                // Texto interno: solo visible si el ancho es suficiente para no recortarse
                if (actual >= 30) {
                    etiquetaInterna.textContent = `${actualRedondeado}%`;
                    etiquetaInterna.style.opacity = '1';
                } else {
                    etiquetaInterna.style.opacity = '0';
                }

                if ((100 - actual) >= 30) {
                    etiquetaRestoInterna.textContent = `${restoRedondeado}%`;
                    etiquetaRestoInterna.style.opacity = '1';
                } else {
                    etiquetaRestoInterna.style.opacity = '0';
                }

                if (progresoFraccion < 1) {
                    animFrameId = requestAnimationFrame(paso);
                } else {
                    animFrameId = null;
                }
            }

            animFrameId = requestAnimationFrame(paso);
        }

        // Iniciar animación
        animarBarra();

        // Reinicio limpio con clic en cualquier parte de la tarjeta
        card.addEventListener('click', () => {
            animarBarra();
        });
    });
}

document.getElementById('cambiarBarra').addEventListener('click', () => {
    const container = document.getElementById('containerSkillsBarras');
    container.innerHTML = '';
    skillBarraProgreso(inicio());
});

// Inicialización
skillBarraProgreso(inicio());
