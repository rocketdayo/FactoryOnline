import ItemStack from "./ItemStack.js";

export default class Inventory {

    constructor(size = 20) {

        this.size = size;

        this.slots = new Array(size).fill(null);

    }

    addItem(item, amount = 1) {

        // 同じアイテムを探す
        for (let i = 0; i < this.size; i++) {

            const slot = this.slots[i];

            if (
                slot &&
                slot.item.id === item.id &&
                slot.amount < item.maxStack
            ) {

                slot.add(amount);

                return true;

            }

        }

        // 空きを探す
        for (let i = 0; i < this.size; i++) {

            if (this.slots[i] === null) {

                this.slots[i] = new ItemStack(
                    item,
                    amount
                );

                return true;

            }

        }

        return false;

    }

    removeItem(itemId, amount = 1) {

        for (let i = 0; i < this.size; i++) {

            const slot = this.slots[i];

            if (!slot) continue;

            if (slot.item.id === itemId) {

                slot.remove(amount);

                if (slot.isEmpty()) {

                    this.slots[i] = null;

                }

                return true;

            }

        }

        return false;

    }

    getItemCount(itemId) {

        let total = 0;

        for (const slot of this.slots) {

            if (!slot) continue;

            if (slot.item.id === itemId) {

                total += slot.amount;

            }

        }

        return total;

    }

}