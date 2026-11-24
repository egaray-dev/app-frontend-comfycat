/* Funciones auxiliares sin estado, reutilizables en cualquier módulo. */

import { NUMERO_WHATSAPP } from '../config.js';

export function formatearSoles(monto) {
    return `S/ ${monto.toFixed(2)}`;
}

export function crearEnlaceWhatsApp(texto) {
    return `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(texto)}`;
}
