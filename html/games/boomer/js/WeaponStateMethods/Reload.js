("use strict");

export default class Reload {
    static methods = {
        reloadInit: (weapon, player) => {
            this.reloadInit(weapon, player);
        },
        reloadUpdate: (weapon, player, delta) => {
            this.reloadUpdate(weapon, player, delta);
        },
        reloadTeardown: (weapon, player) => {
            this.reloadTeardown(weapon, player);
        }
    };

    // --- RELOAD STATE ---
    static reloadInit(weapon, player) {}
    static reloadUpdate(weapon, player, delta) {}
    static reloadTeardown(weapon, player) {}
}