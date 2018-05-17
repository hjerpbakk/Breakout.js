import { Entity } from "./entity.js";

export class Ball extends Entity {
    constructor(maxWidth, maxHeight) {
        super();
        this.radius = 6;
        this.maxWidth = maxWidth;
        this.maxHeight = maxHeight;
        this.reset();
    }

    reset() {
        this.x = (this.maxWidth - this.radius) / 2;
        this.y = this.maxHeight - (this.radius / 2) - 19;

        const speed = 4;
        this.dx = speed;
        this.dy = -speed;
    }

    update() {
        this.x += this.dx;
        this.y += this.dy;
    }

    draw(/** @type {WebGLRenderingContext} */ ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }
}