("use strict");

export default class Cooldown {
    static methods = {
        cooldownInit: (weapon, player) => {
            this.cooldownInit(weapon, player);
        },
        cooldownUpdate: (weapon, player, delta) => {
            this.cooldownUpdate(weapon, player, delta);
        },
        cooldownTeardown: (weapon, player) => {
            this.cooldownTeardown(weapon, player);
        }
    };

    // --- COOLDOWN STATE ---
    static cooldownInit(weapon, player) {}
    static cooldownUpdate(weapon, player, delta) {}
    static cooldownTeardown(weapon, player) {}
}