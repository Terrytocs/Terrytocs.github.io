("use srict");

import Level from "./Level.js";
import Utils from "./Utils.js";
import Vec2 from "./Vec2.js";

export default class Raycaster{
    constructor(game){
        this.game=game;
    }
    getRays(entity){
        const {FOV}=entity,
        halfFOV=Utils.toRad(FOV*0.5),
        width=this.game.width;

        return Array.from({length:width},(_,i)=>{
            entity.rayAngles=Utils.lerp(-halfFOV,halfFOV,(i/width))+entity.angle;
            const rays=this.castRays(entity);
            return rays;
        });
    }
    castRays(entity){
        const hCollision=this.hCollision(entity),
        vCollision=this.vCollision(entity);

        return hCollision.distance<vCollision.distance?hCollision:vCollision;
    }
    hCollision(entity){
        const up=Math.abs(Math.floor(entity.rayAngles/Math.PI)%2);

        const firstY=up?Math.floor(entity.pos.y/Level.tileSize)*Level.tileSize:Math.floor(entity.pos.y/Level.tileSize)*Level.tileSize+Level.tileSize,
        firstX=entity.pos.x+(firstY-entity.pos.y)/Math.tan(entity.rayAngles),
        firstVec=new Vec2(firstX,firstY);

        const stepY=up?-Level.tileSize:Level.tileSize,
        stepX=stepY/Math.tan(entity.rayAngles),
        stepVec=new Vec2(stepX,stepY);

        let nextVec=firstVec,
        wall;
        while(!wall){
            const cellY=up?Math.floor(nextVec.y/Level.tileSize)-1:Math.floor(nextVec.y/Level.tileSize),
            cellX=Math.floor(nextVec.x/Level.tileSize),
            cellVec=new Vec2(cellX,cellY);

            if(Level.outOfBounds(cellVec,this.game.level)){
                break;
            }

            wall=Level.getPos(cellVec,this.game.level);
            if(!wall){
                nextVec=nextVec.add(stepVec);
            }
        }

        return {
            distance:entity.pos.distanceTo(nextVec),
            angle:entity.rayAngles,
            wallHit:nextVec,
            vertical:false,
            type:wall
        };
    }
    vCollision(entity){
        const right=Math.abs(Math.floor((entity.rayAngles-Math.PI*0.5)/Math.PI)%2);

        const firstX=right?Math.floor(entity.pos.x/Level.tileSize)*Level.tileSize+Level.tileSize:Math.floor(entity.pos.x/Level.tileSize)*Level.tileSize,
        firstY=entity.pos.y+(firstX-entity.pos.x)*Math.tan(entity.rayAngles),
        firstVec=new Vec2(firstX,firstY);

        const stepX=right?Level.tileSize:-Level.tileSize,
        stepY=stepX*Math.tan(entity.rayAngles),
        stepVec=new Vec2(stepX,stepY);

        let nextVec=firstVec,
        wall;
        while(!wall){
            const cellX=right?Math.floor(nextVec.x/Level.tileSize):Math.floor(nextVec.x/Level.tileSize)-1,
            cellY=Math.floor(nextVec.y/Level.tileSize),
            cellVec=new Vec2(cellX,cellY);

            if(Level.outOfBounds(cellVec,this.game.level)){
                break;
            }

            wall=Level.getPos(cellVec,this.game.level);
            if(!wall){
                nextVec=nextVec.add(stepVec);
            }
        }

        return {
            distance:entity.pos.distanceTo(nextVec),
            angle:entity.rayAngles,
            wallHit:nextVec,
            vertical:true,
            type:wall
        }
    }
}