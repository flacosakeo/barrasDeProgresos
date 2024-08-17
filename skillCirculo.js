function skillCirculo(etiquetasfiltro){
    etiquetasfiltro.forEach(etiqueta => {
        let divContainerCirculo = document.createElement('div');
        let divContainerCirculoExterno = document.createElement('div');
        let h2Porcentaje = document.createElement('h2')
        let h2Etiqueta = document.createElement('h2')
        let porcentaje = (Math.floor(Math.random() * 100) + 1);
        let porcentajeInicial = 0;
        let duracion = 1000;
        let intervalo = 20;
        let paso = (porcentaje / duracion) * intervalo;
        divContainerCirculo.classList.add('divContainerCirculo');

        divContainerCirculo.id = 'divContainerCirculo'+etiqueta;
        
        h2Porcentaje.id = 'porcentaje'+etiqueta;

        const color1 = document.getElementById('selectCirculo1').value;
        const color2 = document.getElementById('selectCirculo2').value;
  
        const randomColor1 = generarColor();
        const randomColor2 = generarColor();


        divContainerCirculoExterno.style.width = '100px';
        divContainerCirculoExterno.style.height = '100px';
        divContainerCirculoExterno.style.borderRadius = '50%';
        divContainerCirculoExterno.id = 'divContainerCirculoExterno'+etiqueta
        divContainerCirculoExterno.classList.add('divContainerCirculoExterno')
        divContainerCirculoExterno.style.backgroundColor = 'black';
        
        document.getElementById('containerSkillsCirculos').appendChild(divContainerCirculoExterno)
        document.getElementById(divContainerCirculoExterno.id).appendChild(divContainerCirculo)
        document.getElementById(divContainerCirculo.id).appendChild(h2Porcentaje)
        document.getElementById(divContainerCirculo.id).appendChild(h2Etiqueta)
        /*animacion para el porcentaje de progreso y la barra de color*/
        
        let animateProgress = () => {
            porcentajeInicial += paso ;

            if (porcentajeInicial >= porcentaje) {
                porcentajeInicial = porcentaje;
            }

            const angulo = (porcentajeInicial / 100) * 360;

            //divContainerCirculo.style.background = `conic-gradient(red ${angulo}deg, black ${angulo}deg)`;
            if (color1 == "random" && color2 == "random"){
                divContainerCirculo.style.background = `conic-gradient(${randomColor1}, ${randomColor2} ${angulo}deg, black ${angulo}deg)`;
            }
            if (color1 != "random" && color2 == "random"){
                divContainerCirculo.style.background = `conic-gradient(${color1}, ${randomColor2} ${angulo}deg, black ${angulo}deg)`;
            }
            if (color1 == "random" && color2 != "random"){
                divContainerCirculo.style.background = `conic-gradient(${randomColor1}, ${color2} ${angulo}deg, black ${angulo}deg)`;
            }
            if (color1 != "random" && color2 != "random"){
                divContainerCirculo.style.background = `conic-gradient(${color1}, ${color2} ${angulo}deg, black ${angulo}deg)`;
            }
            
            h2Porcentaje.textContent = `${Math.round(porcentajeInicial)}%`;
            h2Etiqueta.textContent = `${etiqueta}`;
            if (porcentajeInicial < porcentaje) {
                requestAnimationFrame(animateProgress);
            }
        };
        /*hasta aqui es la animacion*/

        document.getElementById(divContainerCirculo.id).addEventListener('click', () =>{
            porcentajeInicial = 0;
            requestAnimationFrame(animateProgress);
        });

        requestAnimationFrame(animateProgress);
    });
}

document.getElementById('cambiarCirculo').addEventListener('click', () => {
    document.getElementById('containerSkillsCirculos').innerHTML = '';
    skillCirculo(inicio());
})

function generarColor(){    
    rojo = Math.floor(Math.random() * 256);//generacion de un numero aleatorio para la formacion de un color
    verde = Math.floor(Math.random() * 256);
    azul = Math.floor(Math.random() * 256);
    return color = `rgb(${rojo},${verde},${azul})`;
}

skillCirculo(inicio());