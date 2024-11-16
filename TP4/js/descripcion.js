const images = [
    "img/unnamed_1.png",
    "img/unnamed (3).png",
    "img/unnamed (4).png",
    "img/unnamed (6).png"
];

let index = 1;

console.log(images);
function changeBackground() {
    const img = document.getElementById("descripcion_images");

    img.style.backgroundImage = `url("${images[index]}")`;

    // incrementa el indice para la siguiente imagen
    index = (index + 1) % images.length; // Vuelve al inicio cuando llegue al final
}

setInterval(changeBackground, 3000);