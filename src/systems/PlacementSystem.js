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

        this.ghost = new GhostBelt(scene);

        this.ghostPool = new GhostPool(scene);

        this.dragging = false;

        this.startGridX = null;
        this.startGridY = null;

        this.lastPlacedX = null;
        this.lastPlacedY = null;

        scene.input.on("pointerdown", pointer => {

            if (!pointer.leftButtonDown()) {

                return;

            }

            this.dragging = true;

            const world = pointer.positionToCamera(
                scene.cameras.main
            );

            const size = 32;

            this.startGridX =
                Math.floor(world.x / size) * size + size / 2;

            this.startGridY =
                Math.floor(world.y / size) * size + size / 2;

            this.lastPlacedX = null;
            this.lastPlacedY = null;

            this.place(pointer);

        });

        scene.input.on("pointerup", () => {

            this.dragging = false;

            this.startGridX = null;
            this.startGridY = null;

            this.lastPlacedX = null;
            this.lastPlacedY = null;

            this.ghostPool.clear();

        });

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

        const dirs = [
            "right",
            "down",
            "left",
            "up"
        ];

        let i = dirs.indexOf(
            this.direction
        );

        i++;

        if (i >= dirs.length) {

            i = 0;

        }

        this.direction = dirs[i];

        this.ghost.setDirection(
            this.direction
        );

    }

    place(pointer) {

        if (this.selectedBuilding !== "belt") {

            return;

        }

        const world = pointer.positionToCamera(
            this.scene.cameras.main
        );

        const size = 32;

        const x =
            Math.floor(world.x / size) * size + size / 2;

        const y =
            Math.floor(world.y / size) * size + size / 2;

        if (
            x === this.lastPlacedX &&
            y === this.lastPlacedY
        ) {

            return;

        }

        this.lastPlacedX = x;
        this.lastPlacedY = y;

        this.buildingSystem.placeBelt(
            this.scene,
            x,
            y,
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

            this.place(pointer);

        }

        if (
            this.dragging &&
            this.startGridX !== null
        ) {

            const world = pointer.positionToCamera(
                this.scene.cameras.main
            );

            const size = 32;

            const x =
                Math.floor(world.x / size) * size + size / 2;

            const y =
                Math.floor(world.y / size) * size + size / 2;

            this.ghostPool.drawLine(
                this.startGridX,
                this.startGridY,
                x,
                y
            );

        } else {

            this.ghostPool.clear();

        }

    }

}