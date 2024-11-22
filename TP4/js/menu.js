const menuHamburguesa = document.getElementById('menu-hamburguesa');
const menu = document.getElementById('menu');
const menuItems = menu.querySelectorAll('li');
const header = document.querySelector("header");
const logo = document.getElementById("logo");

menuHamburguesa.addEventListener('click', () => {
    menuHamburguesa.classList.toggle('activo');
    menu.classList.toggle('activo');

    if (menu.classList.contains('activo')) {
        menuItems.forEach((item, index) => {
            item.style.animation = `aparecer 0.5s forwards ${index + 0.1} s`;
            header.style.backgroundColor = "#00d1d5";
        });
    } else {
        if (window.scrollY <= 50) {
            header.style.background = "linear-gradient(180deg, #00d1d5, rgba(0, 209, 213, 0.12) 87.91%, rgba(1, 208, 213, 0))";
        }
        menuItems.forEach((item) => {
            item.style.animation = 'none';
        });
    }
});

window.addEventListener("scroll", function () {
    const scaleFactor = Math.max(0.3, 1 - window.scrollY / 50);

    if (window.scrollY > 0) {
        logo.style.transform = `translate(-50%, -65%) scale(${scaleFactor})`;

        if (!menu.classList.contains('activo')) {
            header.style.backgroundColor = "#00d1d5";
        }
    } else {
        logo.style.transform = `translate(-50%, 0) scale(1)`;

        if (!menu.classList.contains('activo')) {
            header.style.background = "linear-gradient(180deg, #00d1d5, rgba(0, 209, 213, 0.12) 87.91%, rgba(1, 208, 213, 0))";
        }
    }
});


const rows = document.querySelectorAll('.row');
const activeImage = document.getElementById("active-image");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            const imageSrc = entry.target.getAttribute("data-image");
            activeImage.style.opacity = 0;
            setTimeout(() => {
                activeImage.src = imageSrc;
                activeImage.style.opacity = 1;
            }, 500)

        } else {

            entry.target.classList.remove('active');

        }
    });
}, {
    threshold: 0.5
});

rows.forEach(row => observer.observe(row));



