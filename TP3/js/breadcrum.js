const modalidades = document.querySelectorAll('.modalidad-juego');
const breadcrumbGameMode = document.querySelector('.breadcrum__four-in-line');

modalidades.forEach(modalidad => {
    modalidad.addEventListener('click', (event) => {
        // aca obtenemos el valor de la modalidad seleccionada desde data-value de los parrafos
        const selectedMode = event.target.getAttribute('data-value');
        
        // actualiza el texto del breadcrum
        breadcrumbGameMode.textContent = `${selectedMode} en linea`;
    });
});
