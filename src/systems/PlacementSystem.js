// src/systems/PlacementSystem.js
// updated: 2026-07-08 (v0.3.0)

import Belt from "../buildings/Belt.js";
import Chest from "../buildings/Chest.js";
import GhostBelt from "../buildings/GhostBelt.js";
import GhostPool from "./GhostPool.js";

export default class PlacementSystem {

    constructor(scene, inputSystem, buildingSystem) {

        this.scene = scene;

        this.inputSystem = inputSystem;

        this.buildingSystem = buildingSystem;

        this.selectedBuilding = null;

        this.direction = "right";

        this.ghost = new GhostBelt(scene);

        this.ghostPool = new GhostPool(scene);

        this.dragging = false;

        this.lastGridX = null;
        this.lastGridY = null;

        this.scene.input.on(
            "pointerdown",
            pointer => {

                if (!pointer.leftButtonDown()) {

                    return;

                }

                this.dragging = true;

                this.place(pointer);

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

        if (this.selectedBuilding === "belt") {

            this.selectedBuilding = null;

            this.ghost.hide();

            this.ghostPool.clear();

            return;

        }

        this.selectedBuilding = "belt";

        this.ghost.show();

        this.ghost.setDirection(
            this.direction
        );

    }

    toggleChest() {

        if (this.selectedBuilding === "chest") {

            this.selectedBuilding = null;

            this.ghost.hide();

            this.ghostPool.clear();

            return;

        }

        this.selectedBuilding = "chest";

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
            index >= directions.length
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

            this.ghostPool.add(
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

            this.ghostPool.add(
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

        this.updateGhostLine(
            pointer
        );

    }

}