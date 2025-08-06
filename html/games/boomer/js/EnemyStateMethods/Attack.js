("use strict");

import Utils from "../Utils.js";

export default class Attack {
    static methods = {
        attackInit: (enemy) => {
            this.attackInit(enemy);
        },
        attackUpdate: (enemy, dt) => {
            this.attackUpdate(enemy, dt);
        },
        attackTeardown: (enemy) => {
            this.attackTeardown(enemy);
        }
    }

    // --- ATTACKING STATE ---
    static attackInit() {
        // Initialization logic for the attacking state
        console.log("Enemy is now attacking.");
    }
    static attackUpdate(deltaTime) {
        // Update logic for the attacking state
        const path = Utils.dijkstra(this.enemy.pos.toGrid(), this.player.pos.toGrid());
        if (path.length > 1) {
            this.enemy.moveToward(path[1]);
        }
        console.log("Enemy is attacking.");
    }
    static attackTeardown() {
        // Teardown logic for the attacking state
        console.log("Enemy is leaving attacking state.");
    }
}