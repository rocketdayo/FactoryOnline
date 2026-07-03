export default class ItemEntity {

    constructor(scene, x, y, item) {

        this.scene = scene;
        this.item = item;

        this.sprite = scene.add.circle(
            x,
            y,
            6,
            0xffffff
        );

        scene.physics.add.existing(this.sprite);

        this.sprite.body.setCircle(6);

        this.sprite.body.setVelocity(
            Phaser.Math.Between(-80, 80),
            Phaser.Math.Between(-80, 80)
        );

        this.sprite.body.setDrag(250);

    }

    update(player) {

        if (!this.sprite.active) return false;

        const dx = player.x - this.sprite.x;
        const dy = player.y - this.sprite.y;

        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {

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

}