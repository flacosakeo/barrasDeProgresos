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

function skillBarraProgreso(etiquetasfiltro){
    etiquetasfiltro.forEach(etiqueta => {
        let divContainerBarra = document.createElement('div');
        let barraProgreso = document.createElement('div');
        let barraProgresoResto = document.createElement('div');
        let etiquetaprogreso = document.createElement('h4');
        let etiquetaprogresoresto = document.createElement('h4');
        let ancho = 0;
        let anchoresto = 0;
        divContainerBarra.classList.add('divContainer');
        barraProgreso.classList.add('barraProgreso');
        barraProgresoResto.classList.add('barraProgresoResto');
        etiquetaprogreso.classList.add('h4');
        etiquetaprogresoresto.classList.add('h4');

        divContainerBarra.id = "divContainer"+etiqueta;
        barraProgreso.id = "barraProgreso"+etiqueta;
        barraProgresoResto.id = "barraProgresoResto"+etiqueta;
        barraProgreso.style.animation = `${barraProgreso.id} 2s forwards`;
        etiquetaprogreso.id = "etiquetaprogreso"+etiqueta;
        porcentaje = (Math.floor(Math.random() * 100) + 1);
        porcentajeresto = (100 - porcentaje);
        
        barraProgreso.style.background = `linear-gradient(to right, ${generarColor()}, ${generarColor()})`;         
        
        barraProgresoResto.style.width = porcentajeresto+'%';

        if (porcentaje > 30){
           
            barraProgreso.style.justifyContent = 'center';
        }
        document.getElementById('containerSkillsBarras').appendChild(divContainerBarra);
        document.getElementById(divContainerBarra.id).appendChild(barraProgreso);
        document.getElementById(barraProgreso.id).appendChild(etiquetaprogreso);
        document.getElementById(divContainerBarra.id).appendChild(barraProgresoResto);
        document.getElementById(barraProgresoResto.id).appendChild(etiquetaprogresoresto);

        intervalo(ancho, anchoresto, porcentaje, porcentajeresto, etiquetaprogreso, etiquetaprogresoresto, etiqueta, barraProgreso.id, barraProgresoResto.id);

    });
}
function intervalo(ancho, anchoresto, porcentaje, porcentajeresto, 
                   etiquetaprogreso, etiquetaprogresoresto, etiqueta,
                   barraProgreso, barraProgresoResto){
    animacion(barraProgreso, porcentaje);
    let intervalo = setInterval(function(){
        if (ancho >= porcentaje){
            clearInterval(intervalo);
        }else{
            ancho ++;
            etiquetaprogreso.textContent = `${etiqueta}`.toUpperCase() + ` ${ancho}%`;            
        }
    },20);

    
    animacion(barraProgresoResto, porcentajeresto);
    let intervaloresto = setInterval(function(){
        if (anchoresto >= porcentajeresto){
            clearInterval(intervaloresto);
        }else{
            anchoresto ++;            
            if(porcentaje < 100){
                etiquetaprogresoresto.textContent = `${anchoresto}%`;  
            }          
        }
    },20);
};

function animacion(barraProgreso, porcentaje){
        let styleSheet = document.styleSheets[0];
        let keyframes = `
            @keyframes ${barraProgreso} {   
                from { width: 0 }             
                to { width: ${porcentaje}%; }
            }
        `;
        styleSheet.insertRule(keyframes, styleSheet.cssRules.length);//inserta una nueva regla en css     
}

function generarColor(){    
    rojo = Math.floor(Math.random() * 256);//generacion de un numero aleatorio para la formacion de un color
    verde = Math.floor(Math.random() * 256);
    azul = Math.floor(Math.random() * 256);
    return color = `rgb(${rojo},${verde},${azul})`;
}

document.getElementById('cambiarBarra').addEventListener('click', () => {
    document.getElementById('containerSkillsBarras').innerHTML = '';
    skillBarraProgreso(inicio());
})

skillBarraProgreso(inicio());



