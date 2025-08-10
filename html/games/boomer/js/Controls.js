("use strict");

import {PlayerEnums} from "./Enum.js";
import Utils from "./Utils.js";

export default class Controls{
    constructor(game) {
        this.game=game;
        this.player = game.player;
        this.canvas = game.ctx.canvas;
        this.addEventListeners();
    }
    addEventListeners() {
        window.addEventListener("keydown", (event) => this.handleKeyDown(event));
        window.addEventListener("keyup", (event) => this.handleKeyUp(event));
        window.addEventListener("mousemove", (event) => this.handleMouseMove(event)); 
        window.addEventListener("mousedown", (event) => this.handleMouseDown(event));
        window.addEventListener("mouseup", (event) => this.handleMouseUp(event));
        window.addEventListener("mousewheel",(event) => this.handleMouseWheel(event));
        this.canvas.addEventListener("contextmenu", (event) => event.preventDefault()); 
    }
    handleMouseWheel(event) {
        event.preventDefault();
        
    }
    handleMouseMove(event) {
        this.game.mouse.pos=Utils.getPos(event,this.game.canvas);
        if(!this.game.paused){
            this.game.player.dir.x+=event.movementX*0.01;
        }
    }
    handleMouseDown(event) {
        if (event.button === 0) { // Left mouse button
            this.game.mouse.left_click=true;
        }
        if (event.button === 2) { // Right mouse button
            this.game.mouse.right_click=true;
        }
    }
    handleMouseUp(event) {
        if (event.button === 0) { // Left mouse button
            this.game.mouse.left_click=false;
        }
        if (event.button === 2) { // Right mouse button
            this.game.mouse.right_click=false;
        }
    }
    handleKeyDown(event) {
        this.game.keys[event.key.toLowerCase()]=true;
    }
    handleKeyUp(event) {
         this.game.keys[event.key.toLowerCase()]=false;
         delete this.game.keys[event.key.toLowerCase()];
    }    
}