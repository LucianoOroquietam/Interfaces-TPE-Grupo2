class Juego {
    constructor(
        ctx,
        canvasWidth,
        canvasHeight,
        tipoJuego,
        imgfichaj1,
        imgfichaj2
    ) {
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
        this.imagenGanador = new Image(); // Crea una nueva imagen
        this.imagenesCargadas = false;

        // Variables para el temporizador
        this.startTime = 0;
        this.elapsedTime = 0; // Tiempo transcurrido en segundos
        this.timerInterval = null; // Inicializa el intervalo del cronómetro

        this.imagenFichaJ1.src = imgfichaj1;
        this.imagenFichaJ2.src = imgfichaj2;
        this.imagenGanador.src = "././img/juego/win.jpeg";
        this.imageCell = "././img/ImgCelda.svg";
        this.imageIndicador1 = "././img/juego/indicadorOpaco.svg";
        this.imageIndicador2 = "././img/juego/indicadorFichaSoltada.svg";

        this.resetButton = new Reset(
            canvasWidth - 50,
            10,
            ctx,
            canvasWidth,
            canvasHeight,
            tipoJuego,
            imgfichaj1,
            imgfichaj2,
            this
        );

        this.mouseOffsetX = 0;
        this.mouseOffsetY = 0;

        this.isTimeUp = false; // Agrega esta variable en tu constructor

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
                this.startTimer();
            }
        };

        this.imagenGanador.onload = () => {
            console.log("Imagen cargada correctamente");
        };
        this.imagenGanador.onerror = () => {
            console.error("Error al cargar la imagen");
        };
    }

    initGame() {
        if (this.tipoJuego === 4) {
            this.board = new Tablero(
                7,
                7,
                80,
                this.ctx,
                this.imageCell,
                this.imageIndicador1
            );
            this.setNumtokens(21);
            this.setTokeWidth(60);
            this.setTokeHeigth(55);
        } else if (this.tipoJuego === 5) {
            this.board = new Tablero(
                9,
                9,
                70,
                this.ctx,
                this.imageCell,
                this.imageIndicador1
            );
            this.setNumtokens(36);
            this.setTokeWidth(50);
            this.setTokeHeigth(50);
        } else if (this.tipoJuego === 6) {
            this.board = new Tablero(
                10,
                10,
                60,
                this.ctx,
                this.imageCell,
                this.imageIndicador1
            );
            this.setNumtokens(45);
            this.setTokeWidth(40);
            this.setTokeHeigth(40);
        } else if (this.tipoJuego === 7) {
            this.board = new Tablero(
                11,
                11,
                60,
                this.ctx,
                this.imageCell,
                this.imageIndicador1
            );
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

        this.startTimer(); // Inicia el cronómetro cuando se inicializa el juego
    }

    reset() {
        this.fichasj1 = [];
        this.fichasj2 = [];
        this.turnoJugador = 1;
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        this.stopTimer();
        this.startTimer();
        this.initGame();
        this.draw();
    }

    startTimer() {
        if (this.timerInterval) return; // Si ya hay un intervalo en ejecucion, que haga nada, porque bajaba de 2 seg
        this.remainingTime = 0.5 * 60;
        this.isTimeUp = false;
        this.timerInterval = setInterval(() => {
            if (this.remainingTime > 0) {
                this.remainingTime--;
            } else {
                this.stopTimer();
                this.isTimeUp = true;
            }
            this.draw();
        }, 1000);
    }

    stopTimer() {
        clearInterval(this.timerInterval);
        this.timerInterval = null; // limpio el intervalo porque sino se queda pegado , ya que le puse return al this.timerInterval
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
            const ficha1 = new Ficha(
                50,
                650 - i * 10,
                this.ctx,
                this.imagenFichaJ1,
                { x: 50, y: 650 - i * 10 },
                "Jugador 1",
                this.board,
                this.tokenWidth,
                this.tokenHeight
            );
            const ficha2 = new Ficha(
                970,
                650 - i * 10,
                this.ctx,
                this.imagenFichaJ2,
                { x: 970, y: 650 - i * 10 },
                "Jugador 2",
                this.board,
                this.tokenWidth,
                this.tokenHeight
            );

            this.fichasj1.push(ficha1);
            this.fichasj2.push(ficha2);
        }
    }

    setupEventListeners() {
        // Elimina los listeners previos para evitar duplicación
        canvas.removeEventListener("mousedown", this.onMouseDown);
        canvas.removeEventListener("mousemove", this.onMouseMove);
        canvas.removeEventListener("mouseup", this.onMouseUp);
        canvas.removeEventListener("click", this.onClick);

        canvas.addEventListener("mousedown", this.onMouseDown.bind(this), false);
        canvas.addEventListener("mousemove", this.onMouseMove.bind(this), false);
        canvas.addEventListener("mouseup", this.onMouseUp.bind(this), false);
        canvas.addEventListener("click", this.onClick.bind(this), false);
    }

    onClick(event) {
        const x = event.layerX;
        const y = event.layerY;

        if (this.resetButton.isClicked(x, y)) {
            this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
            this.reset();
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
            this.board.cells.forEach((cell) => {
                if (cell.y === this.board.getBoardY()) {
                    // Solo la fila 0
                    console.log("entro al if");
                    cell.animateHint(this.imageIndicador2);
                    cell.draw(this.ctx);
                }
            });
            this.lastClickedFigure = clickedFigure;
            // Calcula el desplazamiento entre el mouse y el centro de la ficha
            this.mouseOffsetX =
                event.layerX - (clickedFigure.posX + clickedFigure.width / 2);
            this.mouseOffsetY =
                event.layerY - (clickedFigure.posY + clickedFigure.height / 2);
        }

        this.draw();
    }

    onMouseMove(event) {
        if (this.isMouseDown && this.lastClickedFigure != null) {
            const newPosX =
                event.layerX - this.mouseOffsetX - this.lastClickedFigure.width / 2;
            const newPosY =
                event.layerY - this.mouseOffsetY - this.lastClickedFigure.height / 2;

            // Solo actualizar y redibujar si la posición cambia significativamente
            if (
                Math.abs(newPosX - this.lastClickedFigure.posX) > 2 ||
                Math.abs(newPosY - this.lastClickedFigure.posY) > 2
            ) {
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
            const isInsideBoard =
                mouseX >= this.board.boardX &&
                mouseX <= this.board.boardX + this.board.boardWidth &&
                mouseY >= this.board.boardY &&
                mouseY <= this.board.boardY + this.board.boardHeight;

            const row = Math.floor(
                (mouseY - this.board.boardY) / this.board.cellSize
            );
            const isInTopRow = row === 0;

            if (isInTopRow && isInsideBoard) {
                // Determina la columna donde se suelta la ficha
                const col = Math.floor(
                    (mouseX - this.board.boardX) / this.board.cellSize
                );

                // Llama a la función para hacer caer la ficha
                this.makeTokenDrop(this.lastClickedFigure, col);

                // Limpiar la última ficha seleccionada
                this.lastClickedFigure = null;
            } else {
                // Si la ficha se suelta fuera del tablero, devolverla a su posición inicial
                this.lastClickedFigure.resetPosition();
            }
            this.board.cells.forEach((cell) => {
                if (cell.y === this.board.getBoardY()) {
                    // Solo la fila 0
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
        return (
            this.board.boardY +
            targetRow * this.board.cellSize +
            (this.board.cellSize - ficha.height) / 2
        );
    }

    calculateTargetX(col, ficha) {
        return (
            this.board.boardX +
            col * this.board.cellSize +
            (this.board.cellSize - ficha.width) / 2
        );
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
        const fichasActuales =
            this.turnoJugador === 1 ? this.fichasj1 : this.fichasj2;
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
            { df: 0, dc: 1 }, // Horizontal
            { df: 1, dc: 0 }, // Vertical
            { df: 1, dc: 1 }, // Diagonal hacia abajo
            { df: 1, dc: -1 }, // Diagonal hacia arriba
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
                this.mostrarGanador(jugador); // Llama al método para mostrar el ganador
                return true;
            }
        }

        return false;
    }

    mostrarGanador(jugador) {
        this.stopTimer(); // Detener el temporizador
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

        // Fondo oscuro
        this.ctx.fillStyle = "rgba(0, 0, 0, 0.7)"; // Negro con opacidad
        this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

        // Dibuja la imagen del ganador
        this.ctx.drawImage(
            this.imagenGanador,
            this.canvasWidth / 2 - this.imagenGanador.width / 2,
            this.canvasHeight / 2 - this.imagenGanador.height / 2
        );

        // Texto del ganador
        this.ctx.fillStyle = "white";
        this.ctx.font = "30px Arial";
        this.ctx.fillText(
            `${jugador} ha ganado!`,
            this.canvasWidth / 2 - 100,
            this.canvasHeight / 2 + this.imagenGanador.height / 2 + 30
        );
        this.generateConfetti(jugador);
    }

    generateConfetti(jugador) {
        const particles = [];
        const colors = ["#FF5733", "#33FF57", "#3357FF", "#F0E68C", "#FF69B4"];

        // Generar partículas
        for (let i = 0; i < 100; i++) {
            particles.push({
                x: Math.random() * this.canvasWidth,
                y: Math.random() * this.canvasHeight - 20, // Comenzar fuera de la pantalla
                size: Math.random() * 5 + 5,
                color: colors[Math.floor(Math.random() * colors.length)],
                speed: Math.random() * 3 + 1,
            });
        }

        // Función para dibujar y mover las partículas
        const animateConfetti = () => {
            this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
            this.ctx.fillStyle = "rgba(0, 0, 0, 0.7)"; // Fondo oscuro
            this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

            // Dibuja la imagen del ganador
            this.ctx.drawImage(
                this.imagenGanador,
                this.canvasWidth / 2 - this.imagenGanador.width / 2,
                this.canvasHeight / 2 - this.imagenGanador.height / 2
            );

            // Texto del ganador
            this.ctx.fillStyle = "white";
            this.ctx.font = "30px Arial";
            this.ctx.fillText(
                `${jugador} ha ganado!`,
                this.canvasWidth / 2 - 100,
                this.canvasHeight / 2 + this.imagenGanador.height / 2 + 30
            );

            // Dibuja cada partícula de confeti
            for (let particle of particles) {
                this.ctx.fillStyle = particle.color;
                this.ctx.beginPath();
                this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                this.ctx.fill();

                // Actualiza la posición de la partícula
                particle.y += particle.speed;
                if (particle.y > this.canvasHeight) {
                    particle.y = 0; // Reiniciar la partícula cuando sale de la pantalla
                }
            }

            requestAnimationFrame(animateConfetti);
        };

        animateConfetti(); // Iniciar la animación de confeti
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        this.board.drawBoard();
        this.resetButton.draw();
        this.fichasj1.forEach((ficha) => ficha.draw());
        this.fichasj2.forEach((ficha) => ficha.draw());
        this.drawTimer();
        if (this.isTimeUp) {
            // Define el texto y las propiedades
            const message = "¡Tiempo agotado!";
            this.ctx.font = "30px Arial";

            // Mide el ancho del texto
            const textWidth = this.ctx.measureText(message).width;
            const textHeight = 30; // Altura del texto (30px, según la fuente utilizada)

            //fondo semitransparente
            this.ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
            this.ctx.fillRect(
                this.canvasWidth / 2 - textWidth / 2 - 10,
                this.canvasHeight / 2 - textHeight / 2 - 10,
                textWidth + 20,
                textHeight + 20
            );

            // Dibuja el texto en el medio
            this.ctx.fillStyle = "red"; // Color del texto
            this.ctx.fillText(
                message,
                this.canvasWidth / 2 - textWidth / 2,
                this.canvasHeight / 2 + textHeight / 2 / 3
            );
            // Ajusta la posición Y para centrar el texto verticalmente
        }
    }

    drawTimer() {
        const minutes = Math.floor(this.remainingTime / 60);
        const seconds = this.remainingTime % 60;
        this.ctx.fillStyle = "white";
        this.ctx.font = "20px Arial";
        this.ctx.fillText(
            `Tiempo: ${minutes}:${seconds < 10 ? "0" + seconds : seconds}`,
            10,
            30
        );
    }
}
