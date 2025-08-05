("use strict");

import Level from "./Level.js";
import Vec3 from "./Vec3.js";

export default class Utils {
    // Raycast against the map grid (used by player)
    static getHCollision(player) {
        const up=Math.abs(Math.floor(player.rayAngles/Math.PI)%2);

        const firstY=up ? Math.floor(player.pos.y/Level.tileSize)*Level.tileSize : Math.floor(player.pos.y/Level.tileSize)*Level.tileSize+Level.tileSize;
        const firstX=player.pos.x+(firstY-player.pos.y)/Math.tan(player.rayAngles);
        const firstVec=new Vec3(firstX,firstY,0);

        const stepY=up ? -Level.tileSize : Level.tileSize;
        const stepX=stepY/Math.tan(player.rayAngles);
        const stepVec=new Vec3(stepX,stepY,0);

        let newVec=firstVec;
        let wall=null;
        while(!wall){
            const cellY=up? Math.floor(newVec.y/Level.tileSize)-1: Math.floor(newVec.y/Level.tileSize);
            const cellX=Math.floor(newVec.x/Level.tileSize);

            if(Level.outOfBounds(cellX,cellY)){
                break;
            }

            wall=Level.levels[Level.currentLevel][cellY][cellX];
            if(!wall){
                newVec=newVec.add(stepVec);
            }
        }
        
        return {
            angle: player.rayAngles,
            distance:player.pos.distanceTo(newVec),
            vertical: false,
            wallType:wall,
            wallHit:newVec
        };
    }

    static getVCollision(player) {
        const right=Math.abs(Math.floor((player.rayAngles-(Math.PI/2))/Math.PI)%2);

        const firstX=right ? Math.floor(player.pos.x/Level.tileSize)*Level.tileSize+Level.tileSize : Math.floor(player.pos.x/Level.tileSize)*Level.tileSize;
        const firstY=player.pos.y+(firstX-player.pos.x)*Math.tan(player.rayAngles);
        const firstVec=new Vec3(firstX,firstY,0);

        const stepX=right ? Level.tileSize : -Level.tileSize;
        const stepY=stepX*Math.tan(player.rayAngles);
        const stepVec=new Vec3(stepX,stepY,0);

        let newVec=firstVec;
        let wall=null;
        while(!wall){
            const cellX=right? Math.floor(newVec.x/Level.tileSize): Math.floor(newVec.x/Level.tileSize)-1;
            const cellY=Math.floor(newVec.y/Level.tileSize);

            if(Level.outOfBounds(cellX,cellY)){
                break;
            }

            wall=Level.levels[Level.currentLevel][cellY][cellX];
            if(!wall){
                newVec=newVec.add(stepVec);
            }
        }
        
        return {
            angle: player.rayAngles,
            distance:player.pos.distanceTo(newVec),
            vertical: true,
            wallType:wall,
            wallHit:newVec
        };
    }

    static castRays(player) {
        const hCollision=this.getHCollision(player);
        const vCollision=this.getVCollision(player);

        return hCollision.distance<vCollision.distance ? hCollision : vCollision;
    }

    static getRays(player,width) {
        const numberOfRays=width;
        const FOVInRadians=Utils.toRadians(player.FOV);
        const halfFOV=FOVInRadians / 2;

        return Array.from({ length: numberOfRays }, (_, i) => {
            const rayAngle=this.lerp(-halfFOV, halfFOV, (i+0.5) / numberOfRays) + player.dir.x;
            player.rayAngles=rayAngle;
            const ray= Utils.castRays(player);
            return ray;
        });
    }

    static toRadians(degrees) {
        return degrees * (Math.PI / 180);
    }

    static fixFishEye(distance,angle,playerAng){
        const angleDiff = angle - playerAng;
        return distance * Math.cos(angleDiff);
    }

    static lerp(s,e,t){
        return s + (e - s) * t;
    }

    static clamp(s,e,x){
        return Math.min(s,Math.max(x,e));
    }

    static getPos(e,elem){
        const rect=elem.getBoundingClientRect();
        return new Vec3(e.clientX-rect.left,e.clientY-rect.top);
    }

    // Dijkstra pathfinding on current map (used by enemies)
    static dijkstraMap(startTile) {
        const level = Level.levels[Level.currentLevel];
        const width = level[0].length;
        const height = level.length;
        const costs = Array.from({ length: height }, () => Array(width).fill(Infinity));
        const visited = Array.from({ length: height }, () => Array(width).fill(false));

        const queue = [{ x: startTile.x, y: startTile.y, cost: 0 }];
        costs[startTile.y][startTile.x] = 0;

        const directions = [
            { x: 0, y: -1 }, { x: 1, y: 0 },
            { x: 0, y: 1 }, { x: -1, y: 0 }
        ];

        while (queue.length > 0) {
            const { x, y, cost } = queue.shift();

            if (visited[y][x]) continue;
            visited[y][x] = true;

            for (const dir of directions) {
                const nx = x + dir.x;
                const ny = y + dir.y;

                if (
                    nx >= 0 && nx < width &&
                    ny >= 0 && ny < height &&
                    level[ny][nx] === 0 &&
                    cost + 1 < costs[ny][nx]
                ) {
                    costs[ny][nx] = cost + 1;
                    queue.push({ x: nx, y: ny, cost: cost + 1 });
                }
            }
        }

        return costs;
    }
}