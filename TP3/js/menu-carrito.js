document.addEventListener("DOMContentLoaded", function() {


    /* ---------------------Menu Perfil------------------------ */

const menuPerfil = document.getElementById('perfil');
const navPerfil = document.getElementById('nav-perfil');
const body = document.querySelector('.background-menu')

// Evento click sobre el icono menu hamburguesa
menuPerfil.addEventListener('click', () => {
    navPerfil.classList.toggle('nav-perfil--active'); 
    body.classList.toggle('transparent-background');
});




/* ---------------------Menu carrito------------------------ */
const menuCarrito = document.getElementById('cart-buy');
const navCarrito = document.querySelector('.cart-container');


menuCarrito.addEventListener('click', () => {
    navCarrito.classList.toggle('nav-carrito--active'); 
    body.classList.toggle('transparent-background');
})

  /* --------------------- Cerrar Menús al hacer clic fuera ------------------------ */
  document.addEventListener('click', (event) => {
    // Cerrar menú perfil si se hace clic fuera
    if (!menuPerfil.contains(event.target) && !navPerfil.contains(event.target)) {
        navPerfil.classList.remove('nav-perfil--active');
        body.classList.remove('transparent-background');
    }

    // Cerrar menú carrito si se hace clic fuera
    if (!menuCarrito.contains(event.target) && !navCarrito.contains(event.target)) {
        navCarrito.classList.remove('nav-carrito--active');
        body.classList.remove('transparent-background');
    }
});




});