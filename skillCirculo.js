function inicio(){

    let etiquetas = ["css","html","js","java","sql","xampp","netbeans","vs-code","vfp",
    "corel","office","windows","postman","photoshop"];//array con etiquetas
    let etiquetasfiltro = [];//array vacio

    let longitud = Math.floor(Math.random() * (0 - etiquetas.length)) + etiquetas.length;

    for(let i = 0; i <= longitud; i++){
        let indice = 0;
        indice = Math.floor(Math.random() * etiquetas.length);
        etiquetasfiltro.push(etiquetas[indice]);
        etiquetas.splice(indice, 1);
    } 
    return etiquetasfiltro;

}

function skillCirculo(etiquetasfiltro){
    etiquetasfiltro.forEach(etiqueta => {
        let divContainerCirculo = document.createElement('div');
        let divContainerCirculoExterno = document.createElement('div');
        let h2Porcentaje = document.createElement('h2')
        let porcentaje = (Math.floor(Math.random() * 100) + 1);
        let porcentajeInicial = 0;
        let duracion = 1000;
        let intervalo = 10;
        let paso = (porcentaje / duracion) * intervalo;
        divContainerCirculo.classList.add('divContainerCirculo');

        divContainerCirculo.id = 'divContainerCirculo'+etiqueta;
        
        h2Porcentaje.textContent = porcentaje+'%';

        divContainerCirculo.style.width = '90%';
        divContainerCirculo.style.height = '90%';
        divContainerCirculo.style.borderRadius = '50%';
        //divContainerCirculo.style.backgroundColor = 'red';
        divContainerCirculo.style.margin = '0.5%';
        //divContainerCirculo.style.animation = `${divContainerCirculo.id} 1s linear forwards`;

        divContainerCirculoExterno.style.width = '70px';
        divContainerCirculoExterno.style.height = '70px';
        divContainerCirculoExterno.style.borderRadius = '50%';
        divContainerCirculoExterno.id = 'divContainerCirculoExterno'+etiqueta
        divContainerCirculoExterno.classList.add('divContainerCirculoExterno')
        divContainerCirculoExterno.style.backgroundColor = 'black';
        //divContainerCirculo.style.background = `conic-gradient(red 0deg, green 90deg, blue 180deg, yellow 270deg, cyan 360deg)`;
        //divContainerCirculo.style.background= `conic-gradient(from 180deg at center, red, yellow, green, blue)`;
        //divContainerCirculo.style.background = `conic-gradient(red, yellow, green, blue)`;
        
        document.getElementById('containerSkillsCirculos').appendChild(divContainerCirculoExterno)
        document.getElementById(divContainerCirculoExterno.id).appendChild(divContainerCirculo)
        document.getElementById(divContainerCirculo.id).appendChild(h2Porcentaje)
        
        /*animacion para el porcentaje de progreso y la barra de color*/
        let animateProgress = () => {
            porcentajeInicial += paso ;

            if (porcentajeInicial >= porcentaje) {
                porcentajeInicial = porcentaje;
            }

            const angulo = (porcentajeInicial / 100) * 360;

            //divContainerCirculo.style.background = `conic-gradient(red ${angulo}deg, black ${angulo}deg)`;
            divContainerCirculo.style.background = `conic-gradient(red , white ${angulo}deg, black 0deg)`;
            h2Porcentaje.textContent = `${Math.round(porcentajeInicial)}%`;

            if (porcentajeInicial < porcentaje) {
                requestAnimationFrame(animateProgress);
            }
        };
        /*hasta aqui es la animacion*/

        requestAnimationFrame(animateProgress);
    });
}
document.getElementById('cambiarCirculo').addEventListener('click', () => {
    document.getElementById('containerSkillsCirculos').innerHTML = '';
    skillCirculo(inicio());
})


skillCirculo(inicio());