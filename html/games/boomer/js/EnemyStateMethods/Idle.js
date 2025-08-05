("use strict");

export default class Idle {
    static methods = {
        idleInit: (enemy) => {
            this.idleInit(enemy);
        },
        idleUpdate: (enemy, dt) => {
            this.idleUpdate(enemy, dt);
        },
        idleTeardown: (enemy) => {
            this.idleTeardown(enemy);
        }
    }

    // --- IDLE STATE ---
    static idleInit() {
        // Initialization logic for the idle state
        console.log("Enemy is now idle.");
    }
    static idleUpdate(deltaTime) {
        // Update logic for the idle state
        console.log("Enemy is idling.");
    }
    static idleTeardown() {
        // Teardown logic for the idle state
        console.log("Enemy is leaving idle state.");
    }
}