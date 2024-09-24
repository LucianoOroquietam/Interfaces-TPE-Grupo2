const menuHamburguesa = document.getElementById('menu-hamburguesa');
const nav = document.querySelector('.nav');

menuHamburguesa.addEventListener('click', () => {
    nav.classList.toggle('nav--active');
});
