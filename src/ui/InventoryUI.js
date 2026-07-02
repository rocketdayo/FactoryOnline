export default class InventoryUI {

    constructor(scene, inventory) {

        this.scene = scene;
        this.inventory = inventory;

        this.text = scene.add.text(10, 35, "", {
            fontSize: "16px",
            color: "#ffffff",
            backgroundColor: "#000000aa",
            padding: {
                left: 8,
                right: 8,
                top: 8,
                bottom: 8
            }
        });

        this.text.setScrollFactor(0);
        this.update();

    }

    update() {

        let output = "Inventory\n\n";

        let empty = true;

        for (const slot of this.inventory.slots) {

            if (!slot) continue;

            empty = false;

            output += `${slot.item.name} ×${slot.amount}\n`;

        }

        if (empty) {

            output += "(Empty)";

        }

        this.text.setText(output);

    }

}