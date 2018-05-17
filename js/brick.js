import { Entity } from "./entity.js";

export class Brick extends Entity {
    constructor(x, y, color) {
        super();
        this.x = x;
        this.y = y;
        this.status = 1;
        this.color = color;
    }

    static get width() {
        return 50;
    }
    
    static get height() {
        return 15;
    }
    
    update() {
    }

    draw(/** @type {WebGLRenderingContext} */ ctx) {
        if (this.status != 1) {
            return;
        }

        ctx.beginPath();
        ctx.rect(this.x, this.y, Brick.width, Brick.height);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}