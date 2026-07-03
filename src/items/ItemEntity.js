// src/items/ItemEntity.js
// updated: 2026-07-03

export default class ItemEntity {

    constructor(scene, x, y, item) {

        this.scene = scene;
        this.item = item;

        this.spawnTime = scene.time.now;

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

    update(player) {

        if (!this.sprite.active) return false;

        const dx = player.x - this.sprite.x;
        const dy = player.y - this.sprite.y;

        const dist = Math.sqrt(dx * dx + dy * dy);

        // 👉 少し遅らせて吸引開始
        if (this.scene.time.now - this.spawnTime > 200) {

            if (dist < 120) {

                this.sprite.body.setVelocity(
                    dx * 5,
                    dy * 5
                );

            }

        }

        if (dist < 18) {

            this.sprite.destroy();

            return true;

        }

        return false;

    }

}