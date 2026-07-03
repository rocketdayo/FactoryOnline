import GameConfig from "../config/GameConfig.js";
import Inventory from "../items/Inventory.js";

export default class Player {

    constructor(scene, x, y) {

        this.scene = scene;

        this.inventory = new Inventory(20);

        // 見た目（rectangle）
        this.sprite = scene.add.rectangle(
            x,
            y,
            24,
            24,
            0x00ff88
        );

        // 物理を後付けする（これが正解）
        scene.physics.add.existing(this.sprite);

        this.sprite.body.setCollideWorldBounds(true);

        // 表示優先度
        this.sprite.setDepth(100);

        this.speed = GameConfig.PLAYER.SPEED;

    }

    update(cursors, keys) {

        const body = this.sprite.body;

        body.setVelocity(0);

        let vx = 0;
        let vy = 0;

        if (keys.A.isDown) vx--;
        if (keys.D.isDown) vx++;
        if (keys.W.isDown) vy--;
        if (keys.S.isDown) vy++;

        if (cursors.left.isDown) vx--;
        if (cursors.right.isDown) vx++;
        if (cursors.up.isDown) vy--;
        if (cursors.down.isDown) vy++;

        const len = Math.sqrt(vx * vx + vy * vy);

        if (len > 0) {

            vx /= len;
            vy /= len;

        }

        body.setVelocity(
            vx * this.speed,
            vy * this.speed
        );

    }

}