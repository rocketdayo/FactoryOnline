export default class ItemStack {
    constructor(item, amount = 1) {
        this.item = item;
        this.amount = amount;
    }

    add(value) {
        this.amount += value;
    }

    remove(value) {
        this.amount -= value;

        if (this.amount < 0) {
            this.amount = 0;
        }
    }

    isEmpty() {
        return this.amount <= 0;
    }
}