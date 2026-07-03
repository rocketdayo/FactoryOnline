// src/scenes/GameScene.js
// updated: 2026-07-03

import Phaser from "phaser";

import Player from "../entities/Player.js";

import Belt from "../buildings/Belt.js";

import CameraSystem from "../systems/CameraSystem.js";
import InputSystem from "../systems/InputSystem.js";
import UISystem from "../systems/UISystem.js";
import WorldSystem from "../systems/WorldSystem.js";
import MiningSystem from "../systems/MiningSystem.js";
import ItemSystem from "../systems/ItemSystem.js";
import BuildingSystem from "../systems/BuildingSystem.js";

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

        this.cameraSystem.initialize(
            this.player.sprite
        );

        this.selectedBuilding = null;

        this.inputSystem.onMine(() => {

            this.miningSystem.mine();

        });

        this.inputSystem.onSelectBelt(() => {

            this.selectedBuilding = "belt";

        });

        this.inputSystem.onLeftClick(pointer => {

            if (this.selectedBuilding !== "belt") {

                return;

            }

            const worldPoint = pointer.positionToCamera(
                this.cameras.main
            );

            const size = 32;

            const x = Math.floor(worldPoint.x / size) * size + size / 2;
            const y = Math.floor(worldPoint.y / size) * size + size / 2;

            const belt = new Belt(
                this,
                x,
                y
            );

            this.buildingSystem.add(
                belt
            );

        });

    }

    update(time, delta) {

        this.player.update(
            this.inputSystem.cursors,
            this.inputSystem.keys
        );

        this.itemSystem.update();

        this.buildingSystem.update(delta);

        this.uiSystem.update(delta);

    }

}