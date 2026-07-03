// src/entities/Player.js
// updated: 2026-07-03 (v0.2.5)

import GameConfig from "../config/GameConfig.js";
import Inventory from "../items/Inventory.js";

export default class Player {

    constructor(scene, x, y) {

        this.scene = scene;

        this.inventory = new Inventory(20);

        this.sprite = scene.add.rectangle(
            x,
            y,
            24,
            24,
            0x00ff88
        );

        scene.physics.add.existing(this.sprite);

        this.sprite.body.setCollideWorldBounds(true);

        this.sprite.setDepth(100);

        this.speed = GameConfig.PLAYER.SPEED;

    }

    update(vx, vy) {

        this.sprite.body.setVelocity(
            vx * this.speed,
            vy * this.speed
        );

    }

}