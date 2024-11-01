document.addEventListener("DOMContentLoaded", () => {

    let canvas = document.querySelector('#canvas');
    let ctx = canvas.getContext('2d');
    let canvasWidth = canvas.width;
    let canvasHeight = canvas.height;

    let juego = new Juego(ctx, canvasWidth, canvasHeight, 4);
    
    juego.initGame();
    juego.draw();


});
