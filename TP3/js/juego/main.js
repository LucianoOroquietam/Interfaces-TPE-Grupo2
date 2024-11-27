document.addEventListener("DOMContentLoaded", () => {
    let modoJuego;
    let fichaj1;
    let fichaj2;
    const img = document.querySelector("#prueba2");
    const boton = document.querySelector("#prueba");
    const mensajeError = document.querySelector('#mensajeError');
    const canvas = document.querySelector('#canvas');
    
    // Seleccionar todos los elementos con la clase "modalidad-juego"
    const modos = document.querySelectorAll("#modalidad-juego");

    // Añadir un evento a cada modo para actualizar la variable modoJuego
    modos.forEach((modo) => {
        modo.addEventListener("click", () => {
            modoJuego = Number(modo.getAttribute("data-value"));
        });
    });

    // Seleccionar fichas de jugador 1 y jugador 2
    const fichaJ1 = document.querySelectorAll("#ficha-j1");
    const fichaJ2 = document.querySelectorAll("#ficha-j2");

    fichaJ1.forEach((ficha) => {
        ficha.addEventListener("click", () => {
            fichaj1 = ficha.getAttribute("data-value");
        });
    });

    fichaJ2.forEach((ficha) => {
        ficha.addEventListener("click", () => {
            fichaj2 = ficha.getAttribute("data-value");
        });
    });


    
    boton.addEventListener("click", () => {
        mensajeError.innerHTML = ""; 
        
        if(!modoJuego && (!fichaj1 || !fichaj2) ){
            mensajeError.innerHTML = "Selecciona la modalidad de juego y las fichas de ambos jugadores.";
            return; 
        }

        if (!modoJuego) {
            mensajeError.innerHTML = "Selecciona una modalidad de juego antes de iniciar.";
            return;
        }

        if (!fichaj1 || !fichaj2) {
            mensajeError.innerHTML = "Selecciona fichas para ambos jugadores antes de iniciar.";
            return;
        }

        canvas.classList.remove("hidden");
        boton.classList.add("hidden");
        img.classList.add("hidden");
        

        const ctx = canvas.getContext('2d');
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;

        // Iniciar el juego con las configuraciones seleccionadas
        const juego = new Juego(ctx, canvasWidth, canvasHeight, modoJuego, fichaj1, fichaj2, canvas, boton, img);


    });
});

