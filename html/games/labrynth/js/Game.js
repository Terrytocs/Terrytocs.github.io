("use strict");

import Vec2 from "./Vec2.js";
import Scene from "./Scene.js";
import Level from "./Level.js";
import Engine from "./Engine.js";
import Controls from "./Controls.js";

export default class Game{
    constructor(ctx,mapCtx){
        const {canvas}=ctx,
        {width,height}=canvas,
        obj={canvas,ctx,width,height},
        center=new Vec2(width,height).scale(0.5);
        Object.assign(this,obj);

        //TEMP START
        const {mapCanvas}=mapCtx,
        obj1={mapCanvas,mapCtx};
        Object.assign(this,obj1);
        //TEMP END

        this.keys={};
        this.mouse={
            pos:center,
            leftClick:false,
            rightClick:false,
            movementX:0,
            movementY:0
        };

        this.level=new Level().maze;
        this.scene=new Scene(this);
        this.engine=new Engine();
        this.controls=new Controls(this);
        this.update((t)=>{
            this.player.update(t);
        });
        this.draw(()=>{
            this.scene.render(this);
        });

        this.scene.render(this);
        this.scene.renderMinimap(this);

        //this.engine.start();
    }
    update(f=(t)=>{}){
        this.engine.update((t)=>{
            f(t);
        });
    }
    draw(f=()=>{}){
        this.engine.draw(()=>{
            f();
        })
    }
}