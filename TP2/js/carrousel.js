const rightBtn = document.querySelector("#scrolling-button-right");
const leftBtn = document.querySelector("#scrolling-button-left");
const content = document.querySelector(".scrolling-container");
const cardWidth = document.querySelector(".scrolling-card").offsetWidth; // Ancho de una card

rightBtn.addEventListener("click", () => {
    const maxScrollLeft = content.scrollWidth - content.clientWidth; // Máximo desplazamiento horizontal

    // Si llegamos al final, volvemos al principio
    if (content.scrollLeft + cardWidth >= maxScrollLeft) {
        content.scrollLeft = 0; // Vuelve al principio
    } else {
        content.scrollLeft += cardWidth; // Desplazamos una card a la derecha
    }
});
leftBtn.addEventListener("click", () => {
    if (content.scrollLeft - cardWidth <= 0) {
        content.scrollLeft = 0; // Si estamos al principio, mantenemos el scroll en el inicio
    } else {
        content.scrollLeft -= cardWidth; // Desplazamos una card a la izquierda
    }
});
