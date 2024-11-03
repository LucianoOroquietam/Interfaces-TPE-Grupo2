class Juego {
    constructor(ctx, canvasWidth, canvasHeight, tipoJuego, imgfichaj1, imgfichaj2) {
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


        // Variables para el temporizador
        this.startTime = 0;
        this.elapsedTime = 0; // Tiempo transcurrido en segundos
        this.timerInterval = null; // Inicializa el intervalo del cronómetro


        this.imagenFichaJ1.src = imgfichaj1;
        this.imagenFichaJ2.src = imgfichaj2;
        this.imageCell = '././img/ImgCelda.svg';
        this.imageIndicador1 = '././img/juego/indicadorOpaco.svg';
        this.imageIndicador2 = '././img/juego/indicadorFichaSoltada.svg';

        this.resetButton = new Reset(canvasWidth - 50, 10, ctx, canvasWidth, canvasHeight, tipoJuego, imgfichaj1, imgfichaj2, this);

        this.mouseOffsetX = 0;
        this.mouseOffsetY = 0;

        // Variables para verificar si las imágenes están cargadas
        this.imagenJ1Cargada = false;
        this.imagenJ2Cargada = false;

        // Establece el evento onload para la imagen del jugador 1
        this.imagenFichaJ1.onload = () => {
            this.imagenJ1Cargada = true;
            verificarCargaImagenes();
        };

        // Establece el evento onload para la imagen del jugador 2
        this.imagenFichaJ2.onload = () => {
            this.imagenJ2Cargada = true;
            verificarCargaImagenes();
        };
        // Función para verificar si ambas imágenes están cargadas
        const verificarCargaImagenes = () => {
            if (this.imagenJ1Cargada && this.imagenJ2Cargada) {
                this.initGame();
                this.drawFichas();
                // this.startTimer(); // Iniciar el temporizador cuando el juego comience
            }
        };

        




    }

    onloadImages() {
        this.imagenFichaJ1.onload = this.imagenFichaJ2.onload = () => {
            console.log("hola");
        };

    }



    initGame() {
        if (this.tipoJuego === 4) {
            this.board = new Tablero(7, 7, 80, this.ctx, this.imageCell, this.imageIndicador1);
            this.setNumtokens(21);
            this.setTokeWidth(60);
            this.setTokeHeigth(55);
        } else if (this.tipoJuego === 5) {
            this.board = new Tablero(9, 9, 70, this.ctx, this.imageCell, this.imageIndicador1);
            this.setNumtokens(36);
            this.setTokeWidth(50);
            this.setTokeHeigth(50);
        } else if (this.tipoJuego === 6) {
            this.board = new Tablero(10, 10, 60, this.ctx, this.imageCell, this.imageIndicador1);
            this.setNumtokens(45);
            this.setTokeWidth(40);
            this.setTokeHeigth(40);
        } else if (this.tipoJuego === 7) {
            this.board = new Tablero(11, 11, 60, this.ctx, this.imageCell, this.imageIndicador1);
            this.setNumtokens(55);
            this.setTokeWidth(40);
            this.setTokeHeigth(40);
        }

        this.board.setBoardX(this.canvasWidth);
        this.board.setBoardY(this.canvasHeight);
        this.board.createCells();

        this.generateFichas();
        this.setupEventListeners();
        console.log("entro al initGame");

        //this.startTimer(); // Inicia el cronómetro cuando se inicializa el juego
    }



    reset() {
        this.fichasj1 = [];
        this.fichasj2 = [];
        this.turnoJugador = 1;
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        this.initGame();
        this.draw(); // Redibuja el juego después de reiniciar
    }


    /*   startTimer() {
           this.startTime = Date.now(); // Guardar el tiempo de inicio
           this.timerInterval = setInterval(() => {
               this.elapsedTime = Math.floor((Date.now() - this.startTime) / 1000); // Calcular tiempo transcurrido en segundos
               if (this.elapsedTime >= 1 * 60) { // Si han pasado 10 minutos
                   this.stopTimer();
                   // Aquí puedes agregar código para manejar el fin del tiempo, como mostrar un mensaje de "Tiempo agotado"
               }
               this.draw(); // Dibuja el estado actual del juego, incluyendo el cronómetro
           }, 1000);
       }
   
       stopTimer() {
           clearInterval(this.timerInterval); // Detiene el cronómetro
           
       }*/

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
        // Elimina los listeners previos para evitar duplicación
        canvas.removeEventListener('mousedown', this.onMouseDown);
        canvas.removeEventListener('mousemove', this.onMouseMove);
        canvas.removeEventListener('mouseup', this.onMouseUp);
        canvas.removeEventListener('click', this.onClick);
        
        canvas.addEventListener('mousedown', this.onMouseDown.bind(this), false);
        canvas.addEventListener('mousemove', this.onMouseMove.bind(this), false);
        canvas.addEventListener('mouseup', this.onMouseUp.bind(this), false);
        canvas.addEventListener('click', this.onClick.bind(this), false);
    }

    onClick(event) {
        const x = event.layerX;
        const y = event.layerY;

        if (this.resetButton.isClicked(x, y)) {
            this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
            this.resetButton.resetear();
        }
    }

    onMouseDown(event) {
        this.isMouseDown = true;

        if (this.lastClickedFigure != null) {
            this.lastClickedFigure = null;
        }

        let clickedFigure = this.findClickedFigure(event.layerX, event.layerY);
        if (clickedFigure != null) {
            // Animar y dibujar los hints en la fila 0
            this.board.cells.forEach(cell => {
                if (cell.y === this.board.getBoardY()) { // Solo la fila 0
                    console.log("entro al if")
                    cell.animateHint(this.imageIndicador2);
                    cell.draw(this.ctx);
                }
            });
            this.lastClickedFigure = clickedFigure;
            // Calcula el desplazamiento entre el mouse y el centro de la ficha
            this.mouseOffsetX = event.layerX - (clickedFigure.posX + clickedFigure.width / 2);
            this.mouseOffsetY = event.layerY - (clickedFigure.posY + clickedFigure.height / 2);
        }

        this.draw();
    }

    onMouseMove(event) {
        if (this.isMouseDown && this.lastClickedFigure != null) {
            const newPosX = event.layerX - this.mouseOffsetX - this.lastClickedFigure.width / 2;
            const newPosY = event.layerY - this.mouseOffsetY - this.lastClickedFigure.height / 2;

            // Solo actualizar y redibujar si la posición cambia significativamente
            if (Math.abs(newPosX - this.lastClickedFigure.posX) > 2 || Math.abs(newPosY - this.lastClickedFigure.posY) > 2) {
                this.lastClickedFigure.posX = newPosX;
                this.lastClickedFigure.posY = newPosY;
                this.draw(); // Dibuja solo si se detecta un cambio de posición significativo
            }
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
            this.board.cells.forEach(cell => {
                if (cell.y === this.board.getBoardY()) { // Solo la fila 0
                    cell.animateCancel(this.imageIndicador1);
                    //cell.draw(this.ctx);
                }
            });
            // Dibujar el estado actualizado del juego
            this.draw();
        }
    }

    makeTokenDrop(ficha, col) {
        const targetRow = this.findAvailableRow(col);
        if (targetRow === -1) {
            console.log("Columna llena");
            ficha.resetPosition();
            ficha.setColocada(false);
            return; // Detener si la columna está llena
        }

        const targetY = this.calculateTargetY(targetRow, ficha);
        const targetX = this.calculateTargetX(col, ficha);

        this.animateTokenDrop(ficha, targetY, targetX, targetRow, col);
    }

    calculateTargetY(targetRow, ficha) {
        return this.board.boardY + targetRow * this.board.cellSize + (this.board.cellSize - ficha.height) / 2;
    }

    calculateTargetX(col, ficha) {
        return this.board.boardX + col * this.board.cellSize + (this.board.cellSize - ficha.width) / 2;
    }

    animateTokenDrop(ficha, targetY, targetX, targetRow, col) {
        const dropAnimation = () => {
            if (ficha.posY < targetY) {
                ficha.posY += 8; // Ajusta la velocidad de caída
                ficha.posX = this.adjustPositionX(ficha.posX, targetX);
                requestAnimationFrame(dropAnimation);
            } else {
                this.finalizeTokenDrop(ficha, targetY, targetX, targetRow, col);
            }

            this.draw();
        };

        requestAnimationFrame(dropAnimation);
    }

    adjustPositionX(currentX, targetX) {
        if (currentX < targetX) {
            return currentX + 1;
        }
        if (currentX > targetX) {
            return currentX - 1;
        }
        return currentX;
    }

    finalizeTokenDrop(ficha, targetY, targetX, targetRow, col) {
        ficha.posY = targetY;
        ficha.posX = targetX;
        ficha.setColocada(true); // Marca la ficha como colocada en el tablero
        this.board.completeMx(targetRow, col, ficha.getJugador());
        if (this.verificarCuatroEnLinea(targetRow, col)) {
            this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
            //this.resetButton.resetear();
            this.turnoJugador = 1; // Restablece el turno del jugador
            return;
        }

        this.turnoJugador = this.turnoJugador === 1 ? 2 : 1;

        // Actualiza la matriz del tablero para reflejar la ficha colocada
        this.board.cells[targetRow][col] = ficha;
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
        this.board.drawBoard();
        this.resetButton.draw();
        this.fichasj1.forEach(ficha => ficha.draw());
        this.fichasj2.forEach(ficha => ficha.draw());
        // Dibuja el temporizador en el canvas
        //  this.drawTimer();

    }

    /*   drawTimer() {
           // Dibuja el cronómetro
           const minutes = Math.floor(this.elapsedTime / 60);
           const seconds = this.elapsedTime % 60;
           this.ctx.fillStyle = "white";
       
           this.ctx.font = "20px Arial";
           this.ctx.fillText(`Tiempo: ${minutes}:${seconds < 10 ? '0' + seconds : seconds}`, 10, 30);
       }
   */


}


