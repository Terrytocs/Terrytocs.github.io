("use strict");

export default class MoveForwardLeft {
    static methods = {
        moveForwardLeftInit: (player)=> {
            this.moveForwardLeftInit(player);
        },
        moveForwardLeftUpdate: (player, dt)=> {
            this.moveForwardLeftUpdate(player, dt);
        },
        moveForwardLeftTeardown: (player)=> {
            this.moveForwardLeftTeardown(player);
        }
    }
    
    // Move Forward
    static moveForwardLeftInit(player) {
        player.vel.set(
            Math.cos(player.dir.x-(Math.PI*0.25)) * player.speed,
            Math.sin(player.dir.x-(Math.PI*0.25)) * player.speed,
            0
        );
        player.enableHeadBob = true;
    }
    static moveForwardLeftUpdate(player,dt) {
        player.move(player.vel,dt);
    }
    static moveForwardLeftTeardown(player) {
        player.vel.set(0, 0, 0);
    }
}