/*window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    const content = document.getElementById("content");
    setTimeout(() => {
        loader.style.display = "none";
        content.style.display = "block";
    }, 2000); 
});
*/

let progress = 0;
const progressBar = document.getElementById('progress');
const loader = document.getElementById("loader");
const content = document.getElementById("content");

// Función para aumentar el progreso de la barra
function simulateLoading() {
    if (progress < 100) {
        progress += 1;
        progressBar.style.width = progress + '%';
        progressBar.style.background = "#4caf50";
    } else {
        setTimeout(() => {
            loader.style.display = "none";
            content.style.display = "block";
        }, 500); 
    }
}

setInterval(simulateLoading, 50);