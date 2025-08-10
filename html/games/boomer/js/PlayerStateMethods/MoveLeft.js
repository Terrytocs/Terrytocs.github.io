("use strict");

export default class MoveLeft {
    static methods = {
        moveLeftInit: (player)=> {
            this.moveLeftInit(player);
        },
        moveLeftUpdate: (player, dt)=> {
            this.moveLeftUpdate(player, dt);
        },
        moveLeftTeardown: (player)=> {
            this.moveLeftTeardown(player);
        }
    }

    // Move Left
    static moveLeftInit(player) {
        player.vel.set(
            -Math.cos(player.dir.x+(Math.PI/2)) * player.speed,
            -Math.sin(player.dir.x+(Math.PI/2)) * player.speed,
            0
        );
        player.enableHeadBob = true;
    }
    static moveLeftUpdate(player,dt) {
        player.move(player.vel,dt);
    }
    static moveLeftTeardown(player) {
        player.vel.set(0, 0, 0);
    }
}