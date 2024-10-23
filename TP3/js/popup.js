// Obtener los elementos
const popup = document.getElementById("popup");
const shareButton = document.querySelector(".button__compartir");
const closeButton = document.querySelector(".close-btn");
const popupContent = document.querySelector(".popup-content");

// Mostrar el popup cuando se hace clic en el botón de compartir
shareButton.addEventListener("click", function() {
    popup.classList.remove("hidden");
    popup.style.display = "block";
});

// Cerrar el popup cuando se hace clic en la "X"
closeButton.addEventListener("click", function() {
    popup.classList.add("hidden");
    popup.style.display = "none";
});

// Cerrar el popup si se hace clic fuera del contenido
popup.addEventListener("click", function(event) {
    if (event.target == popup) {  // Detecta si se hizo clic fuera del contenido
        popup.classList.add("hidden");
        popup.style.display = "none";
    }
});
