("use strict");

import Engine from "./Engine.js";
import Level from "./Level.js";
import Player from "./Player.js";
import Enemy from "./Enemy.js";
import SceneRender from "./SceneRender.js";
import Vec3 from "./Vec3.js";
import Controls from "./Controls.js";
import Utils from "./Utils.js";

export default class Game{
    constructor(main){
        this.ctx=main.ctx;
        this.canvas=this.ctx.canvas;
        const {width,height}=this.canvas;
        this.mapCtx=main.mapCtx;
        this.entities=[];
        this.enemyEntities=[];
        this.engine=new Engine();
        this.mouse={
            pos:new Vec3(width,height).scale(0.5),
            left_click:false,
            right_click:false
        };
        this.keys={};
        this.paused=false;

        this.init();
        
        this.update((deltaTime)=>{
            this.entities.forEach((entity)=>{
                entity.update(deltaTime,this.keys);
            });
        });
        this.draw((ctx)=>{
            const rays=Utils.getRays(this.player, this.ctx.canvas.width);
            this.sceneRender.render(rays, this.player); // Render the scene with rays and player
            this.sceneRender.miniMapRender(rays); // Render minimap
        });
        this.engine.start();

        
    }
    update(f){
        this.engine.update((deltaTime)=>{
            f(deltaTime);
        });
    }
    draw(f) {
        this.engine.draw(() => {
            this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
            f(this.ctx);
        });
    }
    init() {
        this.player = new Player(new Vec3(1.5, 1.5, 0).scale(Level.tileSize));
        this.controls = new Controls(this);
    
        this.entities.push(this.player);
    
        this.sceneRender = new SceneRender({
            ctx: this.ctx,
            mapCtx: this.mapCtx,
            player: this.player,
            entities: this.entities,
            map: Level,
        });
    }
}