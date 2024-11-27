class Reset {
    constructor(x, y, ctx, canvasWidth, canvasHeight, tipoJuego, imgfichaj1, imgfichaj2, juegoThis) {
        this.posX = x;
        this.posY = y;
        this.ctx = ctx;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.tipoJuego = tipoJuego;
        this.imgfichaj1 = imgfichaj1;
        this.imgfichaj2 = imgfichaj2;
        this.buttonWidth = 40;
        this.buttonHeight = 40;
        this.image = new Image();
        this.image.src = '././img/juego/restart.png';
        this.juego = juegoThis;
        
    }

    draw() {
        this.ctx.drawImage(this.image, this.posX, this.posY, this.buttonWidth, this.buttonHeight);
    }

    resetear() {
        this.juego.reset(); 
    }

    isClicked(x, y) {
        return (
            x >= this.posX &&
            x <= this.posX + this.buttonWidth &&
            y >= this.posY &&
            y <= this.posY + this.buttonHeight
        );
    }


    getImage(){
        return this.image;
    }
}
