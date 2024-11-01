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
        this.imageCell = '././img/ImgCelda.svg';
        this.imageIndicador = '././img/prueba2.svg';

        if (this.imagenFichaJ1.complete && this.imagenFichaJ2.complete) {
            this.drawFichas();
        } else {
            this.imagenFichaJ1.onload = this.imagenFichaJ2.onload = () => {
                this.drawFichas();
            };

            this.mouseOffsetX = 0;
            this.mouseOffsetY = 0;
        }

    }


    initGame() {
        if (this.tipoJuego === 4) {
            this.board = new Tablero(7, 7, 80, this.ctx, this.imageCell, this.imageIndicador);
            this.setNumtokens(21);
            this.setTokeWidth(60);
            this.setTokeHeigth(55);
        } else if (this.tipoJuego === 5) {
            this.board = new Tablero(9, 9, 70, this.ctx, this.imageCell, this.imageIndicador);
            this.setNumtokens(36);
            this.setTokeWidth(50);
            this.setTokeHeigth(50);
        } else if (this.tipoJuego === 6) {
            this.board = new Tablero(10, 10, 60, this.ctx, this.imageCell, this.imageIndicador);
            this.setNumtokens(45);
            this.setTokeWidth(40);
            this.setTokeHeigth(40);
        } else if (this.tipoJuego === 7) {
            this.board = new Tablero(11, 11, 60, this.ctx, this.imageCell, this.imageIndicador);
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


    setNumtokens(numtokens) {
        this.numTokens = numtokens;
    }

    setTokeWidth(tokenWidth) {
        this.tokenWidth = tokenWidth;
    }

    setTokeHeigth(tokenHeight) {
        this.tokenHeight = tokenHeight;
    }

    generateFichas() {
        for (let i = 0; i <= this.numTokens; i++) {
            const ficha1 = new Ficha(50, 650 - i * 10, this.ctx, this.imagenFichaJ1, { x: 50, y: 650 - i * 10 }, 'Jugador 1', this.board, this.tokenWidth, this.tokenHeight);
            const ficha2 = new Ficha(970, 650 - i * 10, this.ctx, this.imagenFichaJ2, { x: 970, y: 650 - i * 10 }, 'Jugador 2', this.board, this.tokenWidth, this.tokenHeight);

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

            // Calcula el desplazamiento entre el mouse y el centro de la ficha
            this.mouseOffsetX = event.layerX - (clickedFigure.posX + clickedFigure.width / 2);
            this.mouseOffsetY = event.layerY - (clickedFigure.posY + clickedFigure.height / 2);
        }

        this.draw();
    }

    onMouseMove(event) {
        if (this.isMouseDown && this.lastClickedFigure != null) {
            // Mueve la ficha considerando el desplazamiento calculado
            this.lastClickedFigure.posX = event.layerX - this.mouseOffsetX - this.lastClickedFigure.width / 2;
            this.lastClickedFigure.posY = event.layerY - this.mouseOffsetY - this.lastClickedFigure.height / 2;

            this.draw();
        }
    }

    onMouseUp(event) {
        this.isMouseDown = false;

        if (this.lastClickedFigure != null) {
            // Verificar si el mouse está dentro de los límites del tablero
            const mouseX = event.layerX;
            const mouseY = event.layerY;

            // Verificar si el mouse está sobre el tablero
            const isInsideBoard = (
                mouseX >= this.board.boardX &&
                mouseX <= (this.board.boardX + this.board.boardWidth) &&
                mouseY >= this.board.boardY &&
                mouseY <= (this.board.boardY + this.board.boardHeight)
            );

            const row = Math.floor((mouseY - this.board.boardY) / this.board.cellSize);
            const isInTopRow = row === 0;

            if (isInTopRow && isInsideBoard) {
                // Determina la columna donde se suelta la ficha
                const col = Math.floor((mouseX - this.board.boardX) / this.board.cellSize);

                // Llama a la función para hacer caer la ficha
                this.makeTokenDrop(this.lastClickedFigure, col);


                // Limpiar la última ficha seleccionada
                this.lastClickedFigure = null;
            } else {
                // Si la ficha se suelta fuera del tablero, devolverla a su posición inicial
                this.lastClickedFigure.resetPosition();
            }

            // Dibujar el estado actualizado del juego
            this.draw();
        }
    }

    makeTokenDrop(ficha, col) {
        // Encuentra la primera fila vacía en la columna
        const targetRow = this.findAvailableRow(col);
        if (targetRow === -1) {
            console.log("Columna llena");
            ficha.resetPosition();
            ficha.setColocada(false);
            return; // Detener si la columna está llena
        }

        // Calcula la posición Y de la celda de destino
        const targetY = this.board.boardY + targetRow * this.board.cellSize + (this.board.cellSize - ficha.height) / 2;
        const targetX = this.board.boardX + col * this.board.cellSize + (this.board.cellSize - ficha.width) / 2;



        const dropAnimation = () => {
            // Si la ficha no ha alcanzado su posición objetivo
            if (ficha.posY < targetY) {
                // Mueve la ficha hacia abajo incrementando su posición Y
                ficha.posY += 5; // Ajusta la velocidad de caída
                if (ficha.posX < targetX) {
                    ficha.posX += 1;
                }
                if (ficha.posX > targetX) {
                    ficha.posX -= 1;
                }

                requestAnimationFrame(dropAnimation);
            } else {
                // Ajusta la posición Y para que la ficha quede en la celda objetivo
                ficha.posY = targetY;
                ficha.posX = targetX;
                ficha.setColocada(true); // Marca la ficha como colocada en el tablero
                this.board.completeMx(targetRow, col, ficha.getJugador());
                if(this.verificarCuatroEnLinea(targetRow, col)){
                    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
                    return;
                } 
                    
                this.turnoJugador = this.turnoJugador === 1 ? 2 : 1;
            
                // Actualiza la matriz del tablero para reflejar la ficha colocada
                this.board.cells[targetRow][col] = ficha;
            }

            // Redibuja el tablero en cada frame
            this.draw();
        };

        // animacion de caida
        requestAnimationFrame(dropAnimation);
    }

    // encontrar la primera fila vacia en una columna
    findAvailableRow(col) {
        for (let row = this.board.rows - 1; row > 0; row--) {
            if (!this.board.cells[row][col]) {
                return row;
            }
        }
        return -1; // Si no hay celdas disponibles, devuelve -1
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


    verificarCuatroEnLinea(fila, columna) {
        const p = this.board.getMatriz();
        const jugador = p[fila][columna];
        if (!jugador) return false;
    
        const direcciones = [
            { df: 0, dc: 1 },    // Horizontal
            { df: 1, dc: 0 },    // Vertical
            { df: 1, dc: 1 },    // Diagonal hacia abajo
            { df: 1, dc: -1 }    // Diagonal hacia arriba
        ];
    
        const contarFichas = (df, dc) => {
            let cuenta = 0;
            let f = fila + df;
            let c = columna + dc;
            const cells = this.board.getMatriz();
    
            while (f >= 0 && f < this.board.rows && c >= 0 && c < this.board.cols) {
                if (cells[f][c] === jugador) {
                    cuenta++;
                    f += df;
                    c += dc;
                } else {
                    break;
                }
            }
            return cuenta;
        };
    
        for (const { df, dc } of direcciones) {
            const total = 1 + contarFichas(df, dc) + contarFichas(-df, -dc);
            if (total == this.tipoJuego) {
                console.log("¡Ganaste!");
                return true;
            }
        }
    
        return false;
    }
    
    

    draw() {
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        
        this.fichasj1.forEach(ficha => ficha.draw());
        this.fichasj2.forEach(ficha => ficha.draw());
        this.board.drawBoard();
    }
}


