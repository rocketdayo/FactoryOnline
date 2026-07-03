// src/buildings/Belt.js
// updated: 2026-07-03

export default class Belt {

    constructor(scene, x, y, direction = "right") {

        this.scene = scene;

        this.x = x;
        this.y = y;

        this.direction = direction;

        this.sprite = scene.add.rectangle(
            x,
            y,
            32,
            32,
            0x3b82f6
        );

        scene.physics.add.existing(this.sprite);

        this.sprite.body.setImmovable(true);

    }

    update(delta) {

    }

    destroy() {

        this.sprite.destroy();

    }

}