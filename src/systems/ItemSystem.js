// src/systems/ItemSystem.js
// updated: 2026-07-03

import ItemEntity from "../items/ItemEntity.js";

export default class ItemSystem {

    constructor(scene, player) {

        this.scene = scene;
        this.player = player;

        this.items = [];

    }

    spawn(item, x, y, amount = 1) {

        const entity = new ItemEntity(
            this.scene,
            x,
            y,
            item,
            amount
        );

        this.items.push(entity);

    }

    update() {

        for (let i = this.items.length - 1; i >= 0; i--) {

            const item = this.items[i];

            const picked = item.update(
                this.player.sprite
            );

            if (picked) {

                this.player.inventory.addItem(
                    item.item
                );

                this.items.splice(i, 1);

                continue;

            }

            if (item.state === "BELT") {

                item.sprite.body.setDrag(0);

            } else {

                item.sprite.body.setDrag(120);

            }

        }

    }

}