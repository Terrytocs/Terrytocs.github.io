("use strict");

export default class MoveBackwardLeft {
    static methods = {
        moveBackwardLeftInit: (player)=> {
            this.moveBackwardLeftInit(player);
        },
        moveBackwardLeftUpdate: (player, dt)=> {
            this.moveBackwardLeftUpdate(player, dt);
        },
        moveBackwardLeftTeardown: (player)=> {
            this.moveBackwardLeftTeardown(player);
        }
    }

    // Move Backward
    static moveBackwardLeftInit(player) {
        player.vel.set(
            -Math.cos(player.dir.x+(Math.PI*0.25)) * player.speed,
            -Math.sin(player.dir.x+(Math.PI*0.25)) * player.speed,
            0
        );
        player.enableHeadBob = true;
    }
    static moveBackwardLeftUpdate(player,dt) {
        player.move(player.vel,dt);
    }
    static moveBackwardLeftTeardown(player) {
        player.vel.set(0, 0, 0);
    }
}