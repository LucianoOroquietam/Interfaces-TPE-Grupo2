// Seleccionamos todos los carruseles
const carruseles = document.querySelectorAll(".carrusel-wrapper");

carruseles.forEach((carrusel) => {
    const rightBtn = carrusel.querySelector(".scrolling-buttons-container span:nth-child(1)");
    const leftBtn = carrusel.querySelector(".scrolling-buttons-container span:nth-child(2)");
    const content = carrusel.nextElementSibling;
    const cardWidth = content.querySelector(".scrolling-card").offsetWidth;


    const scrollRight = () => {
        const maxScrollLeft = content.scrollWidth - content.clientWidth; // Máximo desplazamiento horizontal
        if (content.scrollLeft + cardWidth >= maxScrollLeft) {
            content.scrollLeft = maxScrollLeft;
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
