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

        if (!this.scene.itemSystem) {

            return;

        }

        for (const building of this.buildings) {

            for (const item of this.scene.itemSystem.items) {

                if (!item.sprite.active) {

                    continue;

                }

                if (building.contains(item)) {

                    building.moveItem(item);

                }

            }

        }

    }

}