/* Inserta navbar, footer y botón de WhatsApp compartidos en cada página.
   Requiere un servidor local (fetch no funciona con file://). */

async function insertarComponente(base, archivo, destino) {
    const respuesta = await fetch(`${base}componentes/${archivo}`);
    if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}: ${archivo}`);
    const plantilla = await respuesta.text();
    document.querySelector(destino).innerHTML = plantilla.replaceAll('{{BASE}}', base);
}

export function cargarComponentes(base) {
    return Promise.all([
        insertarComponente(base, 'navbar.html', '#componente-navbar'),
        insertarComponente(base, 'footer.html', '#componente-footer'),
        insertarComponente(base, 'boton.html', '#componente-boton')
    ]);
}
