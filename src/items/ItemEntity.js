// src/items/ItemEntity.js
// updated: 2026-07-03

export default class ItemEntity {

    constructor(scene, x, y, item) {

        this.scene = scene;
        this.item = item;

        this.state = "FREE";

        this.spawnTime = scene.time.now;

        this.lastBeltTime = 0;

        let color = 0xffffff;

        switch (item.id) {

            case "ironOre":
                color = 0x8c8c8c;
                break;

            case "copperOre":
                color = 0xd17b0f;
                break;

            case "goldOre":
                color = 0xffd700;
                break;

        }

        this.sprite = scene.add.circle(
            x,
            y,
            6,
            color
        );

        scene.physics.add.existing(this.sprite);

        this.sprite.body.setCircle(6);

        this.sprite.body.setVelocity(
            Phaser.Math.Between(-200, 200),
            Phaser.Math.Between(-260, -120)
        );

        this.sprite.body.setDrag(120);

        this.sprite.body.setBounce(0.6);

    }

    setState(state) {

        this.state = state;

        if (state === "BELT") {

            this.lastBeltTime = this.scene.time.now;

        }

    }

    update(player) {

        if (!this.sprite.active) {

            return false;

        }

        if (
            this.state === "BELT" &&
            this.scene.time.now - this.lastBeltTime > 100
        ) {

            this.state = "FREE";

        }

        const dx = player.x - this.sprite.x;
        const dy = player.y - this.sprite.y;

        const dist = Math.sqrt(dx * dx + dy * dy);

        if (
            this.state === "FREE" &&
            this.scene.time.now - this.spawnTime > 200 &&
            dist < 120
        ) {

            this.state = "PLAYER";

        }

        if (this.state === "PLAYER") {

            this.sprite.body.setVelocity(
                dx * 5,
                dy * 5
            );

        }

        if (dist < 18) {

            this.sprite.destroy();

            return true;

        }

        return false;

    }

    destroy() {

    if (this.sprite.body) {

        this.sprite.body.stop();

    }

    this.sprite.destroy();

    }

}