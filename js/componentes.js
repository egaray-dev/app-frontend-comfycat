/* Carga navbar, footer y botón de WhatsApp en cada página.
   Usar data-base="./" en index.html y data-base="../" en /paginas/.
   Requiere Live Server (fetch no funciona con file://). */
(async function () {
  const base = document.body.dataset.base || './';

  async function insertarComponente(archivo, destino) {
    const respuesta = await fetch(`${base}componentes/${archivo}`);
    if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}: ${archivo}`);
    const plantilla = await respuesta.text();
    document.querySelector(destino).innerHTML = plantilla.replaceAll('{{BASE}}', base);
  }

  try {
    await Promise.all([
      insertarComponente('navbar.html', '#componente-navbar'),
      insertarComponente('footer.html', '#componente-footer'),
      insertarComponente('boton.html', '#componente-boton')
    ]);

    // El menú ya existe: ahora sí se activa el botón hamburguesa.
    const script = document.createElement('script');
    script.src = `${base}js/navegacion.js`;
    document.body.appendChild(script);
  } catch (error) {
    console.error('No se cargaron los componentes:', error);
  }
})();
