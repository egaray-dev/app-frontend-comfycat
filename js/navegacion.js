const navegacion = document.querySelector('nav');
const botonMenu = navegacion.querySelector('.menu-toggle');
const menuPrincipal = navegacion.querySelector('#menu-principal');
const vistaMovil = window.matchMedia('(max-width: 768px)');

function cambiarMenu(abierto) {
    botonMenu.setAttribute('aria-expanded', String(abierto));
    botonMenu.setAttribute('aria-label', abierto ? 'Cerrar menú' : 'Abrir menú');
    navegacion.classList.toggle('menu-abierto', abierto);
}

navegacion.classList.add('menu-interactivo');

botonMenu.addEventListener('click', () => {
    cambiarMenu(botonMenu.getAttribute('aria-expanded') !== 'true');
});

menuPrincipal.addEventListener('click', (evento) => {
    if (evento.target.closest('a') && vistaMovil.matches) {
        cambiarMenu(false);
        botonMenu.focus();
    }
});

document.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape' && botonMenu.getAttribute('aria-expanded') === 'true') {
        cambiarMenu(false);
        botonMenu.focus();
    }
});

document.addEventListener('click', (evento) => {
    if (!navegacion.contains(evento.target)) cambiarMenu(false);
});

vistaMovil.addEventListener('change', () => {
    const focoEnBoton = document.activeElement === botonMenu;
    const focoEnMenu = menuPrincipal.contains(document.activeElement);
    cambiarMenu(false);
    if (vistaMovil.matches && focoEnMenu) botonMenu.focus();
    if (!vistaMovil.matches && focoEnBoton) menuPrincipal.querySelector('a').focus();
});
