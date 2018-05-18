import { Drawable } from "./drawable.js";
import { clamp } from "./helpers.js";

export class Paddle extends Drawable {
    constructor(maxWidth, maxHeight, document) {
        super();
        this.speed = 14;
        this.height = 10;
        this.width = 75;
        this.maxWidth = maxWidth;
        this.maxHeight = maxHeight;
        this.rightPressed = false;
        this.leftPressed = false;
        document.addEventListener("keydown", this.keyDownHandler.bind(this), false);
        document.addEventListener("keyup", this.keyUpHandler.bind(this), false);
        this.reset();
    }

    reset() {
        this.x = (this.maxWidth - this.width) / 2;
        this.y = this.maxHeight - this.height * 2;
    }

    update() {
        if (this.rightPressed) {
            this.x += this.speed;
        }
        else if (this.leftPressed) {
            this.x -= this.speed;
        }

        this. x = clamp(this.x, 0, this.maxWidth - this.width);
    }

    draw(/** @type {WebGLRenderingContext} */ ctx) {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();
    }

    keyDownHandler(e) {
        if (e.keyCode == 39) {
            this.rightPressed = true;
        }
        else if (e.keyCode == 37) {
            this.leftPressed = true;
        }
    }

    keyUpHandler(e) {
        if (e.keyCode == 39) {
            this.rightPressed = false;
        }
        else if (e.keyCode == 37) {
            this.leftPressed = false;
        }
    }
}