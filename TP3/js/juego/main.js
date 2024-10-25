document.addEventListener("DOMContentLoaded", () => {

let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d');
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;



function drawBoard(){
    const cols = 7; // Número de columnas
    const rows = 6; // Número de filas
    const cellSize = 70; // Tamaño de cada celda
    let backgroundImageSrc = './../../img/4enlinea.png';

    console.log(backgroundImageSrc)
    let board = new Tablero(cols,rows,cellSize,ctx,backgroundImageSrc);

    board.setBoardX(canvasWidth);
    board.setBoardY(canvasHeight);

}
drawBoard();


function drawChip() {

    let ficha = new Ficha(50, 50, ctx, '', { x: 50, y: 50 }, 'Jugador 1'); 

    ficha.draw();

    // Agregar un evento de clic para mover la ficha cuando se haga click
    canvas.addEventListener("click", (evento) => {
        const rect = canvas.getBoundingClientRect();
        const x = evento.clientX - rect.left;
        const y = evento.clientY - rect.top;

       
        if (ficha.clickedMe(x, y)) {
            console.log("Ficha clickeada!");

            // Cambiar la posición de la ficha al lugar del clic
           // ficha.setPosition(x, y);
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            drawBoard(); 
            ficha.draw(); 
        }
    });
}

drawChip(); 






})