("use strict");

export default class MoveBackward {
    static methods = {
        moveBackwardInit: (player)=> {
            this.moveBackwardInit(player);
        },
        moveBackwardUpdate: (player, dt)=> {
            this.moveBackwardUpdate(player, dt);
        },
        moveBackwardTeardown: (player)=> {
            this.moveBackwardTeardown(player);
        }
    }

    // Move Backward
    static moveBackwardInit(player) {
        player.vel.set(
            -Math.cos(player.dir.x) * player.speed*1.3,
            -Math.sin(player.dir.x) * player.speed*1.3,
            0
        );
        player.enableHeadBob = true;
    }
    static moveBackwardUpdate(player,dt) {
        player.move(player.vel,dt);
    }
    static moveBackwardTeardown(player) {
        player.vel.set(0, 0, 0);
    }
}