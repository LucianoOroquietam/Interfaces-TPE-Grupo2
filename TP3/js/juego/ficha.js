class Ficha {
    constructor(posX, posY, contexto, imageSrc, posInicial, jugador, tablero, radius) {
        this.posInicial = posInicial;
        this.posX = posX;
        this.posY = posY;
        this.contexto = contexto;
        this.image = new Image();
        this.image.src = imageSrc;
        this.colocada = false; 
        this.jugador = jugador; 
        this.tamano = 45; // Tamaño estandar de la ficha
        this.tablero = tablero;
        this.radius = radius;
    }


    //metodo para testear las fichas de los jugadores y donde se posicionan
    drawTokens(numTokens) {
        
        

        // Fichas del jugador 1 (rojo) en el lado izquierdo
       /* this.contexto.fillStyle = "red";
        for (let i = 0; i < numTokens / pileSize; i++) {
            // Coordenadas para el puñado
            const pileX = 30 + Math.random() * 50; // Aleatoriedad en la posición X
            const pileY = 726 - 60 + Math.random() * 20; // Posición en la parte inferior
    
            // Dibujar las fichas del puñado
            for (let j = 0; j < pileSize; j++) {
                const offsetX = (Math.random() * dispersion) - (dispersion / 2); // Desplazamiento aleatorio en X
                const offsetY = (Math.random() * dispersion) - (dispersion / 2); // Desplazamiento aleatorio en Y
                this.contexto.beginPath();
                this.contexto.arc(pileX + offsetX, pileY + offsetY, tokenRadius, 0, Math.PI * 2);
                this.contexto.fill();
                this.contexto.closePath();
            }
        }
    
        // Fichas del jugador 2 (amarillo) en el lado derecho
        this.contexto.fillStyle = "yellow";
        for (let i = 0; i < numTokens / pileSize; i++) {
            // Coordenadas para el puñado
            const pileX = 1080 - 50 + Math.random() * 50; 
            const pileY = 726 - 60 + Math.random() * 20; 
    
            
            for (let j = 0; j < pileSize; j++) {
                const offsetX = (Math.random() * dispersion) - (dispersion / 2);
                const offsetY = (Math.random() * dispersion) - (dispersion / 2); 
                this.contexto.beginPath();
                this.contexto.arc(pileX + offsetX, pileY + offsetY, tokenRadius, 0, Math.PI * 2);
                this.contexto.fill();
                this.contexto.closePath();
            }
        }*/
    }

    isInsideBoard(x, y) {
        return (x >= this.tablero.x && x <= this.tablero.x + this.tablero.width &&
                y >= this.tablero.y && y <= this.tablero.y + this.tablero.height);
    }

    
    renderCircle() {
        // Habilitar el suavizado de imagen
        this.contexto.imageSmoothingEnabled = true;
        this.contexto.beginPath();
        this.contexto.arc(this.posX + this.tamano / 2, this.posY + this.tamano / 2, this.tamano / 2, 0, Math.PI * 2);
        this.contexto.fillStyle = this.jugador === 'Jugador 1' ? 'red' : 'yellow'; // Cambiar color según el jugador
        this.contexto.fill();
        this.contexto.closePath();
    }

    clickedMe(x, y) {
        if (!this.colocada) {
            // Verifica si las coordenadas (x, y) estan dentro de los limites de la ficha
            let inX = x > this.posX && x < this.posX + this.tamano;
            let inY = y > this.posY && y < this.posY + this.tamano;

            return inX && inY; 
        }
        return false;
    }

    setPosition(x, y) {
        // Lógica para verificar si la posición está dentro del tablero
        if (!this.isInsideBoard(x, y)) {
            this.posX = x;
            this.posY = y;
        }
    }

    isPointFigure(x,y){
        let _x = this.posX - x; //_x es la posicion del circulo - la posicion de donde esta el mouse (x)
        let _y = this.posY - y; // esto seria como calcular y2 - y1 e x2 - x1
        return Math.sqrt((_x * _x) - (_y * _y)) < this.radius; //el resultado de (x2 - x1) - (y2 - y1) elevado al cuadrado 
        //si esa distancia entre dos puntos es menor al radio del circulo es porque estoy dentro del circulo
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


    draw() {
        for(let i=0; i<20; i++){
            this.renderCircle();

        }
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