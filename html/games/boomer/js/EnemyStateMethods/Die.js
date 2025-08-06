("use strict");

export default class Die {
    static methods = {
        dieInit: (enemy) => {
            this.dieInit(enemy);
        },
        dieUpdate: (enemy, dt) => {
            this.dieUpdate(enemy, dt);
        },
        dieTeardown: (enemy) => {
            this.dieTeardown(enemy);
        }
    }

    // --- DYING STATE ---
    static dieInit() {
        // Initialization logic for the dying state
        console.log("Enemy is now dying.");
    }
    static dieUpdate(deltaTime) {
        // Update logic for the dying state
        console.log("Enemy is dying.");
    }
    static dieTeardown() {
        // Teardown logic for the dying state
        console.log("Enemy has died.");
    }
}