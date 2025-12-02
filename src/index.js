import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../dist/public/css/main.css';
import Swal from 'sweetalert2';

import { transpilarVariables } from "./transpilar/variables.js";


const btnLimpiar = document.getElementById("btnLimpiar");
const entrada = document.getElementById("inputCode");
const salida = document.getElementById("outputCode");

btnLimpiar.addEventListener("click", () => {
    entrada.value = "";
    salida.value = "";
});

document.getElementById("btnTranspile").addEventListener("click", () => {
    
    const input = document.getElementById("inputCode").value;

    const { codigo, analisis } = transpilarVariables(input);

    // Mostrar código
    document.getElementById("outputCode").value = codigo;

    // Mostrar análisis en consola por ahora
    console.table(analisis);
});
