// src/buildings/Chest.js
// updated: 2026-07-09 (v0.3.0)

import ChestInventory from "../items/ChestInventory.js";

export default class Chest {

    constructor(scene, x, y) {

        this.scene = scene;

        this.x = x;
        this.y = y;

        this.inventory = new ChestInventory(
            100
        );

        this.sprite = scene.add.rectangle(
            x,
            y,
            32,
            32,
            0x8b5a2b
        );

        this.border = scene.add.rectangle(
            x,
            y,
            32,
            32
        );

        this.border.setStrokeStyle(
            2,
            0x5b3716
        );

        scene.physics.add.existing(
            this.sprite
        );

        this.sprite.body.setImmovable(
            true
        );

        this.sprite.setInteractive();

    }

    contains(item) {

        return (

            Math.abs(
                item.sprite.x - this.x
            ) < 16 &&

            Math.abs(
                item.sprite.y - this.y
            ) < 16

        );

    }

    canAccept() {

        return !this.inventory.isFull();

    }

    moveItem(item) {

        if (
            !this.inventory.add(
                item.item
            )
        ) {

            return false;

        }

        item.destroy();

        return true;

    }

    getItemCount() {

        return this.inventory.size();

    }

    removeItem() {

        return this.inventory.remove();

    }

    update() {

    }

    destroy() {

        this.border.destroy();

        this.sprite.destroy();

    }

}