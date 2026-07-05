// src/buildings/Belt.js
// updated: 2026-07-05 (v0.2.8)

export default class Belt {

    constructor(scene, x, y, direction = "right") {

        this.scene = scene;

        this.x = x;
        this.y = y;

        this.direction = direction;

        this.speed = 90;
        this.centerForce = 8;

        this.connections = {
            up: false,
            down: false,
            left: false,
            right: false
        };

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

        scene.physics.add.existing(
            this.sprite
        );

        this.sprite.body.setImmovable(true);

        this.updateArrow();

    }

    setDirection(direction) {

        this.direction = direction;

        this.updateArrow();

    }

    setConnections(connections) {

        this.connections = connections;

        this.updateArrow();

    }

    updateArrow() {

        const c = this.connections;

        if (c.up && c.down && c.left && c.right) {

            this.arrow.setText("┼");

            return;

        }

        if (c.up && c.down && c.left) {

            this.arrow.setText("┤");

            return;

        }

        if (c.up && c.down && c.right) {

            this.arrow.setText("├");

            return;

        }

        if (c.left && c.right && c.up) {

            this.arrow.setText("┴");

            return;

        }

        if (c.left && c.right && c.down) {

            this.arrow.setText("┬");

            return;

        }

        if (c.left && c.right) {

            this.arrow.setText("─");

            return;

        }

        if (c.up && c.down) {

            this.arrow.setText("│");

            return;

        }

        switch (this.direction) {

            case "right":

                this.arrow.setText("▶");

                break;

            case "left":

                this.arrow.setText("◀");

                break;

            case "up":

                this.arrow.setText("▲");

                break;

            case "down":

                this.arrow.setText("▼");

                break;

        }

    }

    contains(item) {

        const dx = Math.abs(
            item.sprite.x - this.x
        );

        const dy = Math.abs(
            item.sprite.y - this.y
        );

        return (
            dx < 16 &&
            dy < 16
        );

    }

    moveItem(item) {

        item.setState("BELT");

        const body = item.sprite.body;

        switch (this.direction) {

            case "right":

                body.setVelocity(
                    this.speed,
                    (this.y - item.sprite.y) * this.centerForce
                );

                break;

            case "left":

                body.setVelocity(
                    -this.speed,
                    (this.y - item.sprite.y) * this.centerForce
                );

                break;

            case "up":

                body.setVelocity(
                    (this.x - item.sprite.x) * this.centerForce,
                    -this.speed
                );

                break;

            case "down":

                body.setVelocity(
                    (this.x - item.sprite.x) * this.centerForce,
                    this.speed
                );

                break;

        }

    }

    update() {

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