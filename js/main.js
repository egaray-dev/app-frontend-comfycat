/* Punto de entrada de la aplicación (módulo ES).
   Cada página declara en <body> su ruta base (data-base) y su nombre (data-pagina). */

import { cargarComponentes } from './modulos/componentes.js';
import { iniciarNavegacion, marcarPaginaActual } from './modulos/navegacion.js';
import { iniciarCarrito } from './modulos/carrito.js';
import { renderizarProductos } from './modulos/productos.js';
import { iniciarContacto } from './modulos/contacto.js';
import { productos } from './datos/productos.js';

async function iniciarAplicacion() {
    const { base = './', pagina } = document.body.dataset;

    try {
        await cargarComponentes(base);
    } catch (error) {
        console.error('No se cargaron los componentes:', error);
    }

    // Navbar y carrito ya existen en el DOM: se activan sus eventos.
    marcarPaginaActual(pagina);
    iniciarNavegacion();
    const carrito = iniciarCarrito();

    // Cada página activa solo lo que necesita.
    switch (pagina) {
        case 'inicio': {
            const catalogo = document.querySelector('#lista-productos');
            const alAgregar = carrito
                ? carrito.agregar
                : () => alert('El carrito no está disponible. Recarga la página.');
            if (catalogo) renderizarProductos(catalogo, productos, alAgregar);
            break;
        }
        case 'contacto':
            iniciarContacto();
            break;
        default:
            // Nosotros y otras páginas informativas no requieren lógica extra.
            break;
    }
}

iniciarAplicacion();
