// src/scenes/GameScene.js
// updated: 2026-07-03

import Phaser from "phaser";

import Player from "../entities/Player.js";

import CameraSystem from "../systems/CameraSystem.js";
import InputSystem from "../systems/InputSystem.js";
import UISystem from "../systems/UISystem.js";
import WorldSystem from "../systems/WorldSystem.js";
import MiningSystem from "../systems/MiningSystem.js";
import ItemSystem from "../systems/ItemSystem.js";

export default class GameScene extends Phaser.Scene {

    constructor() {
        super("GameScene");
    }

    create() {

        // =========================
        // Player
        // =========================
        this.player = new Player(this, 400, 300);

        // =========================
        // Systems
        // =========================
        this.worldSystem = new WorldSystem(this);

        this.itemSystem = new ItemSystem(
            this,
            this.player
        );

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
            this.uiSystem,
            this.itemSystem
        );

        // =========================
        // Camera
        // =========================
        this.cameraSystem.initialize(
            this.player.sprite
        );

        // =========================
        // Input
        // =========================
        this.inputSystem.onMine(() => {
            this.miningSystem.mine();
        });

    }

    update(time, delta) {

        // Player movement
        const move = this.inputSystem.getMovementInput();

        this.player.update(
            move.vx,
            move.vy
        );

        // Item system update
        this.itemSystem.update();

        // UI update
        this.uiSystem.update(delta);

    }

}