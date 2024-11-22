const parallaxLayers = document.querySelectorAll('.parallax-capa');

function handleParallax() {
    const scrollY = window.scrollY; 
    parallaxLayers.forEach(layer => {
        const speed = layer.dataset.speed; // Obtiene el valor de velocidad de la capa desde el atributo data-speed
        const yOffset = scrollY * (speed / 194); // Calcula el desplazamiento vertical basado en el scroll y la velocidad
        layer.style.transform = `translateY(-${yOffset}px)`; // Aplica una transformacion en el eje Y para mover la capa
    });
}

// se aplica el parallax despues de la animacion de entrada ya que se bugeaba y no funcionaba
parallaxLayers.forEach(layer => {
    layer.addEventListener('animationend', () => {
        window.addEventListener('scroll', handleParallax);
    });
});


document.addEventListener("mousemove", (e) => {
    const { clientX, clientY } = e; // Posición del mouse
    const width = window.innerWidth;
    const height = window.innerHeight;
    const div = document.querySelector(".descarga");
    const imgDescarga = document.querySelector(".img-descarga");

    // Obtener las coordenadas del elemento
    const rect = div.getBoundingClientRect();

    // Verificar si el mouse está dentro del elemento
    if (
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom
    ) {
        const depth = 2; // Controla la profundidad del efecto parallax
        const movementX = -(clientX / width - 0.5) * depth * 30; // Mov horizontal invertido
        const movementY = -(clientY / height - 0.5) * depth * 30; // Mov vertical invertido
        imgDescarga.style.transform = `translate(${movementX}px, ${movementY}px) scale(1.05)`; // Escalado
        imgDescarga.style.transition = "transform 0.1s ease-out"; // Suavizar animación
    } else {
        // Restablecer posición y escala de la imagen
        imgDescarga.style.transform = "translate(0, 0) scale(1)";
        imgDescarga.style.transition = "transform 0.3s ease-out"; // Suavizar al volver
    }
})