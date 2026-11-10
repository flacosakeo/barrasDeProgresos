// Banco de etiquetas de habilidades tecnológicas
const TODAS_LAS_ETIQUETAS = [
    "css", "html", "js", "java", "sql", "xampp", "netbeans", "vs-code", "visualfoxpro",
    "corel", "office", "windows", "postman", "photoshop", "python", "git", "react", "node"
];

// Generador de color RGB vibrante (evita colores demasiado oscuros o apagados)
function generarColor() {
    const rojo = Math.floor(Math.random() * 200) + 35;
    const verde = Math.floor(Math.random() * 200) + 35;
    const azul = Math.floor(Math.random() * 200) + 35;
    return `rgb(${rojo}, ${verde}, ${azul})`;
}

// Función para obtener un subconjunto aleatorio y único de etiquetas
function inicio() {
    const etiquetas = [...TODAS_LAS_ETIQUETAS];
    const etiquetasfiltro = [];

    // Cantidad aleatoria controlada (entre 4 y 8 habilidades para visualización óptima)
    const cantidadMin = 4;
    const cantidadMax = Math.min(8, etiquetas.length);
    const cantidad = Math.floor(Math.random() * (cantidadMax - cantidadMin + 1)) + cantidadMin;

    for (let i = 0; i < cantidad; i++) {
        if (etiquetas.length === 0) break;
        const indice = Math.floor(Math.random() * etiquetas.length);
        etiquetasfiltro.push(etiquetas[indice]);
        etiquetas.splice(indice, 1);
    }

    return etiquetasfiltro;
}
