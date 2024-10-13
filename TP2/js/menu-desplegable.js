

const menuHamburguesa = document.getElementById('menu-hamburguesa');
//const menuEquis = document.getElementById('menu-equis');
const menuCarrito = document.getElementById('cart-buy');
const nav = document.querySelector('.nav');
const navItems = document.querySelectorAll('.nav__item a'); // Seleccionamos los enlaces dentro del menu
const body = document.querySelector('.background-menu')

// Evento click sobre el icono menu hamburguesa
menuHamburguesa.addEventListener('click', () => {
    menuHamburguesa.classList.toggle('menu-desplegable--active')
    nav.classList.toggle('nav--active'); 
    body.classList.toggle('transparent-background');
});


menuCarrito.addEventListener('click', () =>{
    menuCarrito.classList.toggle('btn-play-container');
    nav.classList.toggle();
} )

// cerrar menu desplegable cuando hacemos click por fuera
document.addEventListener('click', (event) => {
    if (!nav.contains(event.target) && !menuHamburguesa.contains(event.target)) {
        nav.classList.remove('nav--active');
        body.classList.remove('transparent-background');
    }
});

// cerrar menu cuando navegamos hacia un enlace interno (ancla)
navItems.forEach(item => {
    item.addEventListener('click', () => {
        nav.classList.remove('nav--active'); 
        body.classList.remove('transparent-background');
    });
});
