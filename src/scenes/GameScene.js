// src/scenes/GameScene.js
// updated: 2026-07-10 (v0.3.1)

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

import ChestUI from "../ui/ChestUI.js";

export default class GameScene extends Phaser.Scene {

    constructor() {

        super("GameScene");

    }

    create() {

        this.player = new Player(
            this,
            400,
            300
        );

        this.worldSystem =
            new WorldSystem(
                this
            );

        this.itemSystem =
            new ItemSystem(
                this,
                this.player
            );

        this.buildingSystem =
            new BuildingSystem(
                this
            );

        this.cameraSystem =
            new CameraSystem(
                this
            );

        this.inputSystem =
            new InputSystem(
                this
            );

        this.uiSystem =
            new UISystem(
                this,
                this.player
            );

        this.chestUI =
            new ChestUI(
                this
            );

        this.miningSystem =
            new MiningSystem(
                this,
                this.worldSystem,
                this.player,
                this.uiSystem,
                this.itemSystem
            );

        this.placementSystem =
            new PlacementSystem(
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

        this.inputSystem.onSelectChest(() => {

            this.placementSystem.toggleChest();

        });

        this.inputSystem.onSelectInserter(() => {

            this.placementSystem.toggleInserter();

        });

        this.input.on(
            "gameobjectdown",
            (pointer, gameObject) => {

                for (const building of this.buildingSystem.buildings) {

                    if (
                        building.sprite !==
                        gameObject
                    ) {

                        continue;

                    }

                    if (
                        typeof building.getItemCount !==
                        "function"
                    ) {

                        continue;

                    }

                    this.chestUI.toggle(
                        building
                    );

                }

            }
        );

        this.inputSystem.onRotate(() => {

            this.placementSystem.rotate();

        });

    }

    update(time, delta) {

        const move =
            this.inputSystem.getMovementInput();

        this.player.update(
            move.vx,
            move.vy
        );

        this.itemSystem.update();

        this.buildingSystem.update(
            delta
        );

        this.placementSystem.update();

        this.uiSystem.update(
            delta
        );

        this.chestUI.update();

    }

}