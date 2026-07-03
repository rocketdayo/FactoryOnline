// src/systems/PlacementSystem.js
// updated: 2026-07-03 (v0.2.8)

import Belt from "../buildings/Belt.js";
import GhostBelt from "../buildings/GhostBelt.js";

export default class PlacementSystem {

    constructor(scene, inputSystem, buildingSystem) {

        this.scene = scene;

        this.inputSystem = inputSystem;
        this.buildingSystem = buildingSystem;

        this.selectedBuilding = null;

        this.direction = "right";

        this.ghost = new GhostBelt(scene);

        this.dragging = false;

        this.lastGridX = null;
        this.lastGridY = null;

        this.ghosts = [];

        this.scene.input.on("pointerdown", pointer => {

            if (!pointer.leftButtonDown()) return;

            this.dragging = true;

            this.place(pointer);

        });

        this.scene.input.on("pointerup", () => {

            this.dragging = false;

            this.lastGridX = null;
            this.lastGridY = null;

            this.clearGhosts();

        });

    }

    toggleBelt() {

        if (this.selectedBuilding === "belt") {

            this.selectedBuilding = null;

            this.ghost.hide();

            return;

        }

        this.selectedBuilding = "belt";

        this.ghost.show();

        this.ghost.setDirection(this.direction);

    }

    rotate() {

        const directions = [
            "right",
            "down",
            "left",
            "up"
        ];

        let index = directions.indexOf(this.direction);

        index++;

        if (index >= directions.length) index = 0;

        this.direction = directions[index];

        this.ghost.setDirection(this.direction);

    }

    place(pointer) {

        if (this.selectedBuilding !== "belt") return;

        const world = pointer.positionToCamera(
            this.scene.cameras.main
        );

        const size = 32;

        const x = Math.floor(world.x / size) * size + size / 2;
        const y = Math.floor(world.y / size) * size + size / 2;

        if (x === this.lastGridX && y === this.lastGridY) return;

        this.lastGridX = x;
        this.lastGridY = y;

        this.buildingSystem.placeBelt(
            this.scene,
            x,
            y,
            this.direction,
            Belt
        );
    }

    updateGhostLine(pointer) {

        const world = pointer.positionToCamera(
            this.scene.cameras.main
        );

        const size = 32;

        const x = Math.floor(world.x / size) * size + size / 2;
        const y = Math.floor(world.y / size) * size + size / 2;

        this.clearGhosts();

        if (this.lastGridX === null || this.lastGridY === null) {

            this.addGhost(x, y);

            return;

        }

        const dx = x - this.lastGridX;
        const dy = y - this.lastGridY;

        const steps = Math.max(
            Math.abs(dx),
            Math.abs(dy)
        ) / size;

        const stepX = dx === 0 ? 0 : Math.sign(dx) * size;
        const stepY = dy === 0 ? 0 : Math.sign(dy) * size;

        let cx = this.lastGridX;
        let cy = this.lastGridY;

        for (let i = 0; i < steps; i++) {

            cx += stepX;
            cy += stepY;

            this.addGhost(cx, cy);
        }
    }

    addGhost(x, y) {

        const g = this.scene.add.rectangle(
            x,
            y,
            32,
            32,
            0x3b82f6,
            0.25
        );

        this.ghosts.push(g);

    }

    clearGhosts() {

        for (const g of this.ghosts) {

            g.destroy();

        }

        this.ghosts = [];

    }

    update() {

        if (this.selectedBuilding === null) return;

        const pointer = this.inputSystem.getPointer();

        this.ghost.update(pointer);

        if (this.dragging && this.inputSystem.isShiftDown()) {

            this.place(pointer);

        }

        this.updateGhostLine(pointer);

    }

}