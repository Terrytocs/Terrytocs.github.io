("use strict");

export default class WeaponSwitch {
    static methods = {
        switchInit: (weapon, player) => {
            this.switchInit(weapon, player);
        },
        switchUpdate: (weapon, player, delta) => {
            this.switchUpdate(weapon, player, delta);
        },
        switchTeardown: (weapon, player) => {
            this.switchTeardown(weapon, player);
        }
    };

    // --- SWITCH STATE ---
    static switchInit(weapon, player) {}
    static switchUpdate(weapon, player, delta) {}
    static switchTeardown(weapon, player) {}
}