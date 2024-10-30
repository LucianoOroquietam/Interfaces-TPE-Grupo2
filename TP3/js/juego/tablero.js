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

    soltarFicha(x, y) {
        // Calcular la columna y la fila donde se soltó la ficha
        let col = Math.floor((x - this.boardX) / this.cellSize);
        let row = Math.floor((y - this.boardY) / this.cellSize);
    
        // Verificar si la celda es válida dentro de los límites del tablero
        if (col >= 0 && col < this.cols && row >= 0 && row < this.rows) {
            console.log(`Ficha soltada en celda: [${row}, ${col}]`);
            // Aquí puedes añadir la lógica para colocar la ficha en el tablero
            return { row, col };
        } else {
            console.log("Ficha soltada fuera del tablero.");
            return null;
        }
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

