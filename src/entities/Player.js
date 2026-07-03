import GameConfig from "../config/GameConfig.js";
import Inventory from "../items/Inventory.js";

export default class Player {

    constructor(scene, x, y) {

        this.scene = scene;

        this.inventory = new Inventory(20);

        // ① physics spriteとして作る（重要）
        this.sprite = scene.physics.add.rectangle(
            x,
            y,
            24,
            24,
            0x00ff88
        );

        // ② ワールド内制限
        this.sprite.body.setCollideWorldBounds(true);

        // ③ 見た目の優先度（重要）
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