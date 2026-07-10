// src/systems/ItemSystem.js
// updated: 2026-07-10 (v0.3.1)

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

        this.items.push(
            entity
        );

        return entity;

    }

    spawnEntity(
        item,
        x,
        y
    ) {

        const entity =
            new ItemEntity(
                this.scene,
                x,
                y,
                item
            );

        entity.sprite.body.setVelocity(
            0,
            0
        );

        entity.sprite.body.setDrag(
            0
        );

        entity.setState(
            "BELT"
        );

        this.items.push(
            entity
        );

        return entity;

    }

    remove(entity) {

        const index =
            this.items.indexOf(
                entity
            );

        if (
            index === -1
        ) {

            return;

        }

        this.items.splice(
            index,
            1
        );

    }

    update() {

        for (
            let i =
                this.items.length - 1;
            i >= 0;
            i--
        ) {

            const item =
                this.items[i];

            if (
                !item.sprite.active
            ) {

                this.items.splice(
                    i,
                    1
                );

                continue;

            }

            const picked =
                item.update(
                    this.player.sprite
                );

            if (picked) {

                this.player.inventory.addItem(
                    item.item
                );

                this.items.splice(
                    i,
                    1
                );

                continue;

            }

            if (
                !item.sprite.body
            ) {

                continue;

            }

            if (
                item.state ===
                "BELT"
            ) {

                item.sprite.body.setDrag(
                    0
                );

            } else {

                item.sprite.body.setDrag(
                    120
                );

            }

        }

    }

}