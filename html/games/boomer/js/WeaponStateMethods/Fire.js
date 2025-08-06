("use strict");

export default class Fire {
    static methods = {
        fireInit: (weapon, player) => {
            this.fireInit(weapon, player);
        },
        fireUpdate: (weapon, player, delta) => {
            this.fireUpdate(weapon, player, delta);
        },
        fireTeardown: (weapon, player) => {
            this.fireTeardown(weapon, player);
        }
    };

    // --- FIRE STATE ---
    static fireInit(weapon, player) {
        console.log("fire")
    }
    static fireUpdate(weapon, player, delta) {}
    static fireTeardown(weapon, player) {}
}