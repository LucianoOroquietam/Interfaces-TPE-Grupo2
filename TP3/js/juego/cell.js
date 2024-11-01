class Cell {
    constructor({ x, y, size, svgSrc }) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.svgImage = new Image();
        this.svgImage.src = svgSrc;
        
    }

     // Método para actualizar la opacidad y crear el efecto de parpadeo
     animateHint(img) {
        this.svgImage.src = img;
    }

    animateCancel(img){
        this.svgImage.src = img;
    }


    draw(ctx) {
        ctx.globalAlpha = this.opacity; // Ajustar la opacidad del contexto
        // Dibuja la imagen SVG cuando esté cargada
        this.svgImage.onload = () => {
            ctx.drawImage(this.svgImage, this.x, this.y, this.size, this.size);
        };
        // Si la imagen ya está cargada, dibujarla inmediatamente
        if (this.svgImage.complete) {
            ctx.drawImage(this.svgImage, this.x, this.y, this.size, this.size);
        }

       ctx.globalAlpha += this.opacityDirection; // Restablecer opacidad
    }

    
}