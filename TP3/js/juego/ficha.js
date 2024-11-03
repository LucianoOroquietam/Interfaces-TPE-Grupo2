

class Ficha {
    constructor(posX, posY, contexto, imageSrc, posInicial, jugador, tablero, width, height) {
        this.posInicial = posInicial;
        this.posX = posX;
        this.posY = posY;
        this.contexto = contexto;
        this.image = imageSrc;
        this.colocada = false; 
        this.jugador = jugador; 
        this.tablero = tablero;
        this.width = width;
        this.height = height;
        this.radio = Math.min(this.width, this.height) / 2; // Calcular el radio una vez
    }

    isInsideBoard(x, y) {
        const { x: boardX, y: boardY, width: boardWidth, height: boardHeight } = this.tablero;
        return (x >= boardX && x <= boardX + boardWidth &&
                y >= boardY && y <= boardY + boardHeight);
    }

    resetPosition() {
        this.posX = this.posInicial.x;
        this.posY = this.posInicial.y;
    }

    renderToken() {
        this.contexto.imageSmoothingEnabled = true;

        this.contexto.beginPath();
        this.contexto.arc(this.posX + this.width / 2, this.posY + this.height / 2, this.radio, 0, Math.PI * 2);
        this.contexto.closePath();

        // Aplicar recorte y dibujar la imagen dentro del área recortada
        this.contexto.save();
        this.contexto.clip();
        this.contexto.drawImage(this.image, this.posX, this.posY, this.width, this.height);
        this.contexto.restore();
    }

    draw() {  
        this.renderToken(); 
    }

    clickedMe(x, y) {
        if (!this.colocada) {
            return this.isPointFigure(x, y); // Reutiliza la función isPointFigure
        }
        return false;
    }

    setPosition(x, y) {
        if (this.isInsideBoard(x, y)) {
            this.posX = x;
            this.posY = y;
        }
    }

    isPointFigure(x, y) {
        return (
            x >= this.posX &&
            x <= this.posX + this.width && 
            y >= this.posY &&
            y <= this.posY + this.height 
        );
    }

    getPosition() {
        return { x: this.posX, y: this.posY };
    }

    getPositionInicial() {
        return this.posInicial;
    }

    getImage() {
        return this.image;
    }

    getColocada() {
        return this.colocada;
    }

    setColocada(v) {
        this.colocada = v;
    }

    getJugador() {
        return this.jugador;
    }
}
