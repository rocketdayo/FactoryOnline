// src/items/ChestInventory.js
// updated: 2026-07-11 (v0.3.2)

export default class ChestInventory {

    constructor(capacity = 100) {

        this.capacity = capacity;

        this.items = [];

    }

    findStack(item) {

        if (!item) {

            return null;

        }

        return this.items.find(

            stack =>

                stack.item.id ===
                item.id

        ) || null;

    }

    add(item, amount = 1) {

        const stack =
            this.findStack(item);

        if (stack) {

            stack.amount += amount;

            return true;

        }

        if (
            this.items.length >=
            this.capacity
        ) {

            return false;

        }

        this.items.push({

            item,

            amount

        });

        return true;

    }

    has(item, amount = 1) {

        const stack =
            this.findStack(item);

        if (!stack) {

            return false;

        }

        return (
            stack.amount >= amount
        );

    }

    remove(item = null, amount = 1) {

        if (item === null) {

            if (this.items.length === 0) {

                return null;

            }

            item = this.items[0].item;

        }

        const stack =
            this.findStack(item);

        if (!stack) {

            return null;

        }

        stack.amount -= amount;

        if (
            stack.amount <= 0
        ) {

            const index =
                this.items.indexOf(
                    stack
                );

            this.items.splice(
                index,
                1
            );

        }

        return item;

    }

    peek() {

        if (
            this.items.length === 0
        ) {

            return null;

        }

        return this.items[0].item;

    }

    getAmount(item) {

        const stack =
            this.findStack(item);

        if (!stack) {

            return 0;

        }

        return stack.amount;

    }

    size() {

        return this.items.length;

    }

    clear() {

        this.items = [];

    }

    isEmpty() {

        return (
            this.items.length === 0
        );

    }

    isFull() {

        return (
            this.items.length >=
            this.capacity
        );

    }

    getItems() {

        return this.items;

    }

}