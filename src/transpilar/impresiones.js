export function transpilarImpresiones(codigo) {
    const lineas = codigo.split("\n");
    const resultado = [];
    const analisis = [];

    for (let linea of lineas) {
        let original = linea.trim();
        let traducida = linea;

        // echo
        if (/^echo\s+/i.test(original)) {
            traducida = original
                .replace(/^echo\s*/i, "print(")
                .replace(/;$/, ")"); 
            
            analisis.push({
                tipo: "impresión",
                php: original,
                python: traducida
            });
        }

        // print (forma php)
        else if (/^print\s+/i.test(original)) {
            traducida = original
                .replace(/^print\s*/i, "print(")
                .replace(/;$/, ")");

            analisis.push({
                tipo: "impresión",
                php: original,
                python: traducida
            });
        }

        // print_r()
        else if (/^print_r\s*\(/i.test(original)) {
            traducida = original
                .replace(/^print_r\s*\(/i, "print(")
                .replace(/;$/, "");

            analisis.push({
                tipo: "impresión",
                php: original,
                python: traducida
            });
        }

        // var_dump()
        else if (/^var_dump\s*\(/i.test(original)) {
            traducida = original
                .replace(/^var_dump\s*\(/i, "print(")
                .replace(/;$/, "");

            analisis.push({
                tipo: "impresión",
                php: original,
                python: traducida
            });
        }

        resultado.push(traducida);
    }

    return {
        codigo: resultado.join("\n"),
        analisis
    };
}
