export function transpilarVariables(code) {
    let py = code;

    // Son los carecteres paralas  variables php
    const variableRegex = /\$(\w+)\s*=\s*(.*?);/g;
     // guarda las coincidencias
    let match;
    //Guarda el analisis
    let resultados = [];
     // busca el codigo de pehp
    while ((match = variableRegex.exec(code)) !== null) {
        let varName = match[1];
        let value = match[2].trim();

        let tipo = detectarTipo(value);
        let pythonValue = convertirValor(value, tipo);

        resultados.push({
            php: match[0],
            variable: varName,
            valorOriginal: value,
            tipoDetectado: tipo,
            python: `${varName} = ${pythonValue}`
        });

        // Reemplazar en el código a codigo Python
        py = py.replace(match[0], `${varName} = ${pythonValue}`);
    }

    return { codigo: py, analisis: resultados };
}


function detectarTipo(valor) {
    if (/^".*"$|^'.*'$/.test(valor)) return "string";
    if (/^\d+$/.test(valor)) return "int";
    if (/^\d+\.\d+$/.test(valor)) return "float";
    if (/^(true|false)$/i.test(valor)) return "boolean";
    if (/^null$/i.test(valor)) return "null";
    if (/^\[.*\]$/.test(valor)) return "array";
    if (/^array\s*\(.*\)$/.test(valor)) return "array_asociativo";
    return "desconocido";
}


function convertirValor(valor, tipo) {
    switch (tipo) {
        case "string":
            return valor; // igual
        case "int":
            return parseInt(valor);
        case "float":
            return parseFloat(valor);
        case "boolean":
            return valor.toLowerCase() === "true" ? "True" : "False";
        case "null":
            return "None";
        case "array":
            return valor.replace("[", "[").replace("]", "]");
        case "array_asociativo":
            let contenido = valor.replace(/^array\s*\(|\)$/g, "");
            contenido = contenido.replace(/=>/g, ":");
            return `{ ${contenido} }`;
        default:
            return valor; // sin cambios
    }
}
