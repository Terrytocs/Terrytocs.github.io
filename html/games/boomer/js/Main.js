("use strict");

import Game from "./Game.js";

class Main{
    constructor(){
        this.canvas=document.getElementById("_canvas");
        this.ctx=this.canvas.getContext("2d");
        this.mapCanvas=document.getElementById("_mapCanvas");
        this.mapCtx=this.mapCanvas.getContext("2d");
        this.canvas.width=800;
        this.canvas.height=608;
        this.mapCanvas.width=this.canvas.width;
        this.mapCanvas.height=this.canvas.height;
        this.game=new Game(this);
        this.game.init();
    }
    update(f){}
    draw(ctx){}
}

window.addEventListener("load",()=>{
    var main=new Main();
});