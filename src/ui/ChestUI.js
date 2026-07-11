// src/ui/ChestUI.js
// updated: 2026-07-11 (v0.3.2)

export default class ChestUI {

    constructor(scene) {

        this.scene = scene;

        this.chest = null;

        this.background = scene.add.rectangle(
            150,
            170,
            260,
            220,
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
            70,
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

        let text =
            "Chest\n\n";

        const items =
            this.chest.getItems();

        if (
            items.length === 0
        ) {

            text +=
                "(Empty)";

        } else {

            for (
                const stack of items
            ) {

                text +=

                    stack.item.name +

                    " ×" +

                    stack.amount +

                    "\n";

            }

        }

        this.text.setText(
            text
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