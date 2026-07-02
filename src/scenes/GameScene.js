import Phaser from "phaser";
import GameConfig from "../config/GameConfig.js";
import Player from "../entities/Player.js";
import World from "../world/World.js";
import OreGenerator from "../world/OreGenerator.js";
import FPSCounter from "../ui/FPSCounter.js";

export default class GameScene extends Phaser.Scene {
    constructor() {
        super("GameScene");
    }

    create() {
        this.world = new World(this);

        this.player = new Player(this, 400, 300);

        // 鉱石生成
        this.oreGenerator = new OreGenerator(this);

        this.cameras.main.startFollow(this.player.sprite, true, 0.1, 0.1);
        this.cameras.main.setZoom(GameConfig.CAMERA.DEFAULT_ZOOM);

        this.cursors = this.input.keyboard.createCursorKeys();
        this.keys = this.input.keyboard.addKeys("W,A,S,D,E");

        this.fpsCounter = new FPSCounter(this);

        this.debugText = this.add.text(10, 10, "", {
            fontSize: "14px",
            fill: "#ffffff"
        }).setScrollFactor(0);

        // 採掘キー
        this.input.keyboard.on("keydown-E", () => {
            this.mine();
        });
    }

    mine() {
        const ore = this.oreGenerator.getNearbyOre(this.player.sprite);

        if (!ore) return;

        const destroyed = ore.mine();

        if (destroyed) {
            console.log("Ore destroyed:", ore.type);
        }
    }

    update(time, delta) {
        this.player.update(this.cursors, this.keys);

        this.fpsCounter.update(delta);

        const p = this.player.sprite;

        this.debugText.setText(
            `X: ${Math.floor(p.x)} Y: ${Math.floor(p.y)}`
        );
    }
}