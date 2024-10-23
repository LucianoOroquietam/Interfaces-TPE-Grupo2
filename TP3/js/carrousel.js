// Seleccionamos todos los carruseles
const carruseles = document.querySelectorAll(".carrusel-wrapper");

carruseles.forEach((carrusel) => {

    const rightBtn = carrusel.querySelector(".scrolling-buttons-container span:nth-child(2)");
    const leftBtn = carrusel.querySelector(".scrolling-buttons-container span:nth-child(1)");
    const content = carrusel.nextElementSibling;
    const cardWidth = content.querySelector(".scrolling-card").offsetWidth;

    const scrollRight = () => {
        const maxScrollLeft = content.scrollWidth - content.clientWidth;
        if (content.scrollLeft + cardWidth >= maxScrollLeft) {
            content.scrollLeft = maxScrollLeft;
            if (content.scrollLeft >= maxScrollLeft) {
                content.scrollLeft = 0;
            }
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
