# ComfyCat: landing page

Tienda virtual de muebles para gatos hecha con HTML, CSS y JavaScript moderno (módulos ES), sin frameworks.

## Cómo ejecutarla

Los módulos ES y `fetch` no funcionan si abres el archivo directamente (`file://`). Sirve la carpeta con un servidor local:

- VS Code: clic derecho en `index.html` y luego **Open with Live Server**.
- Terminal: `python3 -m http.server 8000` y abre <http://localhost:8000>.

## Estructura

```text
index.html, paginas/      Páginas (cada <body> declara data-base y data-pagina)
componentes/              Navbar, footer y botón de WhatsApp compartidos
css/                      Estilos, animaciones y responsive
js/
├── main.js               Punto de entrada: carga componentes y activa cada página
├── config.js             Constantes compartidas (WhatsApp, límite por producto)
├── datos/productos.js    Catálogo de productos (arreglo de objetos)
├── modulos/
│   ├── componentes.js    Inserta navbar, footer y botón con fetch
│   ├── navegacion.js     Menú hamburguesa y enlace de la página actual
│   ├── productos.js      Crea las tarjetas del catálogo en el DOM
│   ├── carrito.js        Estado y lógica del carrito
│   └── contacto.js       Validación del formulario de contacto
└── utils/formato.js      Formato de soles y enlaces de WhatsApp
```

## Requisitos del curso

| Requisito | Dónde se cumple |
|---|---|
| JavaScript moderno | Módulos ES (`import`/`export`), `async`/`await`, `fetch`, funciones flecha, plantillas de texto, desestructuración, `?.` y `??`. |
| Captura y manipulación del DOM | `querySelector`, `createElement`, `append`, `replaceChildren` y `classList` en `modulos/productos.js` y `modulos/carrito.js`. `aria-current` se asigna desde `modulos/navegacion.js`. |
| `if` / `else if` / `switch` | `switch` por página en `main.js` y por acción (+, −, eliminar) en `carrito.js` (`aplicarAccion`). `if`/`else if` en `agregar` y `cambiarCantidad` de `carrito.js` y en `validarConsulta` de `contacto.js`. |
| `addEventListener` | Eventos `click`, `input`, `change`, `submit` y `keydown`, y `change` de `matchMedia`, en todos los módulos. |
| Código modular | Un módulo por responsabilidad, sin variables globales. Los datos (`datos/`), la configuración (`config.js`) y las utilidades (`utils/`) están separados. |
| Resultados en el navegador | Carpeta [`capturas/`](capturas/). |

## Capturas

| Archivo | Muestra |
|---|---|
| `01-inicio.png` | Portada con el enlace "Inicio" marcado como página actual |
| `02-catalogo.png` | Tarjetas generadas desde `datos/productos.js` |
| `03-carrito.png` | Carrito con productos, contador de unidades y total |
| `04-contacto-error.png` | Formulario con un campo vacío |
| `05-contacto-listo.png` | Consulta validada y lista para WhatsApp |
| `06-menu-movil.png` | Menú hamburguesa abierto en vista móvil |
