class Juego {
    constructor(ctx, canvasWidth, canvasHeight, tipoJuego) {
        this.ctx = ctx;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.tipoJuego = tipoJuego;
        this.board = null;
        this.fichasj1 = [];
        this.fichasj2 = [];
        this.numTokens = 20;
        this.tokenRadius = 20;
        
        this.lastClickedFigure = null;
        this.isMouseDown = false;
        
    }

    initGame() {
        // Configura el tablero basado en el tipo de juego
        if (this.tipoJuego === '4-en-linea') {
            this.board = new Tablero(7, 6, 70, this.ctx, '././img/ImgCelda.svg');
        } else if (this.tipoJuego === '5-en-linea') {
            this.board = new Tablero(10, 8, 50, this.ctx, '././img/ImgCelda.svg');
        }
        this.board.setBoardX(this.canvasWidth);
        this.board.setBoardY(this.canvasHeight);
        this.board.createCells();

        this.generateFichas();
        this.setupEventListeners();
    }

    generateFichas() {
        this.fichas = [];
        for (let i = 0; i <= this.numTokens; i++) {
            const ficha = new Ficha(50, i * 30, this.ctx, '', { x: 50, y: 50 }, 'Jugador 1', this.board, this.tokenRadius);
            this.fichas.push(ficha);
        }
    }

    setupEventListeners() {
        canvas.addEventListener('mousedown', this.onMouseDown.bind(this), false);
        canvas.addEventListener('mousemove', this.onMouseMove.bind(this), false);
        canvas.addEventListener('mouseup', this.onMouseUp.bind(this), false);
    }

    onMouseDown(event) {
        this.isMouseDown = true;
        if (this.lastClickedFigure != null) {
            this.lastClickedFigure = null;
        }

        let clickedFigure = this.findClickedFigure(event.layerX, event.layerY);
        if (clickedFigure != null) {
            this.lastClickedFigure = clickedFigure;
        }

        this.draw();
    }

    onMouseMove(event) {
        if (this.isMouseDown && this.lastClickedFigure != null) {
            this.lastClickedFigure.setPosition(event.layerX, event.layerY);
            this.draw();
        }
    }

    onMouseUp(event) {
        this.isMouseDown = false;
        // Aquí puedes agregar lógica para verificar si la ficha está dentro del tablero, etc.
    }

    findClickedFigure(x, y) {
        for (let ficha of this.fichas) {
            if (ficha.isPointFigure(x, y)) {
                return ficha;
            }
        }
        return null;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        this.board.drawBoard();
        this.fichas.forEach(ficha => ficha.draw());
    }
}

    
    