// Seleccionamos todos los carruseles
const carruseles = document.querySelectorAll(".carrusel-wrapper");

carruseles.forEach((carrusel) => {
    // Obtenemos los botones y el contenedor del carrusel específico
   const rightBtn = carrusel.querySelector(".scrolling-buttons-container span:nth-child(2)"); // Botón derecho
   const leftBtn = carrusel.querySelector(".scrolling-buttons-container span:nth-child(1)"); // Botón izquierdo
    const content = carrusel.nextElementSibling; // El contenedor de las tarjetas
    const cardWidth = content.querySelector(".scrolling-card").offsetWidth; // Ancho de una tarjeta

    const scrollRight = () => {
        const maxScrollLeft = content.scrollWidth - content.clientWidth; // Máximo desplazamiento horizontal
        if (content.scrollLeft + cardWidth >= maxScrollLeft) {
            content.scrollLeft = maxScrollLeft;
            content.scrollLeft = 0;
            content.classList.add("skew1");
            setTimeout(() => {
                content.classList.remove("skew1");
            }, 350);
        } else {
            content.classList.add("skew1");
            setTimeout(() => {
                content.classList.remove("skew1");
            }, 350);
            content.scrollLeft += cardWidth;
        }
    };


    const scrollLeft = () => {
        if (content.scrollLeft - cardWidth <= 0) {
            content.scrollLeft = 0;
        } else {
            content.classList.add("skew1");
            setTimeout(() => {
                content.classList.remove("skew1");
            }, 350);
            content.scrollLeft -= cardWidth;
        }
    };


    rightBtn.addEventListener("click", scrollRight);
    leftBtn.addEventListener("click", scrollLeft);
});
