// src/items/ChestInventory.js
// updated: 2026-07-08 (v0.3.0)

export default class ChestInventory {

    constructor(capacity = 100) {

        this.capacity = capacity;

        this.items = [];

    }

    add(item) {

        if (this.isFull()) {

            return false;

        }

        this.items.push(
            item
        );

        return true;

    }

    remove() {

        if (this.items.length === 0) {

            return null;

        }

        return this.items.shift();

    }

    peek() {

        if (this.items.length === 0) {

            return null;

        }

        return this.items[0];

    }

    clear() {

        this.items = [];

    }

    size() {

        return this.items.length;

    }

    isEmpty() {

        return this.items.length === 0;

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