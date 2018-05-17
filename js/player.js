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
        ctx.font = "Bold 16px -apple-system, system-ui, BlinkMacSystemFont, Segoe UI, Roboto, Ubuntu";
        ctx.fillStyle = "#0095DD";
        ctx.fillText("Score: " + this.score, 8, 20);

        ctx.font = "Bold 16px -apple-system, system-ui, BlinkMacSystemFont, Segoe UI, Roboto, Ubuntu";
        ctx.fillStyle = "#0095DD";
        ctx.fillText("Lives: " + this.lives, this.maxWidth - 65, 20);
    }
}