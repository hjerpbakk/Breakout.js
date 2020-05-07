import { Ball } from './ball.2020.1.js';
import { Paddle } from './paddle.2020.1.js';
import { Brick } from './brick.js';
import { Bricks } from './bricks.js';
import { Player } from './player.js';

const brickRowCount = 6;
const brickColumnCount = 7;

const canvas = document.getElementById("myCanvas");
const maxWidth = canvas.width;
const maxHeight = canvas.height;
canvas.style.width = canvas.width + "px";
canvas.style.height = canvas.height + "px";
canvas.style.cursor = "none";

const ball = new Ball(maxWidth, maxHeight);
const paddle = new Paddle(maxWidth, maxHeight, document, canvas);
const bricks = new Bricks(brickRowCount, brickColumnCount, maxWidth);
const player = new Player(maxWidth, paddle);

const drawables = [bricks, player, ball, paddle];

// Scale for retina
// Get the device pixel ratio, falling back to 1.
const dpr = window.devicePixelRatio || 1;
// Get the size of the canvas in CSS pixels.
const rect = canvas.getBoundingClientRect();
// Give the canvas pixel dimensions of their CSS
// size * the device pixel ratio.
canvas.width = rect.width * dpr;
canvas.height = rect.height * dpr;
// Scale all drawing operations by the dpr, so you
// don't have to worry about the difference.
/** @type {WebGLRenderingContext} */
const ctx = canvas.getContext("2d");
ctx.scale(dpr, dpr);

function gameLoop() {
    ctx.clearRect(0, 0, maxWidth, maxHeight);

    paddle.update();
    ball.update(paddle, ballOutOfBounds);

    collisionDetection();

    drawables.forEach(function (drawable) {
        drawable.draw(ctx);
    });

    requestAnimationFrame(gameLoop);
}

function ballOutOfBounds() {
    player.lives--;
    if (!player.lives) {
        alert("GAME OVER");
        // TODO: WHY "TypeError: document.location is null"
        document.location.reload();
    }
    else {
        ball.reset();
        paddle.reset();
    }
}

function collisionDetection() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            var b = bricks.bricks[c][r];
            if (b.status === 1) {
                if (ball.x > b.x && ball.x < b.x + Brick.width && ball.y > b.y && ball.y < b.y + Brick.height) {
                    ball.dy = -ball.dy;
                    b.status = 0;
                    player.score++;
                    if (player.score === brickRowCount * brickColumnCount) {
                        alert("YOU WIN, CONGRATULATIONS!");
                        document.location.reload();
                    }
                }
            }
        }
    }
}

gameLoop();