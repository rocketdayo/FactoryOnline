// src/systems/PlacementSystem.js
// updated: 2026-07-10 (v0.3.1)

import Belt from "../buildings/Belt.js";
import Chest from "../buildings/Chest.js";
import Inserter from "../buildings/Inserter.js";
import GhostBuilding from "../buildings/GhostBuilding.js";
import GhostPool from "./GhostPool.js";

export default class PlacementSystem {

    constructor(scene, inputSystem, buildingSystem) {

        this.scene = scene;

        this.inputSystem = inputSystem;

        this.buildingSystem = buildingSystem;

        this.selectedBuilding = null;

        this.direction = "right";

        this.ghost = new GhostBuilding(
            scene
        );

        this.ghostPool = new GhostPool(
            scene
        );

        this.dragging = false;

        this.lastGridX = null;
        this.lastGridY = null;

        this.scene.input.on(
            "pointerdown",
            pointer => {

                if (
                    !pointer.leftButtonDown()
                ) {

                    return;

                }

                this.dragging = true;

                this.place(
                    pointer
                );

            }
        );

        this.scene.input.on(
            "pointerup",
            () => {

                this.dragging = false;

                this.lastGridX = null;
                this.lastGridY = null;

                this.ghostPool.clear();

            }
        );

    }

    toggleBelt() {

        if (
            this.selectedBuilding ===
            "belt"
        ) {

            this.selectedBuilding = null;

            this.ghost.hide();

            this.ghostPool.clear();

            return;

        }

        this.selectedBuilding = "belt";

        this.ghost.setType(
            "belt"
        );

        this.ghost.setDirection(
            this.direction
        );

        this.ghost.show();

    }

    toggleChest() {

        if (
            this.selectedBuilding ===
            "chest"
        ) {

            this.selectedBuilding = null;

            this.ghost.hide();

            this.ghostPool.clear();

            return;

        }

        this.selectedBuilding = "chest";

        this.ghost.setType(
            "chest"
        );

        this.ghost.show();

    }

    toggleInserter() {

        if (
            this.selectedBuilding ===
            "inserter"
        ) {

            this.selectedBuilding = null;

            this.ghost.hide();

            this.ghostPool.clear();

            return;

        }

        this.selectedBuilding =
            "inserter";

        this.ghost.setType(
            "inserter"
        );

        this.ghost.setDirection(
            this.direction
        );

        this.ghost.show();

    }

    rotate() {

        const directions = [

            "right",

            "down",

            "left",

            "up"

        ];

        let index =
            directions.indexOf(
                this.direction
            );

        index++;

        if (
            index >=
            directions.length
        ) {

            index = 0;

        }

        this.direction =
            directions[index];

        this.ghost.setDirection(
            this.direction
        );

    }

    place(pointer) {

        const world =
            pointer.positionToCamera(
                this.scene.cameras.main
            );

        const size = 32;

        const x =
            Math.floor(
                world.x / size
            ) * size + size / 2;

        const y =
            Math.floor(
                world.y / size
            ) * size + size / 2;

        if (
            x === this.lastGridX &&
            y === this.lastGridY
        ) {

            return;

        }

        this.lastGridX = x;

        this.lastGridY = y;

        if (
            this.selectedBuilding ===
            "belt"
        ) {

            this.buildingSystem.placeBelt(
                this.scene,
                x,
                y,
                this.direction,
                Belt
            );

            return;

        }

        if (
            this.selectedBuilding ===
            "chest"
        ) {

            const chest =
                new Chest(
                    this.scene,
                    x,
                    y
                );

            this.buildingSystem.add(
                chest
            );

            return;

        }

        if (
            this.selectedBuilding ===
            "inserter"
        ) {

            const inserter =
                new Inserter(
                    this.scene,
                    x,
                    y,
                    this.direction
                );

            this.buildingSystem.add(
                inserter
            );

            return;

        }

    }

        updateGhostLine(pointer) {

        const world =
            pointer.positionToCamera(
                this.scene.cameras.main
            );

        const size = 32;

        const x =
            Math.floor(
                world.x / size
            ) * size + size / 2;

        const y =
            Math.floor(
                world.y / size
            ) * size + size / 2;

        this.ghostPool.clear();

        if (
            this.lastGridX === null ||
            this.lastGridY === null
        ) {

            const ghost =
                this.ghostPool.get();

            ghost.setPosition(
                x,
                y
            );

            return;

        }

        const dx =
            x - this.lastGridX;

        const dy =
            y - this.lastGridY;

        const steps =
            Math.max(
                Math.abs(dx),
                Math.abs(dy)
            ) / size;

        const stepX =
            dx === 0
                ? 0
                : Math.sign(dx) * size;

        const stepY =
            dy === 0
                ? 0
                : Math.sign(dy) * size;

        let cx =
            this.lastGridX;

        let cy =
            this.lastGridY;

        for (
            let i = 0;
            i < steps;
            i++
        ) {

            cx += stepX;

            cy += stepY;

            const ghost =
                this.ghostPool.get();

            ghost.setPosition(
                cx,
                cy
            );

        }

    }

    update() {

        if (
            this.selectedBuilding ===
            null
        ) {

            return;

        }

        const pointer =
            this.inputSystem.getPointer();

        this.ghost.update(
            pointer
        );

        if (
            this.dragging &&
            this.inputSystem.isShiftDown()
        ) {

            this.place(
                pointer
            );

        }

        if (
            this.selectedBuilding ===
            "belt"
        ) {

            this.updateGhostLine(
                pointer
            );

        } else {

            this.ghostPool.clear();

        }

    }

}