import { Drawable } from "./drawable.js";
import { clamp } from "./helpers.js";

export class Paddle extends Drawable {
    constructor(maxWidth, maxHeight, document, canvas) {
        super();
        this.maxWidth = maxWidth;
        this.maxHeight = maxHeight;
        this.canvas = canvas;
        this.rightPressed = false;
        this.leftPressed = false;
        document.addEventListener("keydown", this.keyDownHandler.bind(this), false);
        document.addEventListener("keyup", this.keyUpHandler.bind(this), false);
        document.addEventListener("mousemove", this.mouseHandler.bind(this), false);
        this.reset();
    }

    static get width() {
        return 75;
    }

    static get height() {
        return 10;
    }

    static get speed() {
        return 10;
    }

    reset() {
        this.x = (this.maxWidth - Paddle.width) / 2;
        this.y = this.maxHeight - Paddle.height * 2;
    }

    update() {
        if (this.rightPressed) {
            this.x += Paddle.speed;
        } else if (this.leftPressed) {
            this.x -= Paddle.speed;
        }

        this.x = clamp(this.x, 0, this.maxWidth - Paddle.width);
    }

    draw(/** @type {WebGLRenderingContext} */ ctx) {
        ctx.beginPath();
        ctx.rect(this.x, this.y, Paddle.width, Paddle.height);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();
    }

    keyDownHandler(e) {
        if (e.keyCode === 39) {
            this.rightPressed = true;
        }
        else if (e.keyCode === 37) {
            this.leftPressed = true;
        }
    }

    keyUpHandler(e) {
        if (e.keyCode === 39) {
            this.rightPressed = false;
        } else if (e.keyCode === 37) {
            this.leftPressed = false;
        }
    }

    /**
     * @param {MouseEvent} e
     */
    mouseHandler(e) { 
        this.x = e.pageX - this.canvas.offsetLeft - Paddle.width / 2;
    }
}