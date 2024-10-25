class Tablero {

    constructor(cols, rows, cellSize,ctx, backgroundImageSrc) {
        this.cols = cols;
        this.rows = rows;
        this.cellSize = cellSize;
        this.boardWidth = cols * cellSize;;
        this.boardHeight = rows * cellSize;
        this.boardX = 0;
        this.boardY = 0;
        this.ctx = ctx;
        this.backgroundImage = new Image();
        this.backgroundImage.src = backgroundImageSrc; 

        // Esperar a que la imagen se cargue antes de dibujar el tablero
        this.backgroundImage.onload = () => {
            this.drawBoard();  // Llamar a drawBoard solo cuando la imagen este cargada
        };
    }

    getBoardWidth() {
        return this.boardWidth;
    }
    getBoardHeight() {
        return this.boardHeight;
    }

    setBoardWidth(boardWidth) {
        this.boardWidth = boardWidth;
    }

    setBoardHeight(boardHeight) {
        this.boardHeight = boardHeight;
    }


    setBoardX(canvasWidth) {
        this.boardX = (canvasWidth - this.boardWidth) / 2;
    }

    setBoardY(canvasWidth) {
        this.boardY = (canvasWidth - this.boardHeight) / 2;
    }

    drawBoard() {
        this.ctx.drawImage(this.backgroundImage, this.boardX, this.boardY, this.boardWidth, this.boardHeight);
    }
    
    /*   drawBoard() {
        this.ctx.fillStyle = "#FFCB01"; // Color azul para el tablero
        this.ctx.fillRect(this.boardX, this.boardY, this.boardWidth, this.boardHeight);
        // Dibujar los círculos
        const circleRadius = this.cellSize / 2 - 5;
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                this.ctx.beginPath();
                this.ctx.arc(
                    this.boardX + col * this.cellSize + this.cellSize / 2, // Posición x del centro del círculo
                    this.boardY + row * this.cellSize + this.cellSize / 2, // Posición y del centro del círculo
                    circleRadius,                            
                    0, Math.PI * 2
                );
                this.ctx.fillStyle = "#383234"; 
                this.ctx.fill();
                this.ctx.closePath();
            }
        }

    }

*/

}

