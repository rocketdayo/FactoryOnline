// src/buildings/Belt.js
// updated: 2026-07-03

export default class Belt {

    constructor(scene, x, y, direction = "right") {

        this.scene = scene;

        this.x = x;
        this.y = y;

        this.direction = direction;

        this.speed = 90;

        this.sprite = scene.add.rectangle(
            x,
            y,
            32,
            32,
            0x3b82f6
        );

        this.arrow = scene.add.text(
            x - 7,
            y - 12,
            "",
            {
                fontSize: "20px",
                color: "#ffffff"
            }
        );

        this.setDirection(direction);

        scene.physics.add.existing(this.sprite);

        this.sprite.body.setImmovable(true);

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

    contains(item) {

        const dx = Math.abs(item.sprite.x - this.x);
        const dy = Math.abs(item.sprite.y - this.y);

        return dx < 16 && dy < 16;

    }

    moveItem(item) {

        item.setState("BELT");

        switch (this.direction) {

            case "right":

                item.sprite.body.setVelocity(
                    this.speed,
                    0
                );

                break;

            case "left":

                item.sprite.body.setVelocity(
                    -this.speed,
                    0
                );

                break;

            case "up":

                item.sprite.body.setVelocity(
                    0,
                    -this.speed
                );

                break;

            case "down":

                item.sprite.body.setVelocity(
                    0,
                    this.speed
                );

                break;

        }

    }

    update(delta) {

        this.arrow.setPosition(
            this.sprite.x - 7,
            this.sprite.y - 12
        );

    }

    destroy() {

        this.arrow.destroy();

        this.sprite.destroy();

    }

}