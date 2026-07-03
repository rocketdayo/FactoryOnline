import World from "../world/World.js";
import OreGenerator from "../world/OreGenerator.js";

export default class WorldSystem {

    constructor(scene) {

        this.scene = scene;

        this.world = new World(scene);

        this.oreGenerator = new OreGenerator(scene);

    }

    getNearbyOre(player, range = 40) {

        return this.oreGenerator.getNearbyOre(
            player,
            range
        );

    }

}