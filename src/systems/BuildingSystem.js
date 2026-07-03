// src/systems/BuildingSystem.js
// updated: 2026-07-03

export default class BuildingSystem {

    constructor(scene) {

        this.scene = scene;

        this.buildings = [];

    }

    add(building) {

        for (const other of this.buildings) {

            if (
                other.x === building.x &&
                other.y === building.y
            ) {

                building.destroy();

                return false;

            }

        }

        this.buildings.push(
            building
        );

        return true;

    }

    remove(building) {

        const index = this.buildings.indexOf(
            building
        );

        if (index !== -1) {

            this.buildings.splice(
                index,
                1
            );

        }

    }

    getBuildingAt(x, y) {

        return this.buildings.find(building => {

            return (
                building.x === x &&
                building.y === y
            );

        });

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