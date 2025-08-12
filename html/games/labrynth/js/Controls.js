("use strict");

import Utils from "./Utils.js";

export default class Controls{
    constructor(game){
        this.game=game;
        this.addEventListeners();
    }
    addEventListeners(){
        window.addEventListener("keydown",this.handleKeydown.bind(this));
        window.addEventListener("keyup",this.handleKeyup.bind(this));
        window.addEventListener("mousedown",this.handleMousedown.bind(this));
        window.addEventListener("mouseup",this.handleMouseup.bind(this));
        window.addEventListener("mousemove",this.handleMousemove.bind(this));
        window.addEventListener("contextmenu",this.handleContextmenu.bind(this));
    }
    handleContextmenu(e){
        e.preventDefault();
    }
    handleKeydown(e){
        this.game.keys[e.key.toLowerCase()]=true;
    }
    handleKeyup(e){
        this.game.keys[e.key.toLowerCase()]=false;
        delete this.game.keys[e.key.toLowerCase()];
    }
    handleMousedown(e){
        if(e.button===0){
            this.game.mouse.leftClick=true;
        }
        if(e.button===2){
            this.game.mouse.rightClick=true;
        }
    }
    handleMouseup(e){
        if(e.button===0){
            this.game.mouse.leftClick=false;
        }
        if(e.button===2){
            this.game.mouse.rightClick=false;
        }
    }
    handleMousemove(e){
        this.game.mouse.movementX=e.movementX;
        this.game.mouse.movementY=e.movementY;
        this.game.mouse.pos=Utils.getMouse(e,this.game.canvas);
    }
}