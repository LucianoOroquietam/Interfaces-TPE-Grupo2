const parallaxLayers = document.querySelectorAll('.parallax-capa');

function handleParallax() {
    const scrollY = window.scrollY;
    parallaxLayers.forEach(layer => {
        const speed = layer.dataset.speed;
        const yOffset = scrollY * (speed / 194);
        layer.style.transform = `translateY(-${yOffset}px)`;
    });
}

// se aplica el parallax despues de la animacion de entrada ya que se bugeaba y no funcionaba
parallaxLayers.forEach(layer => {
    layer.addEventListener('animationend', () => {
        window.addEventListener('scroll', handleParallax);
    });
});
