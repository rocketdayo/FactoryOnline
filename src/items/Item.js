export default class Item {
    constructor(id, name, maxStack = 100) {
        this.id = id;
        this.name = name;
        this.maxStack = maxStack;
    }
}