// src/items/ItemEntity.js
// updated: 2026-07-03

export default class ItemEntity {

    constructor(scene, x, y, item) {

        this.scene = scene;
        this.item = item;

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

        // ⚠️ physics imageに変更（重要）
        this.sprite = scene.physics.add.image(x, y, null);

        this.sprite.setDisplaySize(12, 12);
        this.sprite.setTint(color);

        this.sprite.body.setCircle(6);

        // 飛び出し
        this.sprite.setVelocity(
            Phaser.Math.Between(-220, 220),
            Phaser.Math.Between(-350, -120)
        );

        this.sprite.setDrag(120);
        this.sprite.setBounce(0.5);

    }

    update(player) {

        if (!this.sprite.active) return false;

        const dx = player.x - this.sprite.x;
        const dy = player.y - this.sprite.y;

        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {

            this.sprite.setVelocity(
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

}