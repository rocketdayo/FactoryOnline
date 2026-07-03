// src/buildings/GhostBelt.js
// updated: 2026-07-03

export default class GhostBelt {

    constructor(scene) {

        this.scene = scene;

        this.sprite = scene.add.rectangle(
            0,
            0,
            32,
            32,
            0x3b82f6,
            0.4
        );

        this.arrow = scene.add.text(
            0,
            0,
            "▶",
            {
                fontSize: "20px",
                color: "#ffffff"
            }
        );

        this.sprite.setVisible(false);
        this.arrow.setVisible(false);

        this.direction = "right";

    }

    setDirection(direction) {

        this.direction = direction;

        switch (direction) {

            case "right":
                this.arrow.setText("▶");
                break;

            case "down":
                this.arrow.setText("▼");
                break;

            case "left":
                this.arrow.setText("◀");
                break;

            case "up":
                this.arrow.setText("▲");
                break;

        }

    }

    show() {

        this.sprite.setVisible(true);
        this.arrow.setVisible(true);

    }

    hide() {

        this.sprite.setVisible(false);
        this.arrow.setVisible(false);

    }

    update(pointer) {

        const world = pointer.positionToCamera(
            this.scene.cameras.main
        );

        const size = 32;

        const x = Math.floor(world.x / size) * size + size / 2;
        const y = Math.floor(world.y / size) * size + size / 2;

        this.sprite.setPosition(
            x,
            y
        );

        this.arrow.setPosition(
            x - 7,
            y - 12
        );

    }

}