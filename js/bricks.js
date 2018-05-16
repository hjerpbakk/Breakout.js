import { Entity } from "./entity.js";
import { Brick } from './brick.js';

export class Bricks extends Entity {
    constructor(brickRowCount, brickColumnCount) {
        super();
        this.brickRowCount = brickRowCount;
        this.brickColumnCount = brickColumnCount;

        var brickPadding = 10;
        var brickOffsetTop = 30;
        var brickOffsetLeft = 30;
        this.bricks = [];
        for (var c = 0; c < brickColumnCount; c++) {
            this.bricks[c] = [];
            for (var r = 0; r < brickRowCount; r++) {
                const brickX = (c * (Brick.width + brickPadding)) + brickOffsetLeft;
                const brickY = (r * (Brick.height + brickPadding)) + brickOffsetTop;
                this.bricks[c][r] = new Brick(brickX, brickY);
            }
        }
    }

    update() {
    }

    draw(/** @type {WebGLRenderingContext} */ ctx) {
        for (var c = 0; c < this.brickColumnCount; c++) {
            for (var r = 0; r < this.brickRowCount; r++) {
                this.bricks[c][r].draw(ctx);
            }
        }
    }
}