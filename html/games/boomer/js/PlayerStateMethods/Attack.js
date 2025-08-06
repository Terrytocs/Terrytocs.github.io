("use strict");

import { WeaponEnums } from "../Enum.js";

export default class Attack {
    static methods = {
        attackInit: (player)=> {
            this.attackInit(player);
        },
        attackUpdate: (player, dt)=>  {
            this.attackUpdate(player, dt);
        },
        attackTeardown: (player)=> {
            this.attackTeardown(player);
        }
    }

    // Attack
    static attackInit(player) {
        player.weapons[player.loadout[player.weaponIndex]].stateMachine.setState(WeaponEnums.WeaponStates.FIRING);
    }
    static attackUpdate(player,dt) {
        
    }
    static attackTeardown(player) {
        
    }
}