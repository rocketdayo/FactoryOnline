import FPSCounter from "../ui/FPSCounter.js";
import InventoryUI from "../ui/InventoryUI.js";

export default class UISystem {

    constructor(scene, player) {

        this.scene = scene;
        this.player = player;

        this.fpsCounter = new FPSCounter(scene);

        this.inventoryUI = new InventoryUI(
            scene,
            player.inventory
        );

        this.debugText = scene.add.text(
            10,
            10,
            "",
            {
                fontSize: "14px",
                fill: "#ffffff"
            }
        );

        this.debugText.setScrollFactor(0);

    }

    update(delta) {

        this.fpsCounter.update(delta);

        this.inventoryUI.update();

        const p = this.player.sprite;

        this.debugText.setText(
            `X: ${Math.floor(p.x)} Y: ${Math.floor(p.y)}`
        );

    }

}