class Tablero {

    constructor(cols, rows, cellSize, ctx, svgSrc) {
        this.cols = cols;
        this.rows = rows;
        this.cellSize = cellSize;
        this.boardWidth = cols * cellSize;;
        this.boardHeight = rows * cellSize;
        this.boardX = 0;
        this.boardY = 0;
        this.ctx = ctx;
        this.cells = [];
        this.svgSrc = svgSrc;   
    }

    createCells() {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                const cell = new Cell({
                    x: this.boardX + col * this.cellSize,
                    y: this.boardY + row * this.cellSize,
                    size: this.cellSize,
                    svgSrc: this.svgSrc  // Pasamos el SVG para cada celda
                });
                this.cells.push(cell);
            }
        }
    }

    drawBoard() {
        // Dibuja cada celda en el tablero usando el SVG
        this.cells.forEach(cell => cell.draw(this.ctx));
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

}

