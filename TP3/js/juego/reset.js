class Reset {
    constructor(x, y, ctx, canvasWidth, canvasHeight, tipoJuego, imgfichaj1, imgfichaj2) {
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
    }

    draw() {
        this.ctx.drawImage(this.image, this.posX, this.posY, this.buttonWidth, this.buttonHeight);
    }

    resetear() {
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        this.juego = new Juego(this.ctx, this.canvasWidth, this.canvasHeight, this.tipoJuego, this.imgfichaj1, this.imgfichaj2);
    }

    isClicked(x, y) {
        return (
            x >= this.posX &&
            x <= this.posX + this.buttonWidth &&
            y >= this.posY &&
            y <= this.posY + this.buttonHeight
        );
    }
}
