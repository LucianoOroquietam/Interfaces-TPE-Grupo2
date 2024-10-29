document.addEventListener("DOMContentLoaded", () => {

    let canvas = document.querySelector('#canvas');
    let ctx = canvas.getContext('2d');
    let canvasWidth = canvas.width;
    let canvasHeight = canvas.height;

    let juego = new Juego(ctx, canvasWidth, canvasHeight, '5-en-linea');
    
    juego.initGame();
    juego.draw();



    /*
    let board = new Tablero(7, 6, 70, ctx, '././img/ImgCelda.svg');
    board.setBoardX(canvasWidth);
    board.setBoardY(canvasHeight);
    board.createCells();



    //Ficha 
    let ficha1;
    let tokenRadius = 20;
    let numTokens = 20;
    let fichas = [];

    function generateFichas(){
        for(let i = 0; i <= numTokens; i++){
            ficha1 = new Ficha(50, i*30, ctx, '', { x: 50, y: 50 }, 'Jugador 1', board, tokenRadius);
            
            fichas.push(ficha1);
        }
    }
    generateFichas();

    let lastClickedFigure = null;
    let isMouseDown = false;
    
    function onMouseDown(event){
        isMouseDown = true;

        if (lastClickedFigure != null) {
            lastClickedFigure = null;
        }

        let clickFig = findClickedFigure(event.layerX, event.layerY);
        if (clickFig != null) {     
            lastClickedFigure = clickFig;  // <-- Guardo la referencia de la última figura clickeada
        }

        draw(); 
    }



    function onMouseMove(event){
        if(isMouseDown && lastClickedFigure!=null){
            lastClickedFigure.setPosition(event.layerX, event.layerY);
            draw();
        }
    }


    function onMouseUp(event){
        isMouseDown = false;
        if(!estaentablero){
            volve
        }
    }

    function findClickedFigure(x,y){
        for(let i = 0; i< fichas.length; i++){
            let element = fichas[i];
            if(element.isPointFigure(x,y)){
                return element;
            }
        }
    }

    function draw() {
    
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        board.drawBoard();

        fichas.forEach(ficha => {
            ficha.draw();
            canvas.addEventListener('mousedown', onMouseDown, false);
            canvas.addEventListener('mouseup', onMouseUp, false);
            canvas.addEventListener('mousemove', onMouseMove, false);

                                    canvas.addEventListener("click", (evento) => {
                                        const rect = canvas.getBoundingClientRect();
                                        const x = evento.clientX - rect.left;
                                        const y = evento.clientY - rect.top;
                                
                                        if (ficha.clickedMe(x, y)) {
                                            console.log("Ficha clickeada!");
                                
                                            ficha.setPosition(x, y);
                                            draw(); 
                                        }
                                    });
        });

        
    }


    draw();   
    */

    

    

});
