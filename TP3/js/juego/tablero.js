class Tablero {

    constructor(cols, rows, cellSize,ctx) {
        this.cols = cols;
        this.rows = rows;
        this.cellSize = cellSize;
        this.boardWidth = 0;
        this.boardHeight = 0;
        this.boardX = 0;
        this.boardY = 0;
        this.ctx = ctx;

    }

    getBoardWidth() {
        return this.boardWidth;
    }
    getBoardHeight() {
        return this.boardHeight;
    }

    setBoardWidth(cols, cellSize) {
        this.boardWidth = cols * cellSize;
    }

    setBoardHeight(rows, cellSize) {
        this.boardHeight = rows * cellSize;
    }


    setBoardX(canvasWidth) {
        this.boardX = (canvasWidth - this.getBoardWidth()) / 2;
    }

    setBoardY(canvasWidth) {
        this.boardY = (canvasWidth - this.getBoardHeight()) / 2;
    }

    drawBoard() {
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



}

