document.addEventListener("DOMContentLoaded", () => {

    let canvas = document.querySelector('#canvas');
    let ctx = canvas.getContext('2d');
    let canvasWidth = canvas.width;
    let canvasHeight = canvas.height;

    let board = new Tablero(7, 6, 70, ctx, '././img/ImgCelda.svg');
    board.setBoardX(canvasWidth);
    board.setBoardY(canvasHeight);
    board.createCells();

    let ficha = new Ficha(50, 50, ctx, '', { x: 50, y: 50 }, 'Jugador 1', board);


    function draw() {
    
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        board.drawBoard();

        ficha.draw();

        ficha.drawTokens();
    }


    draw();

    

    // prueba de ficha
    canvas.addEventListener("click", (evento) => {
        const rect = canvas.getBoundingClientRect();
        const x = evento.clientX - rect.left;
        const y = evento.clientY - rect.top;

        if (ficha.clickedMe(x, y)) {
            console.log("Ficha clickeada!");

            
            ficha.setPosition(x, y);
            draw(); 
        }
    });


});
