// src/systems/GhostPool.js
// updated: 2026-07-09 (v0.3.0)

export default class GhostPool {

    constructor(scene) {

        this.scene = scene;

        this.pool = [];
        this.active = [];

    }

    get() {

        let ghost = this.pool.pop();

        if (!ghost) {

            ghost = this.scene.add.rectangle(
                0,
                0,
                32,
                32,
                0x3b82f6,
                0.25
            );

        }

        ghost.setVisible(
            true
        );

        this.active.push(
            ghost
        );

        return ghost;

    }

    add(x, y) {

        const ghost = this.get();

        ghost.setPosition(
            x,
            y
        );

        return ghost;

    }

    clear() {

        while (
            this.active.length > 0
        ) {

            const ghost =
                this.active.pop();

            ghost.setVisible(
                false
            );

            this.pool.push(
                ghost
            );

        }

    }

    drawLine(x1, y1, x2, y2) {

        this.clear();

        const size = 32;

        const dx = x2 - x1;
        const dy = y2 - y1;

        const steps = Math.max(
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

        let x = x1;
        let y = y1;

        for (
            let i = 0;
            i < steps;
            i++
        ) {

            x += stepX;
            y += stepY;

            this.add(
                x,
                y
            );

        }

    }

}