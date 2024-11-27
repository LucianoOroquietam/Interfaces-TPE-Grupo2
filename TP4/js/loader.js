function simulateLoading() {
    const loader = document.querySelector('.loader');
    const progressBarFilled = document.querySelector('.progress-bar-filled');
    let progress = 0;
    const hero = document.querySelector('.hero');  
    document.body.style.overflow = 'hidden';

    const interval = setInterval(() => {
        progress += 1; 
        progressBarFilled.style.width = `${progress}%`;  

        if (progress >= 100) {
            clearInterval(interval);
            progressBarFilled.style.width = '100%';

            // Cuando la barra de carga llega al 100%, muestra el hero inmediatamente
            loader.style.opacity = '0'; 

            // Esto elimina el loader inmediatamente, sin demora
            setTimeout(() => {
                loader.style.display = 'none';  
                hero.style.display = 'block';
                document.body.style.overflow = '';
            }, 200); // tuve que ajustar este valor para que el contenido(hero) se vea más rápido
        }
    }, 30); // El intervalo es de 30ms para un movimiento más fluido y constante
}

window.addEventListener('load', () => {
    simulateLoading();
});
