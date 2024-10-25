class Ficha {
    constructor(posX, posY, contexto, imageSrc, posInicial, jugador) {
        this.posInicial = posInicial;
        this.posX = posX;
        this.posY = posY;
        this.contexto = contexto;
        this.image = new Image();
        this.image.src = imageSrc;
        this.colocada = false; 
        this.jugador = jugador; 
        this.tamano = 45; // Tamaño estandar de la ficha
    }

   
    setPosition(x, y) {
        this.posX = x;
        this.posY = y;
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
        this.renderCircle();
    }

    // Metodo auxiliar para renderizar un circulo de prueba
    renderCircle() {
        // Habilitar el suavizado de imagen
        this.contexto.imageSmoothingEnabled = true;
        this.contexto.beginPath();
        this.contexto.arc(this.posX + this.tamano / 2, this.posY + this.tamano / 2, this.tamano / 2, 0, Math.PI * 2);
        this.contexto.fillStyle = this.jugador === 'Jugador 1' ? 'red' : 'yellow'; // Cambiar color según el jugador
        this.contexto.fill();
        this.contexto.closePath();
    }

    /*    // Método para dibujar la ficha en el canvas
        draw() {
            // Verifica si la imagen ya se cargó completamente
            if (this.image.complete) { 
                this.renderImage(); // Llama a una función para no repetir el código de dibujo
            } else {
                // Si la imagen aún no se ha cargado, espera al evento onload
                this.image.onload = () => {
                    this.renderImage();
                }
            }
        }
    
        // Método auxiliar para renderizar la imagen
        renderImage() {
            // Habilitar el suavizado de imagen, si es necesario
            this.contexto.imageSmoothingEnabled = true;
            // Dibujar la imagen en el canvas con un tamaño fijo
            this.contexto.drawImage(this.image, this.posX, this.posY, this.tamano, this.tamano);
        }
    */
    // Método para verificar si la ficha fue clickeada
    clickedMe(x, y) {
        if (!this.colocada) {
            // Verifica si las coordenadas (x, y) estan dentro de los limites de la ficha
            let inX = x > this.posX && x < this.posX + this.tamano;
            let inY = y > this.posY && y < this.posY + this.tamano;

            return inX && inY; // Devuelve true si fue clickeada
        }
        return false;
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
