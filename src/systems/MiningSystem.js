import ItemDatabase from "../items/ItemDatabase.js";

export default class MiningSystem {

    constructor(scene, worldSystem, player, uiSystem) {

        this.scene = scene;
        this.worldSystem = worldSystem;
        this.player = player;
        this.uiSystem = uiSystem;

    }

    mine() {

        const ore = this.worldSystem.getNearbyOre(
            this.player.sprite
        );

        if (!ore) return;

        const destroyed = ore.mine();

        if (!destroyed) return;

        switch (ore.type) {

            case "iron":

                this.player.inventory.addItem(
                    ItemDatabase.ironOre
                );

                break;

            case "copper":

                this.player.inventory.addItem(
                    ItemDatabase.copperOre
                );

                break;

            case "gold":

                this.player.inventory.addItem(
                    ItemDatabase.goldOre
                );

                break;

        }

        this.uiSystem.inventoryUI.update();

    }

}