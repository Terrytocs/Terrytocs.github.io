("use strict");

import Game from "./Game.js";

class Main{
    constructor(){
        const canvas=document.getElementById("_canvas"),
        ctx=canvas.getContext("2d"),

        //TEMP START
        mapCanvas=document.getElementById("_map_canvas"),
        mapCtx=mapCanvas.getContext("2d"),
        //TEMP END

        game=new Game(ctx,mapCtx);
    }
}

window.onload=()=>{
    const main=new Main();
}