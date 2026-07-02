export default class Ore {
    constructor(scene, x, y, type = "iron") {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.type = type;

        this.hp = this.getHP(type);

        this.sprite = scene.add.circle(
            x,
            y,
            10,
            this.getColor(type)
        );

        scene.physics.add.existing(this.sprite);
        this.sprite.body.setImmovable(true);
    }

    getHP(type) {
        switch (type) {
            case "iron": return 3;
            case "copper": return 2;
            case "gold": return 5;
            default: return 1;
        }
    }

    getColor(type) {
        switch (type) {
            case "iron": return 0x8c8c8c;
            case "copper": return 0xd17b0f;
            case "gold": return 0xffd700;
            default: return 0xffffff;
        }
    }

    mine() {
        this.hp -= 1;

        if (this.hp <= 0) {
            this.destroy();
            return true;
        }

        return false;
    }

    destroy() {
        this.sprite.destroy();
    }
}