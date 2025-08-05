("use strict");

export default class MoveForward {
    static methods = {
        moveForwardInit: (player)=> {
            this.moveForwardInit(player);
        },
        moveForwardUpdate: (player, dt)=> {
            this.moveForwardUpdate(player, dt);
        },
        moveForwardTeardown: (player)=> {
            this.moveForwardTeardown(player);
        }
    }
    
    // Move Forward
    static moveForwardInit(player) {
        player.vel.set(
            Math.cos(player.dir.x) * player.speed*1.5,
            Math.sin(player.dir.x) * player.speed*1.5,
            0
        );
        player.enableHeadBob = true;
    }
    static moveForwardUpdate(player,dt) {
        player.move(player.vel,dt);
    }
    static moveForwardTeardown(player) {
        player.vel.set(0, 0, 0);
    }
}