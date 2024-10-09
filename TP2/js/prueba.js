// Seleccionamos todos los carruseles
const carrousels = document.querySelectorAll('.carrousel');

// Iteramos sobre cada carrusel para agregar funcionalidad individual
carrousels.forEach((carrousel, index) => {
    const container = carrousel.querySelector('.carrousel__container');
    const prevButton = carrousel.querySelector('.carrousel__slide-arrow-prev');
    const nextButton = carrousel.querySelector('.carrousel__slide-arrow-next');
    const slides = carrousel.querySelectorAll('.carrousel_slide'); // Imágenes en el carrusel actual
    let slideIndex = 0;
    const totalSlides = slides.length;

    // Función para mostrar el slide actual del carrusel actual
    function showSlide(index) {
        const slideWidth = slides[0].clientWidth; // Anchura de la imagen
        container.style.transform = `translateX(${-index * slideWidth}px)`; // Desplazamiento
    }

    // Evento para el botón "siguiente" del carrusel actual
    nextButton.addEventListener('click', () => {
        slideIndex = (slideIndex + 1) % totalSlides; // Aumenta el índice y bucle
        showSlide(slideIndex);
    });

    // Evento para el botón "anterior" del carrusel actual
    prevButton.addEventListener('click', () => {
        slideIndex = (slideIndex - 1 + totalSlides) % totalSlides; // Disminuye el índice y bucle
        showSlide(slideIndex);
    });
});
