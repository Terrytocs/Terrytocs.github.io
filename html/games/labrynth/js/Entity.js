("use strict");

import Level from "./Level.js";

export default class Entity{
    constructor(game,pos){
        this.game=game;
        this.pos=pos;
        this.angle=0;
        this.FOV=60;
        this.animationFrame=0;
    }
    move(pos){
        const newPos=this.pos.add(pos),
        {level}=this.game;
        if(Level.isNotWall(newPos,level)){
            this.pos=newPos;
        }
    }
}