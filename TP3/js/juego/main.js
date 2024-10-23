document.addEventListener("DOMContentLoaded", () => {

let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d');
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;



function drawBoard(){
    const cols = 7; // Número de columnas
    const rows = 6; // Número de filas
    const cellSize = 70; // Tamaño de cada celda

    let board = new Tablero(cols,rows,cellSize,ctx);
    board.setBoardWidth(cols,cellSize);
    board.setBoardHeight(rows,cellSize);
    board.setBoardX(canvasWidth);
    board.setBoardY(canvasHeight);
    board.drawBoard();
    

}
drawBoard();

})