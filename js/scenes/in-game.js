import { Drawable } from "../drawable.js";
import { Ball } from '../ball.js';
import { Paddle } from '../paddle.js';
import { Brick } from '../brick.js';
import { Bricks } from '../bricks.js';
import { Player } from '../player.js';

export class InGame extends Drawable {
    constructor(canvas, maxWidth, maxHeight) {
        super();
        this.brickRowCount = 6;
        this.brickColumnCount = 7;

        this.ball = new Ball(maxWidth, maxHeight);
        this.paddle = new Paddle(maxWidth, maxHeight, canvas);
        this.bricks = new Bricks(this.brickRowCount, this.brickColumnCount, maxWidth);
        this.player = new Player(maxWidth, this.paddle);

        this.drawables = [this.bricks, this.player, this.ball, this.paddle];
    }

    update() {
        this.paddle.update();
        const outOfBounds = this.ball.update(this.paddle);
        if (outOfBounds) {
            this.player.lives--;
            if (!this.player.lives) {
                return true;
            }
            else {
                this.ball.reset();
                this.paddle.reset();
            }
        }

        this.collisionDetection();
        return this.player.score === this.brickRowCount * this.brickColumnCount;
    }

    draw(/** @type {WebGLRenderingContext} */ ctx) {
        this.drawables.forEach(function (drawable) {
            drawable.draw(ctx);
        });
    }

    collisionDetection() {
        for (var c = 0; c < this.brickColumnCount; c++) {
            for (var r = 0; r < this.brickRowCount; r++) {
                var b = this.bricks.bricks[c][r];
                if (b.status === 1) {
                    if (this.ball.x > b.x && this.ball.x < b.x + Brick.width && this.ball.y > b.y && this.ball.y < b.y + Brick.height) {
                        this.ball.dy = -this.ball.dy;
                        b.status = 0;
                        this.player.score++;
                    }
                }
            }
        }
    }
}