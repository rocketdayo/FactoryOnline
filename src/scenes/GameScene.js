import Phaser from "phaser";

import Player from "../entities/Player.js";

import CameraSystem from "../systems/CameraSystem.js";
import InputSystem from "../systems/InputSystem.js";
import UISystem from "../systems/UISystem.js";
import WorldSystem from "../systems/WorldSystem.js";
import MiningSystem from "../systems/MiningSystem.js";

export default class GameScene extends Phaser.Scene {

    constructor() {

        super("GameScene");

    }

    create() {

        // プレイヤー
        this.player = new Player(this, 400, 300);

        // システム
        this.worldSystem = new WorldSystem(this);

        this.cameraSystem = new CameraSystem(this);

        this.inputSystem = new InputSystem(this);

        this.uiSystem = new UISystem(
            this,
            this.player
        );

        this.miningSystem = new MiningSystem(
            this,
            this.worldSystem,
            this.player,
            this.uiSystem
        );

        // カメラ初期化
        this.cameraSystem.initialize(
            this.player.sprite
        );

        // 採掘キー
        this.inputSystem.onMine(() => {

            this.miningSystem.mine();

        });

    }

    update(time, delta) {

        this.player.update(
            this.inputSystem.cursors,
            this.inputSystem.keys
        );

        this.uiSystem.update(delta);

    }

}