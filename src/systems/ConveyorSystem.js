// src/systems/ConveyorSystem.js
// updated: 2026-07-08 (v0.2.9)

export default class ConveyorSystem {

    constructor(buildingSystem) {

        this.buildingSystem = buildingSystem;

    }

    getOutputPosition(belt) {

        switch (belt.direction) {

            case "right":

                return {

                    x: belt.x + 32,
                    y: belt.y

                };

            case "left":

                return {

                    x: belt.x - 32,
                    y: belt.y

                };

            case "up":

                return {

                    x: belt.x,
                    y: belt.y - 32

                };

            case "down":

                return {

                    x: belt.x,
                    y: belt.y + 32

                };

        }

    }

    getInputDirection(belt) {

        switch (belt.direction) {

            case "right":

                return "left";

            case "left":

                return "right";

            case "up":

                return "down";

            case "down":

                return "up";

        }

    }

    getNextBuilding(belt) {

        const pos = this.getOutputPosition(
            belt
        );

        return this.buildingSystem.getBuildingAt(
            pos.x,
            pos.y
        );

    }

    canTransfer(from, to) {

        if (!to) {

            return false;

        }

        if (typeof to.contains !== "function") {

            return false;

        }

        return true;

    }

    transfer(item, currentBelt) {

        const next = this.getNextBuilding(
            currentBelt
        );

        if (!this.canTransfer(
            currentBelt,
            next
        )) {

            return false;

        }

        next.moveItem(
            item
        );

        return true;

    }

}