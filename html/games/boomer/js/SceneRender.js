("use strict");

import Level from "./Level.js";
import Utils from "./Utils.js";
import Textures from "./Textures.js";
import PlayerAnimations from "./PlayerAnimations.js"

export default class SceneRender {
    constructor(opt) {
        Object.assign(this, opt); // Assign options to the instance
        this.fov = Math.PI / 3;
    }

    render(rays,player) {
        const ctx=this.ctx;
        const screenHeight=ctx.canvas.height;
        const halfScreenHeight=Math.floor(screenHeight/2);
        const screenWidth=ctx.canvas.width;
        const halfScreenWidth=Math.floor(screenWidth/2);
        const crosshairLength=10;

        rays.forEach((ray,i) => {
            const distance=Utils.fixFishEye(ray.distance,ray.angle,this.player.dir.x);
            const wallHeight=((Level.tileSize*Level.scaleFactor)/distance)*halfScreenHeight;
            const halfWallHeight=Math.floor(wallHeight/2);
            
            /*//WALLS
            const shade=ray.vertical?(255-distance*0.7): (255-distance*0.5);
            ctx.fillStyle = `rgba(${shade}, ${shade}, ${shade}, 1)`;
            ctx.fillRect(i,(halfScreenHeight-halfWallHeight)+player.headBob,1,wallHeight);
            //console.log(player.headBob);*/

            // CEILING
            const ceilingIntensity = 200 - (i / ctx.canvas.width) * 50; 
            ctx.fillStyle = `rgb(${ceilingIntensity}, ${ceilingIntensity + 30}, 255)`;
            ctx.fillRect(i, 0, 1, (halfScreenHeight - halfWallHeight)+player.headBob-player.dir.y);

            // FLOOR
            const floorIntensity = 100 - (i / ctx.canvas.width) * 30;
            const r = Math.max(60, floorIntensity + 20);     // warm brown
            const g = Math.max(40, floorIntensity + 10);     // muted green for earthiness
            const b = Math.max(20, floorIntensity);          // very low blue
            ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
            ctx.fillRect(i, (halfScreenHeight + halfWallHeight)+player.headBob-player.dir.y, 1, (halfScreenHeight - halfWallHeight)+(-player.headBob)+player.dir.y);
            
            
            //TEXTURE RENDERING
            const texture=Textures.textures.types.walls[ray.wallType];
            const texHeight=texture.height;

            const scale=(Level.tileSize*Level.scaleFactor);
            // Determine X offset into the texture
            let hitOffset = ray.vertical
            ? ray.wallHit.y
            : ray.wallHit.x;
            
            const textureX = Math.floor(hitOffset-Math.floor(hitOffset / scale) * scale);

            // Optional shading
            const shade = ray.vertical?Math.max(0, 255 - distance * 0.5):Math.max(0, 255 - distance * 0.3);
            ctx.globalAlpha = Math.min(1, shade / 255);

            ctx.drawImage(
                texture,
                textureX,
                0,
                1, 
                texHeight,
                i,
                (halfScreenHeight - halfWallHeight)+player.headBob-player.dir.y,
                1, 
                wallHeight 
            );

            ctx.globalAlpha = 1;

            //CROSSHAIR
            ctx.beginPath();
            ctx.strokeStyle = "#fff";
            ctx.moveTo(halfScreenWidth-crosshairLength, halfScreenHeight);
            ctx.lineTo(halfScreenWidth+crosshairLength, halfScreenHeight);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(halfScreenWidth, halfScreenHeight-crosshairLength);
            ctx.lineTo(halfScreenWidth, halfScreenHeight+crosshairLength);
            ctx.stroke();
            
            //PLAYER SPRITE RENDERING
            if(this.player.currentWeaponSprite){
                const weapon=this.player.currentWeaponSprite;
                ctx.drawImage(weapon,this.player.currentFrame[0],this.player.currentFrame[1],this.player.currentFrame[2],this.player.currentFrame[3],screenWidth-this.player.frameOffset[0],screenHeight-this.player.frameOffset[1],this.player.frameOffset[2],this.player.frameOffset[3]);
            }
        });
    }
    miniMapRender(rays){
        const ctx = this.ctx;
        const mapCtx = this.mapCtx;
        const player = this.player;
        const tileSize = Level.tileSize;

        // Draw the minimap background
        mapCtx.fillStyle = "#000";
        mapCtx.fillRect(0, 0, mapCtx.canvas.width, mapCtx.canvas.height);

        // Draw the map tiles
        for(let i=0;i<Level.width*Level.height;++i){
            const x=(i%Level.width);
            const y=((i-x)/Level.width);
            if (Level.isWall(x, y)) {
                mapCtx.fillStyle = "#888"; // Wall color
                mapCtx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
            }
        }
            

        // Draw the player position
        mapCtx.fillStyle = "#f00"; // Player color
        mapCtx.beginPath();
        mapCtx.arc(player.pos.x, player.pos.y, 5, 0, Math.PI * 2);
        mapCtx.fill();
        mapCtx.strokeStyle = "#f00"; // Player outline color
        mapCtx.beginPath();
        mapCtx.moveTo(player.pos.x, player.pos.y);
        mapCtx.lineTo(player.pos.x + Math.cos(player.dir.x) * 10, player.pos.y + Math.sin(player.dir.x) * 10);
        mapCtx.stroke();

        mapCtx.strokeStyle = "#fff"; // Ray outline color
        // Draw rays if provided
        if (rays) {
            rays.forEach(ray => {
                mapCtx.beginPath();
                mapCtx.moveTo(player.pos.x, player.pos.y);
                mapCtx.lineTo(player.pos.x+Math.cos(ray.angle)*ray.distance, player.pos.y+Math.sin(ray.angle)*ray.distance);
                mapCtx.stroke();
            });
        }
    }
}