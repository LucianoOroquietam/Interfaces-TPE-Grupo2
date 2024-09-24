

const menuHamburguesa = document.getElementById('menu-hamburguesa');
const menuCarrito = document.getElementById('cart-buy');
const nav = document.querySelector('.nav');
const navItems = document.querySelectorAll('.nav__item a'); // Seleccionamos los enlaces dentro del menu

// Evento click sobre el icono menu hamburguesa
menuHamburguesa.addEventListener('click', () => {
    nav.classList.toggle('nav--active'); 
});


// cerrar menu desplegable cuando hacemos click por fuera
document.addEventListener('click', (event) => {
    if (!nav.contains(event.target) && !menuHamburguesa.contains(event.target)) {
        nav.classList.remove('nav--active');
    }
});

// cerrar menu cuando navegamos hacia un enlace interno (ancla)
navItems.forEach(item => {
    item.addEventListener('click', () => {
        nav.classList.remove('nav--active'); 
    });
});
