// src/scenes/GameScene.js
// updated: 2026-07-03 (v0.2.7)

import Phaser from "phaser";

import Player from "../entities/Player.js";

import CameraSystem from "../systems/CameraSystem.js";
import InputSystem from "../systems/InputSystem.js";
import UISystem from "../systems/UISystem.js";
import WorldSystem from "../systems/WorldSystem.js";
import MiningSystem from "../systems/MiningSystem.js";
import ItemSystem from "../systems/ItemSystem.js";
import BuildingSystem from "../systems/BuildingSystem.js";
import PlacementSystem from "../systems/PlacementSystem.js";

export default class GameScene extends Phaser.Scene {

    constructor() {

        super("GameScene");

    }

    create() {

        this.player = new Player(this, 400, 300);

        this.worldSystem = new WorldSystem(this);

        this.itemSystem = new ItemSystem(
            this,
            this.player
        );

        this.buildingSystem = new BuildingSystem(this);

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

        this.placementSystem = new PlacementSystem(
            this,
            this.inputSystem,
            this.buildingSystem
        );

        this.cameraSystem.initialize(
            this.player.sprite
        );

        this.inputSystem.onMine(() => {

            this.miningSystem.mine();

        });

        this.inputSystem.onSelectBelt(() => {

            this.placementSystem.toggleBelt();

        });

        this.inputSystem.onRotate(() => {

            this.placementSystem.rotate();

        });

    }

    update(time, delta) {

        const move = this.inputSystem.getMovementInput();

        this.player.update(
            move.vx,
            move.vy
        );

        this.itemSystem.update();

        this.buildingSystem.update(delta);

        this.placementSystem.update();

        this.uiSystem.update(delta);

    }

}