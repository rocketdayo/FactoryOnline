// src/systems/MiningSystem.js
// updated: 2026-07-03

import ItemDatabase from "../items/ItemDatabase.js";

export default class MiningSystem {

    constructor(scene, worldSystem, player, uiSystem, itemSystem) {

        this.scene = scene;
        this.worldSystem = worldSystem;
        this.player = player;
        this.uiSystem = uiSystem;
        this.itemSystem = itemSystem;

    }

    mine() {

        const ore = this.worldSystem.getNearbyOre(
            this.player.sprite
        );

        if (!ore) return;

        const destroyed = ore.mine();

        if (!destroyed) return;

        let item = null;

        switch (ore.type) {

            case "iron":
                item = ItemDatabase.ironOre;
                break;

            case "copper":
                item = ItemDatabase.copperOre;
                break;

            case "gold":
                item = ItemDatabase.goldOre;
                break;

        }

        if (item) {

            this.itemSystem.spawn(
                item,
                ore.sprite.x,
                ore.sprite.y
            );

        }

    }

}