const slidesContainer = document.getElementById("slides-container");
const slides = document.querySelectorAll(".slide"); // Obtenemos todos los slides
const slide = document.querySelector(".slide");
const prevButton = document.getElementById("slide-arrow-prev");
const nextButton = document.getElementById("slide-arrow-next");

let autoScrollTimeout;

function moveToNextSlide() {

     // Obtenmos el ancho de un slide
    const slideWidth = slide.clientWidth;
   //Calcula el máximo desplazamiento permitido en el contenedor (hasta el final de los slides)
    const maxScrollLeft = slidesContainer.scrollWidth - slidesContainer.clientWidth;
    
    // Si estamos al final, volvemos al principio
    if (slidesContainer.scrollLeft >= maxScrollLeft) {
        slidesContainer.scrollLeft = 0;
    } else {
        slidesContainer.scrollLeft += slideWidth;
    }

    // Llamamos a la función automáticamente después de un tiempo
    autoScrollTimeout = setTimeout(moveToNextSlide, 3000);
}

function moveToPrevSlide() {
    const slideWidth = slide.clientWidth;

    // Si estamos al principio, vamos al final
    if (slidesContainer.scrollLeft == 0) {
        slidesContainer.scrollLeft = slidesContainer.scrollWidth - slidesContainer.clientWidth;
    } else {
        slidesContainer.scrollLeft -= slideWidth;
    }
}

nextButton.addEventListener("click", () => {
    clearTimeout(autoScrollTimeout); // Reinicia el timeout si se hace clic manual
    moveToNextSlide();
});

prevButton.addEventListener("click", () => {
    clearTimeout(autoScrollTimeout); 
    moveToPrevSlide();
});

// Iniciar el movimiento automático al cargar la página
autoScrollTimeout = setTimeout(moveToNextSlide, 3000); 

