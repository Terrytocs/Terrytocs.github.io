("use strict");

export default class Idle{
    static methods={
        idleInit: (weapon, player) => {
            this.idleInit(weapon, player);
        }
        , idleUpdate: (weapon, player, delta) => {
            this.idleUpdate(weapon, player, delta);
        }
        , idleTeardown: (weapon, player) => {
            this.idleTeardown(weapon, player);
        }
    };

    // --- IDLE STATE ---
    static idleInit(weapon, player) {
        
    }
    static idleUpdate(weapon, player, delta) {
        
    }
    static idleTeardown(weapon, player) {}
}