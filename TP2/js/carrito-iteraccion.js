document.addEventListener("DOMContentLoaded", function() {
    console.log("El archivo JS se ha cargado correctamente");
    
    const imgs = document.querySelectorAll('.carrito-compra-toggle');

        console.log("Imágenes encontradas correctamente en el DOM");
        
        imgs.forEach(function(img) {  
            img.addEventListener('click', function() {
                if (img.src.includes('Agregar.png')) {
                    img.src = 'img/detalle card/Add Shopping Cart.png';
                } else {
                    img.src = 'img/detalle card/Agregar.png';
                }
            });
        });
    
});
