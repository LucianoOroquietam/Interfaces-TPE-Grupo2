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


});