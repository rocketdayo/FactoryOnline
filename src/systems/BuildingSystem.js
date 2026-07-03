// src/systems/BuildingSystem.js
// updated: 2026-07-03

export default class BuildingSystem {

    constructor(scene) {

        this.scene = scene;

        this.buildings = [];

    }

    add(building) {

        this.buildings.push(building);

    }

    remove(building) {

        const index = this.buildings.indexOf(building);

        if (index !== -1) {

            this.buildings.splice(index, 1);

        }

    }

    update(delta) {

        for (const building of this.buildings) {

            if (typeof building.update === "function") {

                building.update(delta);

            }

        }

    }

}