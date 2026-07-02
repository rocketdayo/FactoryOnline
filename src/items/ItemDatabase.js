import Item from "./Item.js";

const ItemDatabase = {
    ironOre: new Item(
        "ironOre",
        "Iron Ore",
        100
    ),

    copperOre: new Item(
        "copperOre",
        "Copper Ore",
        100
    ),

    goldOre: new Item(
        "goldOre",
        "Gold Ore",
        100
    )
};

export default ItemDatabase;