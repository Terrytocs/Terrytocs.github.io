("use strict");

export default class MoveRight {
    static methods = {
        moveRightInit: (player)=> {
            this.moveRightInit(player);
        },
        moveRightUpdate: (player, dt)=> {
            this.moveRightUpdate(player, dt);
        },
        moveRightTeardown: (player)=> {
            this.moveRightTeardown(player);
        }
    }

    // Move Right
        static moveRightInit(player) {
            player.vel.set(
                Math.cos(player.dir.x+(Math.PI/2)) * player.speed*0.75,
                Math.sin(player.dir.x+(Math.PI/2)) * player.speed*0.75,
                0
            );
            player.enableHeadBob = true;
        }
        static moveRightUpdate(player,dt) {
            player.move(player.vel,dt);
        }
        static moveRightTeardown(player) {
            player.vel.set(0, 0, 0);
        }
}