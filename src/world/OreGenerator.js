import Ore from "../entities/Ore.js";

export default class OreGenerator {
    constructor(scene) {
        this.scene = scene;
        this.ores = [];

        this.generate();
    }

    generate() {
        const types = ["iron", "copper", "gold"];

        for (let i = 0; i < 50; i++) {
            const x = Phaser.Math.Between(100, 3000);
            const y = Phaser.Math.Between(100, 3000);

            const type = types[Phaser.Math.Between(0, types.length - 1)];

            const ore = new Ore(this.scene, x, y, type);
            this.ores.push(ore);
        }
    }

    getNearbyOre(player, range = 40) {
        return this.ores.find(o => {
            if (!o.sprite.active) return false;

            const dx = o.x - player.x;
            const dy = o.y - player.y;

            return Math.sqrt(dx * dx + dy * dy) < range;
        });
    }
}