/* Formulario de contacto: valida la consulta y prepara el enlace de WhatsApp. */

import { crearEnlaceWhatsApp } from '../utils/formato.js';

function validarConsulta({ nombre, correo, mensaje }) {
    if (!nombre) {
        return 'Escribe tu nombre para continuar.';
    } else if (!correo) {
        return 'Escribe tu correo electrónico para continuar.';
    } else if (!mensaje) {
        return 'Escribe tu consulta para continuar.';
    }
    return '';
}

export function iniciarContacto() {
    const formulario = document.querySelector('#form-contacto');
    const estado = document.querySelector('#estado-consulta');
    const continuar = document.querySelector('#continuar-whatsapp');
    if (!formulario || !estado || !continuar) return;

    function ocultarEnlace() {
        continuar.hidden = true;
        continuar.removeAttribute('href');
    }

    formulario.addEventListener('submit', (evento) => {
        evento.preventDefault();
        const datos = new FormData(formulario);
        const consulta = {
            nombre: datos.get('nombre').trim(),
            correo: datos.get('correo').trim(),
            mensaje: datos.get('mensaje').trim()
        };

        const error = validarConsulta(consulta);
        if (error) {
            estado.textContent = error;
            ocultarEnlace();
            return;
        }

        const texto = `Hola, ComfyCat. Soy ${consulta.nombre}.\nCorreo: ${consulta.correo}\n\n${consulta.mensaje}`;
        continuar.href = crearEnlaceWhatsApp(texto);
        continuar.hidden = false;
        estado.textContent = 'Tu consulta está preparada. Abre WhatsApp para revisarla y enviarla.';
    });

    formulario.addEventListener('input', () => {
        ocultarEnlace();
        estado.textContent = '';
    });
}
