("use strict");

import {EntityEnums} from "./Enum.js";
import Level from "./Level.js";
import Vec3 from "./Vec3.js";

export default class Entity {
    constructor(pos) {
        Object.assign(this,EntityEnums.EntityData); // Assign default entity data from Enums
        this.pos = pos; // Position of the entity
    }
    move(vel,dt){
        const nx = this.pos.x + vel.x * dt;
        const ny = this.pos.y + vel.y * dt;
        const cellX = Math.floor(nx / Level.tileSize);
        const cellY = Math.floor(ny / Level.tileSize);
        const playerX = Math.floor(this.pos.x / Level.tileSize);
        const playerY = Math.floor(this.pos.y / Level.tileSize);

        if(Level.levels[Level.currentLevel][playerY][cellX]===0){
            this.pos.x = nx;
        }
        if(Level.levels[Level.currentLevel][cellY][playerX]===0){
            this.pos.y = ny;
        }
    }
}

