// src/systems/InputSystem.js
// updated: 2026-07-08 (v0.3.0)

export default class InputSystem {

    constructor(scene) {

        this.scene = scene;

        this.cursors = scene.input.keyboard.createCursorKeys();

        this.keys = scene.input.keyboard.addKeys(
            "ONE,TWO,W,A,S,D,E,R,SHIFT"
        );

    }

    getMovementInput() {

        let vx = 0;
        let vy = 0;

        if (this.keys.A.isDown) vx--;
        if (this.keys.D.isDown) vx++;

        if (this.keys.W.isDown) vy--;
        if (this.keys.S.isDown) vy++;

        if (this.cursors.left.isDown) vx--;
        if (this.cursors.right.isDown) vx++;

        if (this.cursors.up.isDown) vy--;
        if (this.cursors.down.isDown) vy++;

        const length = Math.hypot(
            vx,
            vy
        );

        if (length > 0) {

            vx /= length;
            vy /= length;

        }

        return {

            vx,
            vy

        };

    }

    getPointer() {

        return this.scene.input.activePointer;

    }

    isShiftDown() {

        return this.keys.SHIFT.isDown;

    }

    onMine(callback) {

        this.scene.input.keyboard.on(
            "keydown-E",
            callback
        );

    }

    onSelectBelt(callback) {

        this.scene.input.keyboard.on(
            "keydown-ONE",
            callback
        );

    }

    onSelectChest(callback) {

        this.scene.input.keyboard.on(
            "keydown-TWO",
            callback
        );

    }

    onRotate(callback) {

        this.scene.input.keyboard.on(
            "keydown-R",
            callback
        );

    }

    onLeftClick(callback) {

        this.scene.input.on(
            "pointerdown",
            pointer => {

                if (
                    pointer.leftButtonDown()
                ) {

                    callback(pointer);

                }

            }
        );

    }

    onPointerMove(callback) {

        this.scene.input.on(
            "pointermove",
            pointer => {

                callback(pointer);

            }
        );

    }

}