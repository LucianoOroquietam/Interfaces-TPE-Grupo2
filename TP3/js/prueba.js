let canvas = document.querySelector("#canvas")
let img = document.querySelector("#prueba2")
let boton = document.querySelector("#prueba")


boton.addEventListener("click", ()=>{
    canvas.classList.remove("hidden");
    boton.classList.add("hidden");
    img.classList.add("hidden");

});