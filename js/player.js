import { Entity } from "./entity.js";

export class Player extends Entity {
    constructor(maxWidth) {
        super();
        this.maxWidth = maxWidth;
        this.reset();
    }

    reset() {
        this.score = 0;
        this.lives = 3;
    }

    update() {

    }

    draw(/** @type {WebGLRenderingContext} */ ctx) {
        ctx.font = "16px Arial";
        ctx.fillStyle = "#0095DD";
        ctx.fillText("Score: " + this.score, 8, 20);

        ctx.font = "16px Arial";
        ctx.fillStyle = "#0095DD";
        ctx.fillText("Lives: " + this.lives, this.maxWidth - 65, 20);
    }
}