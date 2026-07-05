// src/systems/BuildingSystem.js
// updated: 2026-07-05 (v0.2.8)

export default class BuildingSystem {

    constructor(scene) {

        this.scene = scene;

        this.buildings = [];

    }

    add(building) {

        if (this.getBuildingAt(
            building.x,
            building.y
        )) {

            building.destroy();

            return false;

        }

        this.buildings.push(
            building
        );

        this.updateConnectionsAround(
            building.x,
            building.y
        );

        return true;

    }

    remove(building) {

        const index = this.buildings.indexOf(
            building
        );

        if (index === -1) {

            return;

        }

        this.buildings.splice(
            index,
            1
        );

        this.updateConnectionsAround(
            building.x,
            building.y
        );

    }

    getBuildingAt(x, y) {

        return this.buildings.find(building => {

            return (
                building.x === x &&
                building.y === y
            );

        }) || null;

    }

    getNeighbors(x, y) {

        return {

            up: this.getBuildingAt(
                x,
                y - 32
            ),

            down: this.getBuildingAt(
                x,
                y + 32
            ),

            left: this.getBuildingAt(
                x - 32,
                y
            ),

            right: this.getBuildingAt(
                x + 32,
                y
            )

        };

    }

    updateConnectionsAround(x, y) {

        const positions = [

            [x, y],

            [x + 32, y],
            [x - 32, y],

            [x, y + 32],
            [x, y - 32]

        ];

        for (const [px, py] of positions) {

            const building = this.getBuildingAt(
                px,
                py
            );

            if (!building) {

                continue;

            }

            if (typeof building.setConnections !== "function") {

                continue;

            }

            const neighbors = this.getNeighbors(
                building.x,
                building.y
            );

            building.setConnections({

                up: !!neighbors.up,
                down: !!neighbors.down,
                left: !!neighbors.left,
                right: !!neighbors.right

            });

        }

    }

    placeBelt(scene, x, y, direction, BeltClass) {

        if (this.getBuildingAt(x, y)) {

            return false;

        }

        const belt = new BeltClass(
            scene,
            x,
            y,
            direction
        );

        this.buildings.push(
            belt
        );

        this.updateConnectionsAround(
            x,
            y
        );

        return true;

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

            if (
                typeof building.contains !== "function" ||
                typeof building.moveItem !== "function"
            ) {

                continue;

            }

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