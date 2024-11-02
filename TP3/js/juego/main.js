document.addEventListener("DOMContentLoaded", () => {
    let modoJuego;

    // Seleccionar todos los elementos con la clase "modalidad-juego"
    const modos = document.querySelectorAll("#modalidad-juego");

    // Añadir un evento a cada modo para actualizar la variable modoJuego
    modos.forEach((modo) => {
        modo.addEventListener("click", () => {
            modoJuego = Number(modo.getAttribute("data-value"));
            console.log("Modalidad seleccionada:", modoJuego);
        });
    });

    let play = document.querySelector("#prueba");

    play.addEventListener("click", () => {
        if (!modoJuego) {
            console.log("Selecciona una modalidad de juego antes de iniciar.");
            return;
        }

        let canvas = document.querySelector('#canvas');
        let ctx = canvas.getContext('2d');
        let canvasWidth = canvas.width;
        let canvasHeight = canvas.height;

        // Pasar el modoJuego seleccionado al iniciar el juego
        let juego = new Juego(ctx, canvasWidth, canvasHeight, modoJuego);
        console.log(canvasWidth, canvasHeight);
        
        juego.initGame();
        juego.draw();
    });
});
