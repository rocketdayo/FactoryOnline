import Phaser from "phaser";
import GameConfig from "./config/GameConfig.js";
import BootScene from "./scenes/BootScene.js";
import GameScene from "./scenes/GameScene.js";

class FactoryGame {
    constructor() {
        this.config = {
            type: Phaser.AUTO,
            parent: "game-container",
            backgroundColor: "#1b1b1b",
            pixelArt: true,
            physics: {
                default: "arcade",
                arcade: {
                    debug: false,
                    gravity: { y: 0 }
                }
            },
            scale: {
                mode: Phaser.Scale.RESIZE,
                autoCenter: Phaser.Scale.CENTER_BOTH
            },
            scene: [BootScene, GameScene]
        };

        this.game = new Phaser.Game(this.config);
    }
}

window.addEventListener("load", () => {
    new FactoryGame();
});