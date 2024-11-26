
const menuHamburguesa = document.getElementById('menu-hamburguesa'); 
const menu = document.getElementById('menu'); 
const menuItems = menu.querySelectorAll('li');
const header = document.querySelector("header"); 
const logo = document.getElementById("logo"); 


menuHamburguesa.addEventListener('click', () => {
    // Alterna clases para activar/desactivar el menu
    menuHamburguesa.classList.toggle('activo');
    menu.classList.toggle('activo');

    if (menu.classList.contains('activo')) {
        // Si el menu esta activo, animamos los items y cambiamos el color del fondo del header
        menuItems.forEach((item, index) => {
            item.style.animation = `aparecer 0.5s forwards ${index * 0.5}s`;
            header.style.backgroundColor = "#00d1d5"; // Fondo solido
        });
    } else {
        // Si el menu se cierra y el scroll esta arriba, restauramos el fondo degradado
        if (window.scrollY <= 50) {
            header.style.background = "linear-gradient(180deg, #00d1d5, rgba(0, 209, 213, 0.12) 87.91%, rgba(1, 208, 213, 0))";
        }
        // Quitamos las animaciones de los items del menu
        menuItems.forEach((item) => {
            item.style.animation = 'none';
        });
    }
});

// Evento de scroll para ajustar el logo y el fondo del header
window.addEventListener("scroll", function () {
    // Calculamos la escala para el logo basado en el scroll
    const scaleFactor = Math.max(0.3, 1 - window.scrollY / 50);

    if (window.scrollY > 0) {
        // Si se hace scroll, reducimos el tamaño del logo
        logo.style.transform = `translate(-50%, -65%) scale(${scaleFactor})`;

        // Cambiamos el fondo del header si el menu no esta activo
        if (!menu.classList.contains('activo')) {
            header.style.backgroundColor = "#00d1d5"; 
        }
    } else {
        // Si el scroll esta en la parte superior, restauramos el logo y el fondo degradado
        logo.style.transform = `translate(-50%, 0) scale(1)`;

        if (!menu.classList.contains('activo')) {
            header.style.background = "linear-gradient(180deg, #00d1d5, rgba(0, 209, 213, 0.12) 87.91%, rgba(1, 208, 213, 0))";
        }
    }
});


const rows = document.querySelectorAll('.row'); 
const activeImage = document.getElementById("active-image"); 

// Configuramos un IntersectionObserver para detectar cuando las filas estan visibles
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Si la fila es visible, la marcamos como activa
            entry.target.classList.add('active');
            const imageSrc = entry.target.getAttribute("data-image"); 
            activeImage.style.opacity = 0; 
            setTimeout(() => {
                // Cambiamos la imagen activa con un pequeño retraso
                activeImage.src = imageSrc;
                activeImage.style.opacity = 1; // Mostramos la nueva imagen
            }, 500);

        } else {
            // Si la fila deja de ser visible, quitamos la clase activa
            entry.target.classList.remove('active');
        }
    });
}, {
    threshold: 0.5 // La fila debe estar al menos al 50% visible
});

// Observamos todas las filas con el IntersectionObserver
rows.forEach(row => observer.observe(row));
