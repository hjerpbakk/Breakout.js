import { Ball } from './ball.js';
import { Paddle } from './paddle.js';
import { Brick } from './brick.js';
import { Bricks } from './bricks.js';
import { Player } from './player.js';

const canvas = document.getElementById("myCanvas");
canvas.style.width = "480px";
canvas.style.height = "360px";
const maxWidth = 480;
const maxHeight = 360;

const ball = new Ball(maxWidth, maxHeight);
const paddle = new Paddle(maxWidth, maxHeight);
const brickRowCount = 6;
const brickColumnCount = 7;
const bricks = new Bricks(brickRowCount, brickColumnCount, maxWidth);

const player = new Player(maxWidth);
const entities = [ball, paddle, bricks, player];


/** @type {WebGLRenderingContext} */
const ctx = canvas.getContext("2d");
ctx.scale(2,2);

function draw() {
    ctx.clearRect(0, 0, maxWidth, maxHeight);

    entities.forEach(function (entity) {
        entity.update();
    });

    if (ball.x + ball.dx > maxWidth - ball.radius || ball.x + ball.dx < ball.radius) {
        ball.dx = -ball.dx;
    }

    if (ball.y + ball.dy < ball.radius) {
        ball.dy = -ball.dy;
    } else if (ball.y + ball.dy > maxHeight - ball.radius) {
        if (ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
            ball.dy = -ball.dy;
        }
        else {
            player.lives--;
            if (!player.lives) {
                alert("GAME OVER");
                document.location.reload();
            }
            else {
                ball.reset();
                paddle.reset();
            }
        }
    }

    collisionDetection();

    entities.forEach(function (entity) {
        entity.draw(ctx);
    });

    requestAnimationFrame(draw);
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function keyDownHandler(e) {
    if (e.keyCode == 39) {
        paddle.rightPressed = true;
    }
    else if (e.keyCode == 37) {
        paddle.leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.keyCode == 39) {
        paddle.rightPressed = false;
    }
    else if (e.keyCode == 37) {
        paddle.leftPressed = false;
    }
}

function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < maxWidth) {
        paddle.x = relativeX - paddle.width / 2;
    }
}

function collisionDetection() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            var b = bricks.bricks[c][r];
            if (b.status == 1) {
                if (ball.x > b.x && ball.x < b.x + Brick.width && ball.y > b.y && ball.y < b.y + Brick.height) {
                    ball.dy = -ball.dy;
                    b.status = 0;
                    player.score++;
                    if (player.score == brickRowCount * brickColumnCount) {
                        alert("YOU WIN, CONGRATULATIONS!");
                        document.location.reload();
                    }
                }
            }
        }
    }
}

draw();