import { Drawable } from "./drawable.js";

export class Paddle extends Drawable {
    constructor(maxWidth, maxHeight) {
        super();
        this.speed = 14;
        this.height = 10;
        this.width = 75;
        this.maxWidth = maxWidth;
        this.maxHeight = maxHeight;
        this.rightPressed = false;
        this.leftPressed = false;
        this.reset();       
    }

    reset() {
        this.x = (this.maxWidth - this.width) / 2;
        this.y = this.maxHeight - this.height * 2;
    }

    update() {
        if (this.rightPressed && this.x < this.maxWidth - this.width) {
            this.x += this.speed;
        }
        else if (this.leftPressed && this.x > 0) {
            this.x -= this.speed;
        }
    }

    draw(/** @type {WebGLRenderingContext} */ ctx) {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();
    }
}