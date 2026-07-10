// src/buildings/GhostBuilding.js
// updated: 2026-07-10 (v0.3.1)

export default class GhostBuilding {

    constructor(scene) {

        this.scene = scene;

        this.type = "belt";

        this.direction = "right";

        this.sprite = scene.add.rectangle(
            0,
            0,
            32,
            32,
            0x3b82f6,
            0.4
        );

        this.icon = scene.add.text(
            0,
            0,
            "▶",
            {
                fontSize: "20px",
                color: "#ffffff"
            }
        );

        this.sprite.setVisible(
            false
        );

        this.icon.setVisible(
            false
        );

    }

    setType(type) {

        this.type = type;

        switch (type) {

            case "belt":

                this.sprite.setFillStyle(
                    0x3b82f6,
                    0.4
                );

                this.updateDirection();

                break;

            case "chest":

                this.sprite.setFillStyle(
                    0x8b5a2b,
                    0.4
                );

                this.icon.setText(
                    "□"
                );

                break;

            case "inserter":

                this.sprite.setFillStyle(
                    0xeab308,
                    0.4
                );

                this.updateDirection();

                break;

        }

    }

    setDirection(direction) {

        this.direction = direction;

        this.updateDirection();

    }

    updateDirection() {

        switch (this.direction) {

            case "right":

                this.icon.setText(
                    "▶"
                );

                break;

            case "left":

                this.icon.setText(
                    "◀"
                );

                break;

            case "up":

                this.icon.setText(
                    "▲"
                );

                break;

            case "down":

                this.icon.setText(
                    "▼"
                );

                break;

        }

    }

    show() {

        this.sprite.setVisible(
            true
        );

        this.icon.setVisible(
            true
        );

    }

    hide() {

        this.sprite.setVisible(
            false
        );

        this.icon.setVisible(
            false
        );

    }

    update(pointer) {

        const world = pointer.positionToCamera(
            this.scene.cameras.main
        );

        const size = 32;

        const x =
            Math.floor(world.x / size) * size +
            size / 2;

        const y =
            Math.floor(world.y / size) * size +
            size / 2;

        this.sprite.setPosition(
            x,
            y
        );

        this.icon.setPosition(
            x - 7,
            y - 12
        );

    }

    getGridPosition() {

        return {

            x: this.sprite.x,

            y: this.sprite.y

        };

    }

}