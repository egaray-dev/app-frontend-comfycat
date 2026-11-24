/* Construye las tarjetas del catálogo a partir de los datos. */

import { formatearSoles } from '../utils/formato.js';

function crearTarjeta(producto, alAgregar) {
    const tarjeta = document.createElement('article');
    tarjeta.classList.add('product-card');

    const contenedorImagen = document.createElement('div');
    contenedorImagen.classList.add('product-image');

    const imagen = document.createElement('img');
    imagen.src = producto.imagen;
    imagen.alt = producto.nombre;
    imagen.loading = 'lazy';
    contenedorImagen.append(imagen);

    const info = document.createElement('div');
    info.classList.add('product-info');

    const titulo = document.createElement('h3');
    titulo.textContent = producto.nombre;

    const precio = document.createElement('p');
    precio.classList.add('price');
    precio.textContent = `Desde ${formatearSoles(producto.precio)}`;

    const boton = document.createElement('button');
    boton.type = 'button';
    boton.classList.add('boton', 'btn-add-cart');
    boton.textContent = 'Agregar al carrito';
    boton.addEventListener('click', () => alAgregar(producto));

    info.append(titulo, precio, boton);
    tarjeta.append(contenedorImagen, info);
    return tarjeta;
}

export function renderizarProductos(contenedor, productos, alAgregar) {
    const fragmento = document.createDocumentFragment();
    productos.forEach((producto) => fragmento.append(crearTarjeta(producto, alAgregar)));
    contenedor.replaceChildren(fragmento);
}
