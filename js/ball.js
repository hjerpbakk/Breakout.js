import { Drawable } from "./drawable.js";
import { clamp } from "./helpers.js";
import { Paddle } from "./paddle.js";

export class Ball extends Drawable {
    constructor(maxWidth, maxHeight) {
        super();
        this.radius = 6;
        this.maxWidth = maxWidth;
        this.maxHeight = maxHeight;
        this.reset();
    }

    static get speed() {
        return 3;
    }

    reset() {
        this.x = (this.maxWidth - this.radius) / 2;
        this.y = this.maxHeight - this.radius + 1 - Paddle.height * 2;
        this.dx = Ball.speed;
        this.dy = -Ball.speed;
    }

    update() {
        this.x += this.dx;
        this.y += this.dy;
        this.x = clamp(this.x, this.radius - 1, this.maxWidth - this.radius + 1);
        this.y = clamp(this.y, this.radius - 1, this.maxHeight - this.radius + 1);

        if (this.x > this.maxWidth - this.radius || this.x < this.radius) {
            this.dx = -this.dx;
        }
        
        if (this.y < this.radius) {
            this.dy = -this.dy;
        }
    }

    draw(/** @type {WebGLRenderingContext} */ ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();
    }
}