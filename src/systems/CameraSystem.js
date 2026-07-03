import GameConfig from "../config/GameConfig.js";

export default class CameraSystem {

    constructor(scene) {

        this.scene = scene;

    }

    initialize(target) {

        this.scene.cameras.main.startFollow(
            target,
            true,
            0.1,
            0.1
        );

        this.scene.cameras.main.setZoom(
            GameConfig.CAMERA.DEFAULT_ZOOM
        );

    }

}