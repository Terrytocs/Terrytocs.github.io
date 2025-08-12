("use strict");

import Raycaster from "./Raycaster.js";
import Images from "./Images.js";
import Player from "./Player.js";
import Level from "./Level.js";
import Utils from "./Utils.js";
import Vec2 from "./Vec2.js";

export default class Scene{
    constructor(game){
        this.game=game;

        this.init(game);
    }
    render(game){
        const {player,ctx}=game,
        rays=player.raycaster.getRays(player),
        screenHeight=game.height,screenWidth=game.width,
        halfScreenHeight=Math.floor(screenHeight*0.5);
        rays.forEach((ray,i)=>{
            const distance=Utils.fixFisheye(ray.angle,player.angle,ray.distance),
            scaleFactor=(Level.tileSize*Level.scaleFactor),
            wallHeight=(scaleFactor/distance)*3,
            halfWallHeight=Math.floor(wallHeight*0.5);
            
            //DRAW MAP
            let shade;
            ctx.fillStyle=ray.vertical?"#333":"#555";
            ctx.fillRect(i,(halfScreenHeight-halfWallHeight),1,wallHeight);

            ctx.fillStyle="hsl(355, 40.70%, 17.80%)";
            ctx.fillRect(i,halfScreenHeight+halfWallHeight,1,halfScreenHeight-halfWallHeight);

            shade=200-(i/screenWidth)*50;
            ctx.fillStyle=`rgb(${shade},${shade+30},200)`;
            ctx.fillRect(i,0,1,halfScreenHeight-halfWallHeight);

            shade=255-distance*0.5;
            ctx.fillStyle=`rgba(${shade},${shade},${shade},${Math.min(0.5,distance*0.1)})`
            ctx.fillRect(i,halfScreenHeight-halfWallHeight,1,wallHeight);

            //PLAYER ANIMATIONS
            //ctx.drawImage(player.currentImage,player.currentAnimation[0],player.currentAnimation[1],player.currentAnimation[2],player.currentAnimation[3],player.currentAnimation[4],player.currentAnimation[5],player.currentAnimation[6],player.currentAnimation[7]);
        });
    }
    renderMinimap(){
        for(let i=0;i<Level.size.x*Level.size.y;++i){
            const x=i%Level.size.x,y=(i-x)/Level.size.x;

            if(Level.getPos(new Vec2(x,y),this.game.level)){
                this.game.mapCtx.fillRect(x*Level.tileSize/8,y*Level.tileSize/8,Level.tileSize/8,Level.tileSize/8);
            }
        }
    }
    init(game){
        game.player=new Player(game,new Vec2(1.5,1.5).scale(Level.tileSize));
        game.player.raycaster=new Raycaster(game);
    }
}