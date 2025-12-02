export function transpilarObjetos(codigo) {
    const lineas = codigo.split("\n");
    const resultado = [];
    const analisis = [];

    for (let linea of lineas) {
        let original = linea.trim();
        let traducida = linea;

        // --- Convertir clases ---
        if (/^class\s+\w+/i.test(original)) {
            traducida = original
                .replace(/^class\s+/i, "class ")
                .replace("{", ":");
            
            analisis.push({
                tipo: "clase",
                php: original,
                python: traducida.trim()
            });
        }

        // --- Propiedades ---
        else if (/^(public|private|protected)\s+\$\w+/i.test(original)) {
            traducida = original
                .replace(/(public|private|protected)\s+/i, "")
                .replace(/\$(\w+)/, "self.$1")
                .replace(/;/, "");
            
            analisis.push({
                tipo: "propiedad",
                php: original,
                python: traducida.trim()
            });
        }

        // --- Constructor ---
        else if (/function\s+__construct/i.test(original)) {
            traducida = original
                .replace(/function\s+__construct/i, "def __init__")
                .replace("{", ":");
            
            // Convertir argumentos $x → x
            traducida = traducida.replace(/\$(\w+)/g, "$1");
            
            analisis.push({
                tipo: "constructor",
                php: original,
                python: traducida.trim()
            });
        }

        // --- Métodos normales ---
        else if (/^function\s+\w+/i.test(original)) {
            traducida = original
                .replace(/^function\s+/, "def ")
                .replace("{", ":")
                .replace(/\$(\w+)/g, "$1");
            
            analisis.push({
                tipo: "método",
                php: original,
                python: traducida.trim()
            });
        }

        // --- this ---
        else if (/\$this->/i.test(original)) {
            traducida = original
                .replace(/\$this->/g, "self.")
                .replace(/;/, "");

            analisis.push({
                tipo: "uso de this",
                php: original,
                python: traducida.trim()
            });
        }

        resultado.push(traducida);
    }

    return {
        codigo: resultado.join("\n"),
        analisis
    };
}
