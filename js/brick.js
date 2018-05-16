import { Entity } from "./entity.js";

export class Brick extends Entity {
    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.status = 1;
    }

    static get width() {
        return 75;
    }
    
    static get height() {
        return 20;
    }
    
    update() {
    }

    draw(/** @type {WebGLRenderingContext} */ ctx) {
        if (this.status != 1) {
            return;
        }

        ctx.beginPath();
        ctx.rect(this.x, this.y, Brick.width, Brick.height);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }
}