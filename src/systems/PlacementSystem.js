// src/systems/PlacementSystem.js
// updated: 2026-07-05 (v0.2.8)

import Belt from "../buildings/Belt.js";
import GhostBelt from "../buildings/GhostBelt.js";
import GhostPool from "./GhostPool.js";

export default class PlacementSystem {

    constructor(scene, inputSystem, buildingSystem) {

        this.scene = scene;

        this.inputSystem = inputSystem;
        this.buildingSystem = buildingSystem;

        this.selectedBuilding = null;

        this.direction = "right";

        this.dragging = false;

        this.lastGridX = null;
        this.lastGridY = null;

        this.ghost = new GhostBelt(
            scene
        );

        this.ghostPool = new GhostPool(
            scene
        );

        scene.input.on(
            "pointerdown",
            pointer => {

                if (!pointer.leftButtonDown()) {

                    return;

                }

                this.dragging = true;

                this.place(pointer);

            }
        );

        scene.input.on(
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

    rotate() {

        const directions = [
            "right",
            "down",
            "left",
            "up"
        ];

        let index = directions.indexOf(
            this.direction
        );

        index++;

        if (index >= directions.length) {

            index = 0;

        }

        this.direction = directions[index];

        this.ghost.setDirection(
            this.direction
        );

    }

    getGrid(pointer) {

        const world = pointer.positionToCamera(
            this.scene.cameras.main
        );

        const size = 32;

        return {

            x:
                Math.floor(
                    world.x / size
                ) *
                    size +
                size / 2,

            y:
                Math.floor(
                    world.y / size
                ) *
                    size +
                size / 2

        };

    }

    place(pointer) {

        if (this.selectedBuilding !== "belt") {

            return;

        }

        const grid = this.getGrid(
            pointer
        );

        if (
            grid.x === this.lastGridX &&
            grid.y === this.lastGridY
        ) {

            return;

        }

        this.lastGridX = grid.x;
        this.lastGridY = grid.y;

        this.buildingSystem.placeBelt(
            this.scene,
            grid.x,
            grid.y,
            this.direction,
            Belt
        );

    }

    update() {

        if (this.selectedBuilding !== "belt") {

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

        const current = this.getGrid(
            pointer
        );

        if (
            this.dragging &&
            this.lastGridX !== null
        ) {

            this.ghostPool.drawLine(
                this.lastGridX,
                this.lastGridY,
                current.x,
                current.y
            );

        } else {

            this.ghostPool.clear();

        }

    }

}