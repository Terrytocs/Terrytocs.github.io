("use strict");

export default class MoveForwardRight {
    static methods = {
        moveForwardRightInit: (player)=> {
            this.moveForwardRightInit(player);
        },
        moveForwardRightUpdate: (player, dt)=> {
            this.moveForwardRightUpdate(player, dt);
        },
        moveForwardRightTeardown: (player)=> {
            this.moveForwardRightTeardown(player);
        }
    }
    
    // Move Forward
    static moveForwardRightInit(player) {
        player.vel.set(
            Math.cos(player.dir.x+(Math.PI*0.25)) * player.speed,
            Math.sin(player.dir.x+(Math.PI*0.25)) * player.speed,
            0
        );
        player.enableHeadBob = true;
    }
    static moveForwardRightUpdate(player,dt) {
        player.move(player.vel,dt);
    }
    static moveForwardRightTeardown(player) {
        player.vel.set(0, 0, 0);
    }
}