// src/buildings/Inserter.js
// updated: 2026-07-10 (v0.3.1)

export default class Inserter {

    constructor(
        scene,
        x,
        y,
        direction = "right"
    ) {

        this.scene = scene;

        this.x = x;
        this.y = y;

        this.direction = direction;

        this.cooldown = 300;

        this.timer = 0;

        this.progress = 0;

        this.heldItem = null;

        this.sprite = scene.add.rectangle(
            x,
            y,
            32,
            32,
            0xeab308
        );

        this.arm = scene.add.line(
            0,
            0,
            x,
            y,
            x,
            y,
            0x202020
        );

        this.hand = scene.add.circle(
            x,
            y,
            4,
            0xffffff
        );

        this.arrow = scene.add.text(
            x - 7,
            y - 12,
            "",
            {
                fontSize: "20px",
                color: "#000000"
            }
        );

        scene.physics.add.existing(
            this.sprite
        );

        this.sprite.body.setImmovable(
            true
        );

        this.updateArrow();

    }

    updateArrow() {

        switch (
            this.direction
        ) {

            case "right":

                this.arrow.setText(
                    "▶"
                );

                break;

            case "left":

                this.arrow.setText(
                    "◀"
                );

                break;

            case "up":

                this.arrow.setText(
                    "▲"
                );

                break;

            case "down":

                this.arrow.setText(
                    "▼"
                );

                break;

        }

    }

    getInputPosition() {

        switch (
            this.direction
        ) {

            case "right":

                return {

                    x: this.x - 32,
                    y: this.y

                };

            case "left":

                return {

                    x: this.x + 32,
                    y: this.y

                };

            case "up":

                return {

                    x: this.x,
                    y: this.y + 32

                };

            case "down":

                return {

                    x: this.x,
                    y: this.y - 32

                };

        }

    }

    getOutputPosition() {

        switch (
            this.direction
        ) {

            case "right":

                return {

                    x: this.x + 32,
                    y: this.y

                };

            case "left":

                return {

                    x: this.x - 32,
                    y: this.y

                };

            case "up":

                return {

                    x: this.x,
                    y: this.y - 32

                };

            case "down":

                return {

                    x: this.x,
                    y: this.y + 32

                };

        }

    }

    getInputBuilding() {

        const pos =
            this.getInputPosition();

        return this.scene
            .buildingSystem
            .getBuildingAt(
                pos.x,
                pos.y
            );

    }

    getOutputBuilding() {

        const pos =
            this.getOutputPosition();

        return this.scene
            .buildingSystem
            .getBuildingAt(
                pos.x,
                pos.y
            );

    }

        findItemOnBelt() {

        const pos =
            this.getInputPosition();

        if (
            !this.scene.itemSystem
        ) {

            return null;

        }

        for (
            const item of
            this.scene.itemSystem.items
        ) {

            if (
                !item.sprite.active
            ) {

                continue;

            }

            if (
                Math.abs(
                    item.sprite.x - pos.x
                ) > 14
            ) {

                continue;

            }

            if (
                Math.abs(
                    item.sprite.y - pos.y
                ) > 14
            ) {

                continue;

            }

            return item;

        }

        return null;

    }

    pickupFromBelt() {

        const entity =
        this.findItemOnBelt();

        if (!entity) {

        return false;

        }

        this.heldItem =
        entity;

        entity.sprite.body.stop();

        entity.sprite.setVisible(
        false
        );

        entity.sprite.body.enable =
            false;

        this.scene.itemSystem.remove(
            entity
        );

        return true;

    }

    pickupFromChest() {

        const chest =
            this.getInputBuilding();

        if (
            !chest ||
            typeof chest.removeItem !==
                "function"
        ) {

            return false;

        }

        const item =
            chest.removeItem();

        if (!item) {

            return false;

        }

        const entity =
            this.scene.itemSystem.spawnEntity(
                item,
                this.x,
             this.y
            );

        entity.sprite.setVisible(
            false
        );

        entity.sprite.body.enable =
            false;

        this.scene.itemSystem.remove(
            entity
        );

        this.heldItem =
            entity;

        return true;

    }

    pickup() {

        const input =
            this.getInputBuilding();

        if (!input) {

            return false;

        }

        if (
            typeof input.getItemCount ===
            "function"
        ) {

            return this.pickupFromChest();

        }

        return this.pickupFromBelt();

    }

    canOutputToChest() {

        const output =
            this.getOutputBuilding();

        return (
            output &&
            typeof output.moveItem ===
                "function"
        );

    }

    canOutputToBelt() {

        const output =
            this.getOutputBuilding();

        return (
            output &&
            typeof output.contains ===
                "function"
        );

    }

    dropToChest() {

        const output =
            this.getOutputBuilding();

        if (
            !output ||
            typeof output.moveItem !==
            "function"
            ) {

            return false;

        }

        if (
            !output.moveItem(
                this.heldItem
            )
        ) {

            return false;

        }

        this.heldItem = null;

        return true;

    }

    dropToBelt() {

        const pos =
        this.getOutputPosition();

    this.heldItem.sprite.setPosition(
        pos.x,
        pos.y
    );

    this.heldItem.sprite.setVisible(
        true
    );

    this.heldItem.sprite.body.enable =
        true;

    this.heldItem.setState(
            "BELT"
        );

        this.scene.itemSystem.items.push(
            this.heldItem
        );

        this.heldItem = null;

        return true;

    }

    drop() {

        const output =
            this.getOutputBuilding();

        if (!output) {

            return false;

        }

        if (
            typeof output.moveItem ===
            "function"
        ) {

            return this.dropToChest();

        }

        return this.dropToBelt();

    }

    updateAnimation() {

        this.arrow.setPosition(

            this.sprite.x - 7,

            this.sprite.y - 12

        );

    }

    update(delta) {

        this.timer += delta;

        this.updateAnimation();

        if (

            this.timer <

            this.cooldown

        ) {

            return;

        }

        this.timer = 0;

        if (

            this.heldItem === null

        ) {

            this.pickup();

        } else {

            this.drop();

        }

    }

    destroy() {

        this.arrow.destroy();

        this.hand.destroy();

        this.arm.destroy();

        this.sprite.destroy();

    }

}