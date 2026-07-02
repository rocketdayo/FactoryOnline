import Phaser from "phaser";

export default class BootScene extends Phaser.Scene {
    constructor() {
        super("BootScene");
    }

    preload() {
        // v0.1ではアセットなし（将来ここで読み込み）
    }

    create() {
        this.scene.start("GameScene");
    }
}