class Juego {
    constructor(ctx, canvasWidth, canvasHeight, tipoJuego) {
        this.ctx = ctx;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.tipoJuego = tipoJuego;
        this.board = null;
        this.fichasj1 = [];
        this.fichasj2 = [];
        this.numTokens = 0;
        
        this.tokenWidth = 0;
        this.tokenHeight = 0;
        
        this.lastClickedFigure = null;
        this.isMouseDown = false;

        this.turnoJugador = 1;

        // Precargar imagenes de las fichas
        this.imagenFichaJ1 = new Image();
        this.imagenFichaJ2 = new Image();
        this.imagenesCargadas = false;

        this.imagenFichaJ1.src = '././img/ficha-gallo.jpg';
        this.imagenFichaJ2.src = '././img/ficha-gatito.jpg';
        this.imageCell= '././img/ImgCelda.svg';

       
        if (this.imagenFichaJ1.complete && this.imagenFichaJ2.complete) {
            this.drawFichas(); 
         } else {
                this.imagenFichaJ1.onload = this.imagenFichaJ2.onload = () => {
                this.drawFichas(); 
            };
}

    }

   

    initGame() {
        if (this.tipoJuego === '4-en-linea') {
            this.board = new Tablero(7, 6, 80, this.ctx, this.imageCell);
            this.setNumtokens(21);
            this.setTokeWidth(60);
            this.setTokeHeigth(55);
        } else if (this.tipoJuego === '5-en-linea') {
            this.board = new Tablero(9, 8, 70, this.ctx, this.imageCell);
            this.setNumtokens(36);
            this.setTokeWidth(50);
            this.setTokeHeigth(50);
        }else if (this.tipoJuego === '6-en-linea') {
            this.board = new Tablero(10, 9, 60, this.ctx,this.imageCell);
            this.setNumtokens(45);
            this.setTokeWidth(40);
            this.setTokeHeigth(40);
        }else if (this.tipoJuego === '7-en-linea') {
            this.board = new Tablero(11, 10, 60, this.ctx, this.imageCell);
            this.setNumtokens(55);
            this.setTokeWidth(40);
            this.setTokeHeigth(40);
        }
        this.board.setBoardX(this.canvasWidth);
        this.board.setBoardY(this.canvasHeight);
        this.board.createCells();

        this.generateFichas();
        this.setupEventListeners();
    }

    setNumtokens(numtokens){
        this.numTokens = numtokens;
    }

    setTokeWidth(tokenWidth){
        this.tokenWidth = tokenWidth;
    }

    setTokeHeigth(tokenHeight){
        this.tokenHeight = tokenHeight;
    }

    generateFichas() {
        for (let i = 0; i <= this.numTokens; i++) {
            const ficha1 = new Ficha(50, 650 - i * 10, this.ctx, this.imagenFichaJ1, { x: 50, y: 650 - i * 10 }, 'Jugador 1', this.board, this.tokenWidth, this.tokenHeight);
            const ficha2 = new Ficha(970, 650 - i * 10, this.ctx, this.imagenFichaJ2, { x: 970, y: 650 - i * 10 }, 'Jugador 2',  this.board, this.tokenWidth, this.tokenHeight);
            
            this.fichasj1.push(ficha1);
            this.fichasj2.push(ficha2);
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

        if (this.lastClickedFigure != null) {
            // Llamar a soltarFicha en Tablero para verificar la posición de la ficha
            const celda = this.board.soltarFicha(event.layerX, event.layerY);
    
            if (celda) {
                // Lógica adicional si la ficha cae dentro del tablero
                console.log(`Ficha colocada en la celda: [${celda.row}, ${celda.col}]`);
    
                // Cambiar el turno de jugador si es necesario
                this.turnoJugador = this.turnoJugador === 1 ? 2 : 1;
    
                // Limpiar la última ficha seleccionada
                this.lastClickedFigure = null;
            } else {
                // Si la ficha se suelta fuera del tablero, devolverla a su posición inicial
                this.lastClickedFigure.resetPosition();
            }
        }
    
        // Dibujar el estado actualizado del juego
        this.draw();
    }

    findClickedFigure(x, y) {
        const fichasActuales = this.turnoJugador === 1 ? this.fichasj1 : this.fichasj2;
        for (let ficha of fichasActuales) {
            if (ficha.isPointFigure(x, y)) {
                return ficha;
            }
        }
        return null;
    }

    drawFichas() {
        this.draw();
    }
    

    draw() {
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        this.board.drawBoard();
        this.fichasj1.forEach(ficha => ficha.draw());
        this.fichasj2.forEach(ficha => ficha.draw());
    }
}

    
    