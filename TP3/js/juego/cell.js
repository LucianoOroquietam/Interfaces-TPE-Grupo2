class Cell {
    constructor({ x, y, size, svgSrc }) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.svgImage = new Image();
        this.svgImage.src = svgSrc;
    }

    draw(ctx) {
        // Dibuja la imagen SVG cuando esté cargada
        this.svgImage.onload = () => {
            ctx.drawImage(this.svgImage, this.x, this.y, this.size, this.size);
        };
        // Si la imagen ya está cargada, dibujarla inmediatamente
        if (this.svgImage.complete) {
            ctx.drawImage(this.svgImage, this.x, this.y, this.size, this.size);
        }
    }
}