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
            item.style.animation = `aparecer 0.5s forwards ${index + 0.1}s`;
            header.style.backgroundColor = "#00d1d5";
        });
    } else {
        header.style.background = "linear-gradient(180deg, #00d1d5, rgba(0, 209, 213, 0.12) 87.91%, rgba(1, 208, 213, 0))";
        menuItems.forEach((item) => {
            item.style.animation = 'none';
        });
    }
});

window.addEventListener("scroll", function() {
    
    if (window.scrollY > 50) {
        logo.classList.add("shrink-logo");
        if (!menu.classList.contains('activo')) {
            header.style.backgroundColor = "#00d1d5";
        }
    } else {
        logo.classList.remove("shrink-logo");
        if (!menu.classList.contains('activo')) {
            header.style.background = "linear-gradient(180deg, #00d1d5, rgba(0, 209, 213, 0.12) 87.91%, rgba(1, 208, 213, 0))";
        }
    }
});

const rows = document.querySelectorAll('.row');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Agregar la clase 'active' para animar la fila visible
      entry.target.classList.add('active');

      // Remover la clase 'active' de las otras filas
      /*rows.forEach(row => {
        if (row !== entry.target) {
          row.classList.remove('active');
        }
      });*/
    } else {
      
        entry.target.classList.remove('active');
      
    }
  });
}, {
  threshold: 0.5 // Disparar cuando el 50% del elemento está en vista
});

// Observar cada fila
rows.forEach(row => observer.observe(row));




