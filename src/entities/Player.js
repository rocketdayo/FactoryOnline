import GameConfig from "../config/GameConfig.js";

export default class Player {
    constructor(scene, x, y) {
        this.scene = scene;

        // プレイヤー本体（仮スプライト：四角）
        this.sprite = scene.add.rectangle(x, y, 24, 24, 0x00ff88);
        scene.physics.add.existing(this.sprite);

        this.sprite.body.setCollideWorldBounds(true);

        this.speed = GameConfig.PLAYER.SPEED;
    }

    update(cursors, keys) {
        const body = this.sprite.body;

        body.setVelocity(0);

        let vx = 0;
        let vy = 0;

        // WASD
        if (keys.A.isDown) vx -= 1;
        if (keys.D.isDown) vx += 1;
        if (keys.W.isDown) vy -= 1;
        if (keys.S.isDown) vy += 1;

        // 方向キー
        if (cursors.left.isDown) vx -= 1;
        if (cursors.right.isDown) vx += 1;
        if (cursors.up.isDown) vy -= 1;
        if (cursors.down.isDown) vy += 1;

        // 正規化
        const len = Math.sqrt(vx * vx + vy * vy);
        if (len > 0) {
            vx /= len;
            vy /= len;
        }

        body.setVelocity(vx * this.speed, vy * this.speed);
    }
}