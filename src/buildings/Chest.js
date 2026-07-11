// src/buildings/Chest.js
// updated: 2026-07-11 (v0.3.2)

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

    contains(entity) {

        return (

            Math.abs(
                entity.sprite.x - this.x
            ) < 16 &&

            Math.abs(
                entity.sprite.y - this.y
            ) < 16

        );

    }

    canAccept(item, amount = 1) {

        return (
            !this.inventory.isFull()
        );

    }

    moveItem(entity) {

        if (
            !entity ||
            !entity.item
        ) {

            return false;

        }

        if (
            !this.inventory.add(
                entity.item
            )
        ) {

            return false;

        }

        if (
            entity.sprite &&
            typeof entity.sprite.disableBody ===
            "function"
        ) {

            entity.sprite.disableBody(
                true,
                true
            );

        }

        return true;

    }

    removeItem(item, amount = 1) {

        return this.inventory.remove(
            item,
            amount
        );

    }

    hasItem(item, amount = 1) {

        return this.inventory.has(
            item,
            amount
        );

    }

    getItemAmount(item) {

        return this.inventory.getAmount(
            item
        );

    }

    getItems() {

        return this.inventory.getItems();

    }

    getItemCount() {

        return this.inventory.size();

    }

    clear() {

        this.inventory.clear();

    }

    update() {

    }

    destroy() {

        this.border.destroy();

        this.sprite.destroy();

    }

}