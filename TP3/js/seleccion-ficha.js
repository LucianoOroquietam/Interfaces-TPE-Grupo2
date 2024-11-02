document.addEventListener("DOMContentLoaded", () => {
    // Manejo de selección del modo de juego
    const buttons = document.querySelectorAll('.contenedor_modo_juego button');
    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            // Deseleccionar otros botones
            buttons.forEach((btn) => {
                btn.classList.remove('selected'); // Quita la clase 'selected' de todos los botones
            });
            button.classList.add('selected'); // Agrega la clase 'selected' al botón clickeado
        });
    });

    // Manejo de selección de fichas
    const gallitoImages = document.querySelectorAll('.gallito-fichas img');
    gallitoImages.forEach((img) => {
        img.addEventListener('click', () => {
            // Deseleccionar otras imágenes en el grupo de gallito
            gallitoImages.forEach((otherImg) => {
                otherImg.classList.remove('selected'); // Quita la selección de otras imágenes en el grupo
            });
            img.classList.add('selected'); // Agrega la clase 'selected' a la imagen clickeada
        });
    });

    const gatoImages = document.querySelectorAll('.gato-fichas img');
    gatoImages.forEach((img) => {
        img.addEventListener('click', () => {
            // Deseleccionar otras imágenes en el grupo de gato
            gatoImages.forEach((otherImg) => {
                otherImg.classList.remove('selected'); // Quita la selección de otras imágenes en el grupo
            });
            img.classList.add('selected'); // Agrega la clase 'selected' a la imagen clickeada
        });
    });


    document.querySelectorAll('.contenedor_modo_juego button').forEach(button => {
        button.addEventListener('click', () => {
            // Elimina la clase 'selectedgame' de todos los botones
            document.querySelectorAll('.contenedor_modo_juego button').forEach(btn => btn.classList.remove('selectedgame'));
            
            // Agrega la clase 'selectedgame' solo al botón clicado
            button.classList.add('selectedgame');
        });
    });
    
});



