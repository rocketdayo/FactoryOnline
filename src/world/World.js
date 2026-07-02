import GameConfig from "../config/GameConfig.js";

export default class World {
    constructor(scene) {
        this.scene = scene;

        this.tileSize = GameConfig.WORLD.TILE_SIZE;
        this.width = GameConfig.WORLD.WIDTH;
        this.height = GameConfig.WORLD.HEIGHT;

        this.tiles = [];

        this.createGround();
    }

    createGround() {
        const graphics = this.scene.add.graphics();

        const size = this.tileSize;

        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {

                const worldX = x * size;
                const worldY = y * size;

                const isEven = (x + y) % 2 === 0;

                graphics.fillStyle(isEven ? 0x2b8a3e : 0x2f9e44, 1);
                graphics.fillRect(worldX, worldY, size, size);
            }
        }

        // ワールド境界（見えない壁用）
        this.scene.physics.world.setBounds(
            0,
            0,
            this.width * size,
            this.height * size
        );
    }
}