("use strict");

export default class MoveBackwardRight {
    static methods = {
        moveBackwardRightInit: (player)=> {
            this.moveBackwardRightInit(player);
        },
        moveBackwardRightUpdate: (player, dt)=> {
            this.moveBackwardRightUpdate(player, dt);
        },
        moveBackwardRightTeardown: (player)=> {
            this.moveBackwardRightTeardown(player);
        }
    }

    // Move Backward
    static moveBackwardRightInit(player) {
        player.vel.set(
            -Math.cos(player.dir.x-(Math.PI*0.25)) * player.speed,
            -Math.sin(player.dir.x-(Math.PI*0.25)) * player.speed,
            0
        );
        player.enableHeadBob = true;
    }
    static moveBackwardRightUpdate(player,dt) {
        player.move(player.vel,dt);
    }
    static moveBackwardRightTeardown(player) {
        player.vel.set(0, 0, 0);
    }
}