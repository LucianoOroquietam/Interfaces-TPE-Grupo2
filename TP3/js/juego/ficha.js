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
    }


    isInsideBoard(x, y) {
        return (x >= this.tablero.x && x <= this.tablero.x + this.tablero.width &&
                y >= this.tablero.y && y <= this.tablero.y + this.tablero.height);
    }

    resetPosition() {
        this.posX = this.posInicial.x;
        this.posY = this.posInicial.y;
    }
    
    renderToken() {

        this.contexto.imageSmoothingEnabled = true;

        // Calcular el radio de acuerdo con el ancho o el alto (asumiendo que width y height sean iguales para un circulo perfecto)
        let radio = Math.min(this.width, this.height) / 2;

        this.contexto.beginPath();
        this.contexto.arc(this.posX + this.width / 2, this.posY + this.height / 2, radio, 0, Math.PI * 2);
        this.contexto.closePath();

        // Aplicar recorte
        this.contexto.save();
        this.contexto.clip();

        // Dibujar la imagen dentro del área recortada
        this.contexto.drawImage(this.image, this.posX, this.posY, this.width, this.height);

        
        this.contexto.restore();
    }

    draw() {  
        this.renderToken(); 
    }

    getJugador(){
        return this.jugador;
    }

    clickedMe(x, y) {
        if (!this.colocada) {
            // Verifica si las coordenadas (x, y) estan dentro de los limites de la ficha
            let inX = x > this.posX && x < this.posX + this.width;
            let inY = y > this.posY && y < this.posY + this.height;

            return inX && inY; 
        }
        return false;
    }

    setPosition(x, y) {
        if (!this.isInsideBoard(x, y)) {
            this.posX = x;
            this.posY = y;
        }
    }

    isPointFigure(x,y){
        return (
            x >= this.posX &&
            x <= this.posX + this.width && 
            y >= this.posY &&
            y <= this.posY + this.height 
        );
    }


    getPosition() {
        return { "x": this.posX, "y": this.posY };
    }

    getPositionInicial() {
        return this.posInicial;
    }

    
    getImage() {
        return this.image;
    }


    

    // Metodo auxiliar para renderizar un circulo de prueba
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