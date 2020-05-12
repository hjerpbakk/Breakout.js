import { Drawable } from "./drawable.js";

export class Player extends Drawable {
    constructor(maxWidth, paddle) {
        super();
        this.maxWidth = maxWidth;
        this.paddle = paddle;
        this.reset();
    }

    reset() {
        this.score = 0;
        this.lives = 3;
    }

    draw(/** @type {WebGLRenderingContext} */ ctx) {
        ctx.font = "Bold 16px -apple-system, system-ui, BlinkMacSystemFont, Segoe UI, Roboto, Ubuntu";
        ctx.fillStyle = "black";
        ctx.fillText("Score: " + this.score, 8, 20);

        ctx.font = "Bold 16px -apple-system, system-ui, BlinkMacSystemFont, Segoe UI, Roboto, Ubuntu";
        ctx.fillStyle = "black";
        ctx.fillText("Lives: " + this.lives, this.maxWidth - 65, 20);
    }
}