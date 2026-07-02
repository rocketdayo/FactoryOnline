export default class FPSCounter {
    constructor(scene) {
        this.scene = scene;

        this.lastTime = 0;
        this.fps = 0;

        this.text = scene.add.text(10, 30, "FPS: --", {
            fontSize: "14px",
            fill: "#ffffff"
        }).setScrollFactor(0);
    }

    update(delta) {
        // deltaはmsなのでFPSに変換
        this.lastTime += delta;

        if (this.lastTime >= 500) {
            this.fps = Math.round(1000 / delta);
            this.text.setText(`FPS: ${this.fps}`);
            this.lastTime = 0;
        }
    }
}