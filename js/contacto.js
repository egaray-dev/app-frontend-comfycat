const formulario = document.querySelector('#form-contacto');
const estado = document.querySelector('#estado-consulta');
const continuar = document.querySelector('#continuar-whatsapp');

formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const datos = new FormData(formulario);
    const nombre = datos.get('nombre').trim();
    const correo = datos.get('correo').trim();
    const mensaje = datos.get('mensaje').trim();
    if (!nombre || !mensaje) {
        estado.textContent = 'Escribe tu nombre y tu consulta para continuar.';
        continuar.hidden = true;
        return;
    }
    const texto = `Hola, ComfyCat. Soy ${nombre}.\nCorreo: ${correo}\n\n${mensaje}`;
    continuar.href = `https://wa.me/51915920230?text=${encodeURIComponent(texto)}`;
    continuar.hidden = false;
    estado.textContent = 'Tu consulta está preparada. Abre WhatsApp para revisarla y enviarla.';
});

formulario.addEventListener('input', () => {
    continuar.hidden = true;
    continuar.removeAttribute('href');
    estado.textContent = '';
});
