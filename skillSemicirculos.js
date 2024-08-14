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

function skillSemicirculo(etiquetasfiltro){
    etiquetasfiltro.forEach(etiqueta => {
        let divContainerSemicirculoyEtiqueta = document.createElement('div');
        let divContainerSemicirculo = document.createElement('div');
        let divContainerSemicirculoInterno = document.createElement('div');
        let h2Porcentaje = document.createElement('h2');
        let h6Etiqueta = document.createElement('h6');
        let porcentaje = (Math.floor(Math.random() * 100) + 1);
        let porcentajeInicial = 0;
        let duracion = 1000;
        let intervalo = 20;
        let paso = (porcentaje / duracion) * intervalo;

        divContainerSemicirculo.classList.add('divContainerSemicirculo')
        divContainerSemicirculoyEtiqueta.classList.add('divContainerSemicirculoyEtiqueta')

        divContainerSemicirculoyEtiqueta.id = 'divContainerSemicirculoyEtiqueta'+etiqueta;
        divContainerSemicirculo.id = 'divContainerSemicirculo'+etiqueta;
        divContainerSemicirculoInterno.id = 'divContainerSemicirculoInterno'+etiqueta;

        divContainerSemicirculoInterno.style.width = '70%';
        divContainerSemicirculoInterno.style.height = '70%';
        divContainerSemicirculoInterno.style.borderRadius = '50%';
        divContainerSemicirculoInterno.style.clipPath = 'polygon(0% 0%, 100% 0%, 100% 50%, 0% 50%);'
        divContainerSemicirculoInterno.style.backgroundColor = 'antiquewhite';
        divContainerSemicirculoInterno.style.display = 'flex';
        divContainerSemicirculoInterno.style.justifyContent = 'center';
        divContainerSemicirculoInterno.style.transform = 'rotate(90deg)';
        divContainerSemicirculoInterno.style.border = 'solid 1px grey';
        divContainerSemicirculoInterno.style.boxShadow = '0px 0px 10px 0px';
        //divContainerSemicirculoInterno.style.alignItems = 'center';
        
        h2Porcentaje.textContent = porcentaje+'%';
        h2Porcentaje.style.marginTop = '20%';
        h2Porcentaje.style.fontSize = '100%';
        
        h6Etiqueta.textContent = `${etiqueta}`.toUpperCase();
        h6Etiqueta.style.color = 'black';
        h6Etiqueta.style.marginTop = '-45%'

        let color = generarColor();
        


        document.getElementById('containerSkillsSemicirculos').appendChild(divContainerSemicirculoyEtiqueta);
        document.getElementById(divContainerSemicirculoyEtiqueta.id).appendChild(divContainerSemicirculo);
        document.getElementById(divContainerSemicirculo.id).appendChild(divContainerSemicirculoInterno);
        document.getElementById(divContainerSemicirculoyEtiqueta.id).appendChild(h6Etiqueta);
        document.getElementById(divContainerSemicirculoInterno.id).appendChild(h2Porcentaje);

        /*animacion para el porcentaje de progreso y la barra de color*/
        let animateProgress = () => {
            porcentajeInicial += paso ;

            if (porcentajeInicial >= porcentaje) {
                porcentajeInicial = porcentaje;
            }

            const angulo = (porcentajeInicial / 100) * 180;
            
            //divContainerCirculo.style.background = `conic-gradient(red ${angulo}deg, black ${angulo}deg)`;
            //divContainerSemicirculo.style.background = `conic-gradient( red, green, blue ${angulo}deg, transparent 0deg )`;
            divContainerSemicirculo.style.background = `conic-gradient( ${color} ${angulo}deg, transparent 0deg )`;
            h2Porcentaje.textContent = `${Math.round(porcentajeInicial)}%`;

            if (porcentajeInicial < porcentaje) {
                requestAnimationFrame(animateProgress);
            }
        };
        /*hasta aqui es la animacion*/

        requestAnimationFrame(animateProgress);
    });

}
function generarColor(){
    rojo = Math.floor(Math.random() * 255);//generacion de un numero aleatorio para la formacion de un color
    verde = Math.floor(Math.random() * 255);
    azul = Math.floor(Math.random() * 255);
    return color = `rgb(${rojo},${verde},${azul})`;
}
skillSemicirculo(inicio());

document.getElementById('cambiarSemicirculo').addEventListener('click', () => {
    document.getElementById('containerSkillsSemicirculos').innerHTML = '';
    skillSemicirculo(inicio());
})