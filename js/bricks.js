import { Entity } from "./entity.js";
import { Brick } from './brick.js';

export class Bricks extends Entity {
    constructor(brickRowCount, brickColumnCount, maxWidth) {
        super();
        this.brickRowCount = brickRowCount;
        this.brickColumnCount = brickColumnCount;

        const brickPadding = 10;
        const brickOffsetTop = 40;
        const brickOffsetLeft = (maxWidth - (brickColumnCount * (Brick.width + brickPadding)) - brickPadding + (Brick.width / 2)) / 2;
        this.bricks = [];
        for (let c = 0; c < brickColumnCount; c++) {
            this.bricks[c] = [];
            for (let r = 0; r < brickRowCount; r++) {
                const brickX = (c * (Brick.width + brickPadding)) + brickOffsetLeft;
                const brickY = (r * (Brick.height + brickPadding)) + brickOffsetTop;
                this.bricks[c][r] = new Brick(brickX, brickY, this.getColor(r));
            }
        }
    }

    getColor(index) {
        switch (index) {
            case 0:
                return "#5EBD3E";
            case 1:
                return "#FFB900";
            case 2:
                return "#F78200";
            case 3:
                return "#E23838";
            case 4:
                return "#973999";
            case 5:
                return "#009CDF";
        }
    }

    update() {
    }

    draw(/** @type {WebGLRenderingContext} */ ctx) {
        for (let c = 0; c < this.brickColumnCount; c++) {
            for (let r = 0; r < this.brickRowCount; r++) {
                this.bricks[c][r].draw(ctx);
            }
        }
    }
}