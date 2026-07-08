// src/ui/ChestUI.js
// updated: 2026-07-08 (v0.3.0)

export default class ChestUI {

    constructor(scene) {

        this.scene = scene;

        this.chest = null;

        this.background = scene.add.rectangle(
            120,
            120,
            220,
            90,
            0x202020,
            0.9
        );

        this.background.setScrollFactor(
            0
        );

        this.background.setDepth(
            1000
        );

        this.text = scene.add.text(
            35,
            90,
            "",
            {
                fontSize: "18px",
                color: "#ffffff"
            }
        );

        this.text.setScrollFactor(
            0
        );

        this.text.setDepth(
            1001
        );

        this.hide();

    }

    show(chest) {

        this.chest = chest;

        this.background.setVisible(
            true
        );

        this.text.setVisible(
            true
        );

        this.refresh();

    }

    hide() {

        this.chest = null;

        this.background.setVisible(
            false
        );

        this.text.setVisible(
            false
        );

    }

    toggle(chest) {

        if (
            this.chest === chest &&
            this.background.visible
        ) {

            this.hide();

            return;

        }

        this.show(
            chest
        );

    }

    refresh() {

        if (!this.chest) {

            return;

        }

        this.text.setText(

            "Chest\n\n" +

            "Items : " +

            this.chest.getItemCount()

        );

    }

    update() {

        if (
            this.background.visible
        ) {

            this.refresh();

        }

    }

}