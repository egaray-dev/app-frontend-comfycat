/* Carrito de compras ComfyCat.
   El estado vive dentro de iniciarCarrito(); hacia afuera solo se expone agregar(). */

import { LIMITE_CANTIDAD } from '../config.js';
import { formatearSoles, crearEnlaceWhatsApp } from '../utils/formato.js';

function avisarPedidoPorMayor() {
    alert(
        '¡Gracias por tu interés en ComfyCat!\n\n' +
        `Para pedidos superiores a ${LIMITE_CANTIDAD} unidades por producto, ` +
        'te invitamos a contactar con nuestro asesor de ventas.\n\n' +
        'Recibirás atención personalizada y una cotización especial.'
    );
}

function esCantidadEntera(valor) {
    return /^\d+$/.test(valor);
}

export function iniciarCarrito() {
    const seccion = document.querySelector('#carrito');
    const botonCarrito = document.querySelector('#cart-toggle');
    const panel = document.querySelector('#cart-panel');
    const contador = document.querySelector('#cart-count');
    const lista = document.querySelector('#cart-items');
    const elementoTotal = document.querySelector('#cart-total');
    const botonWhatsApp = document.querySelector('#btn-whatsapp');

    // Si la página no tiene carrito, no se activa nada.
    if (!seccion || !botonCarrito || !panel || !contador || !lista || !elementoTotal || !botonWhatsApp) {
        return null;
    }

    const carrito = [];

    // ---------- Cálculos ----------

    const calcularTotal = () =>
        carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);

    const contarUnidades = () =>
        carrito.reduce((total, item) => total + item.cantidad, 0);

    // ---------- Panel ----------

    function abrirCarrito(abierto) {
        panel.hidden = !abierto;
        botonCarrito.setAttribute('aria-expanded', String(abierto));
    }

    // ---------- Renderizado ----------

    function crearFila(item, indice) {
        const fila = document.createElement('div');
        fila.classList.add('cart-item');

        fila.innerHTML = `
            <div class="cart-item-info">
                <h3></h3>
                <p>Precio: ${formatearSoles(item.precio)}</p>
                <p>Subtotal: ${formatearSoles(item.precio * item.cantidad)}</p>
            </div>
            <div class="cart-controls">
                <button type="button" class="btn-decrease" data-accion="disminuir" data-indice="${indice}" aria-label="Quitar uno">−</button>
                <input type="text" inputmode="numeric" class="cart-quantity"
                    data-indice="${indice}" value="${item.cantidad}" aria-label="Cantidad">
                <button type="button" class="btn-increase" data-accion="aumentar" data-indice="${indice}" aria-label="Agregar uno">+</button>
                <button type="button" class="btn-remove" data-accion="eliminar" data-indice="${indice}">Eliminar</button>
            </div>
        `;

        // El nombre se escribe como texto, nunca como HTML.
        fila.querySelector('h3').textContent = item.nombre;
        fila.querySelectorAll('[aria-label]').forEach((control) => {
            control.setAttribute('aria-label', `${control.getAttribute('aria-label')}: ${item.nombre}`);
        });

        return fila;
    }

    function renderizar() {
        const unidades = contarUnidades();
        contador.textContent = unidades;
        contador.hidden = unidades === 0;
        botonCarrito.setAttribute('aria-label', `Carrito, ${unidades} unidades`);
        elementoTotal.textContent = formatearSoles(calcularTotal());

        if (carrito.length === 0) {
            lista.innerHTML = '<p class="cart-empty">Tu carrito está vacío.</p>';
            return;
        }

        lista.replaceChildren(...carrito.map(crearFila));
    }

    // ---------- Acciones ----------

    function agregar(producto) {
        if (!producto?.nombre || !Number.isFinite(producto.precio) || producto.precio <= 0) {
            alert('No se pudo agregar este producto. Revisa sus datos.');
            return;
        }

        const existente = carrito.find((item) => item.id === producto.id);

        if (existente && existente.cantidad >= LIMITE_CANTIDAD) {
            avisarPedidoPorMayor();
            return;
        } else if (existente) {
            existente.cantidad++;
        } else {
            carrito.push({ id: producto.id, nombre: producto.nombre, precio: producto.precio, cantidad: 1 });
        }

        renderizar();
        abrirCarrito(true);
    }

    function aplicarAccion(accion, indice) {
        const item = carrito[indice];
        if (!item) return;

        switch (accion) {
            case 'aumentar':
                if (item.cantidad >= LIMITE_CANTIDAD) {
                    avisarPedidoPorMayor();
                    return;
                }
                item.cantidad++;
                break;

            case 'disminuir':
                item.cantidad--;
                if (item.cantidad === 0) carrito.splice(indice, 1);
                break;

            case 'eliminar':
                carrito.splice(indice, 1);
                break;

            default:
                return;
        }

        renderizar();
    }

    function cambiarCantidad(indice, valor) {
        if (!carrito[indice]) {
            renderizar();
            return;
        }

        if (!esCantidadEntera(valor) || Number(valor) < 1) {
            alert(`Ingresa una cantidad válida entre 1 y ${LIMITE_CANTIDAD}.`);
        } else if (Number(valor) > LIMITE_CANTIDAD) {
            avisarPedidoPorMayor();
        } else {
            carrito[indice].cantidad = Number(valor);
        }

        renderizar();
    }

    function crearMensajePedido() {
        const lineas = carrito.map((item) =>
            `${item.nombre} - Cantidad: ${item.cantidad} - Subtotal: ${formatearSoles(item.precio * item.cantidad)}`
        );

        return [
            'Hola ComfyCat, deseo realizar el siguiente pedido:',
            '',
            ...lineas,
            '',
            `TOTAL: ${formatearSoles(calcularTotal())}`,
            '',
            'Quedo atento a su confirmación. Gracias.'
        ].join('\n');
    }

    // ---------- Eventos ----------

    botonCarrito.addEventListener('click', () => abrirCarrito(panel.hidden));

    // composedPath() conserva la ruta original del clic aunque el botón
    // presionado se haya redibujado; así el panel no se cierra al usar + o −.
    document.addEventListener('click', (evento) => {
        const ruta = evento.composedPath();
        const dentroDelCarrito = ruta.includes(seccion);
        const agregaProducto = ruta.some((nodo) => nodo.classList?.contains('btn-add-cart'));
        if (dentroDelCarrito || agregaProducto || panel.hidden) return;

        if (panel.contains(document.activeElement)) botonCarrito.focus();
        abrirCarrito(false);
    });

    document.addEventListener('keydown', (evento) => {
        if (evento.key === 'Escape' && !panel.hidden) {
            abrirCarrito(false);
            botonCarrito.focus();
        }
    });

    lista.addEventListener('click', (evento) => {
        const boton = evento.target.closest('button[data-accion]');
        if (!boton) return;

        const { accion } = boton.dataset;
        const indice = Number(boton.dataset.indice);
        aplicarAccion(accion, indice);

        // Mantener el foco en el mismo control tras redibujar la lista.
        const mismoBoton = lista.querySelector(`[data-accion="${accion}"][data-indice="${indice}"]`);
        (mismoBoton ?? botonWhatsApp).focus();
    });

    // Detectar pedidos por mayor mientras se escribe, incluso al pegar.
    lista.addEventListener('input', (evento) => {
        const campo = evento.target;
        if (!campo.classList.contains('cart-quantity')) return;

        const valor = campo.value.trim();
        if (esCantidadEntera(valor) && Number(valor) > LIMITE_CANTIDAD) {
            avisarPedidoPorMayor();
            renderizar();
        }
    });

    lista.addEventListener('change', (evento) => {
        const campo = evento.target;
        if (!campo.classList.contains('cart-quantity')) return;
        cambiarCantidad(Number(campo.dataset.indice), campo.value.trim());
    });

    botonWhatsApp.addEventListener('click', () => {
        if (carrito.length === 0) {
            alert('Tu carrito está vacío. Agrega algún producto primero.');
            return;
        }
        window.open(crearEnlaceWhatsApp(crearMensajePedido()), '_blank', 'noopener');
    });

    renderizar();

    return { agregar };
}
