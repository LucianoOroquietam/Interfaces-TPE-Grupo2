window.addEventListener("load", () => {
    const loadingContainer = document.querySelector(".loading-container");
    const loadingBar = document.querySelector(".loading-bar");
    const loadingPercentage = document.querySelector(".loading-percentage");
    const content = document.querySelector(".content-show");

    // Mostrar el contenedor de carga
    loadingContainer.style.display = "block";

    let progress = 0;
    const interval = setInterval(() => {
        progress += 1;
        loadingBar.style.width = progress + "%";
        loadingPercentage.textContent = progress + "%";

        if (progress >= 100) {
            clearInterval(interval);
            // Ocultar el contenedor de carga
            loadingContainer.style.display = "none";
            
            content.classList.remove("hidden");
        }
    }, 50); // 50ms * 100 = 5000ms (5 segundos)
});