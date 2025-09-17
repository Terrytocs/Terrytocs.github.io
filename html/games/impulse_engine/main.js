("use strict");

import InputHandler from "./js/InputHandler.js";
import Physics      from "./js/Physics.js";
import Engine       from "./js/Engine.js";
import Game         from "./js/Game.js";

class Main{
    static screen(id){
        const   canvas=document.getElementById(id),
                ctx=canvas.getContext("2d"),
                [width,height]=[800,450],
                allObjects=[];
                Object.assign(canvas,{width,height});

        return  {ctx,width,height,allObjects};
    }

    constructor(id){
                this.engine=new Engine();
                this.screen=Main.screen(id);
                this.game=new Game(this.screen);
                this.inputHandler=this.handleInput(this.screen);
                
                this.engine.update(()=>{
                    //Physics.collision(this.screen);
                    this.update(this.screen);
                });
                this.engine.draw(()=>{
                    this.draw(this.screen);
                    Physics.collision(this.screen);//TEMPORARY FOR TESTING
                });
                //this.engine.start();
    }

    handleInput(screen){
        const   keydownListener=window.addEventListener("keydown",e=>InputHandler.handleUserInput(e,screen));
    }
    update(screen){
        const   {allObjects}=screen;
        let     i;
        for(i=0;i<allObjects.length;++i){
                allObjects[i].update();
        }
    }
    draw(screen){
        const   {ctx,width,height,allObjects}=screen;
                ctx.clearRect(0,0,width,height);
        let     i;
        for(i=0;i<allObjects.length;++i){
                ctx.strokeStyle="blue";
                if(i===InputHandler.objectNum)ctx.strokeStyle="red";
                allObjects[i].draw(ctx);
        }
    }
}

const main=new Main("_canvas"),
load=window.addEventListener("load",e=>main);
export default main.screen;    