const menuHamburguesa = document.getElementById('menu-hamburguesa');
const menu = document.getElementById('menu');
const menuItems = menu.querySelectorAll('li');

menuHamburguesa.addEventListener('click', () => {
    menuHamburguesa.classList.toggle('activo');
    menu.classList.toggle('activo');

    // Añadir animación a cada ítem al abrir el menú
    if (menu.classList.contains('activo')) {
        menuItems.forEach((item, index) => {
            item.style.animation = `aparecer 0.5s forwards ${index + 0.5}s`;
        });
    } else {
        // Remover animación al cerrar el menú
        menuItems.forEach((item) => {
            item.style.animation = 'none';
        });
    }
});

window.addEventListener("scroll", function() {
    const header = document.querySelector("header");
    const logo = document.getElementById("logo");

    if (window.scrollY > 50) {
        logo.classList.add("shrink-logo");
        header.style.backgroundColor = "#00d1d5";
    } else {
        logo.classList.remove("shrink-logo");
        header.style.background = "linear-gradient(180deg, #00d1d5, rgba(0, 209, 213, 0.12) 87.91%, rgba(1, 208, 213, 0))";
    }
});




