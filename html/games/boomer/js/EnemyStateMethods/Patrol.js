("use strict");

export default class Patrol {
    static methods = {
        patrolInit: (enemy) => {
            this.patrolInit(enemy);
        },
        patrolUpdate: (enemy, dt) => {
            this.patrolUpdate(enemy, dt);
        },
        patrolTeardown: (enemy) => {
            this.patrolTeardown(enemy);
        }
    }

    // --- PATROLLING STATE ---
        static patrollingInit() {
            // Initialization logic for the patrolling state
            console.log("Enemy is now patrolling.");
        }
        static patrollingUpdate(deltaTime) {
            // Update logic for the patrolling state
            console.log("Enemy is patrolling.");
        }
        static patrollingTeardown() {
            // Teardown logic for the patrolling state
            console.log("Enemy is leaving patrolling state.");
        }
}