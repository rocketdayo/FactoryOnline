export default class InputSystem {

    constructor(scene) {

        this.scene = scene;

        this.cursors = scene.input.keyboard.createCursorKeys();

        this.keys = scene.input.keyboard.addKeys(
            "W,A,S,D,E"
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

        const length = Math.hypot(vx, vy);

        if (length > 0) {

            vx /= length;
            vy /= length;

        }

        return { vx, vy };

    }

    onMine(callback) {

        this.scene.input.keyboard.on(
            "keydown-E",
            callback
        );

    }

}