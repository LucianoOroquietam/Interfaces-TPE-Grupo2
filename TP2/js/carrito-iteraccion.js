document.addEventListener("DOMContentLoaded", function() {
  
    
    const imgs = document.querySelectorAll('.carrito-compra-toggle');

     
        
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
