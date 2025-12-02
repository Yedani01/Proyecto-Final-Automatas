import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../dist/public/css/main.css';
import Swal from 'sweetalert2';

import { transpilarVariables } from "./transpilar/variables.js";
import { transpilarImpresiones } from "./transpilar/impresiones.js";
import { transpilarObjetos } from "./transpilar/objectos.js";

const btnLimpiar = document.getElementById("btnLimpiar");
const entrada = document.getElementById("inputCode");
const salida = document.getElementById("outputCode");

btnLimpiar.addEventListener("click", () => {
    entrada.value = "";
    salida.value = "";
});

document.getElementById("btnTranspile").addEventListener("click", () => {

    let input = document.getElementById("inputCode").value;
    let analisisGlobal = [];

    // 1️⃣ Variables
    const { codigo: outVars, analisis: aVars } = transpilarVariables(input);
    analisisGlobal.push(...aVars);

    // 2️⃣ Impresiones
    const { codigo: outPrint, analisis: aPrint } = transpilarImpresiones(outVars);
    analisisGlobal.push(...aPrint);

    // 3️⃣ Objetos
    const { codigo: outObj, analisis: aObj } = transpilarObjetos(outPrint);
    analisisGlobal.push(...aObj);


    // Mostrar resultado final
    document.getElementById("outputCode").value = outObj;

    // Mostrar análisis de TODO
    console.table(analisisGlobal);
});

