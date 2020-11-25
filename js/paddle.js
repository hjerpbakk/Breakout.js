import { Drawable } from "./drawable.js";
import { clamp } from "./helpers.js";

export class Paddle extends Drawable {
    constructor(maxWidth, maxHeight, canvas, color, controlScheme) {
        super();
        this.maxWidth = maxWidth;
        this.maxHeight = maxHeight;
        this.canvas = canvas;
        this.color = color;
        this.controlScheme = controlScheme;
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

    subscribeToInputEvents() {
        this.controlScheme.subscribeToInputEvents();
    }

    unsubscribeToInputEvents() {
        this.controlScheme.unsubscribeToInputEvents();
    }

    reset() {
        this.x = (this.maxWidth - Paddle.width) / 2;
        this.y = this.maxHeight - Paddle.height * 2;
    }

    update() {
        const momentum = this.controlScheme.update(this.x);
        this.x += Paddle.speed * momentum;
        this.x = clamp(this.x, 0, this.maxWidth - Paddle.width);
    }

    draw(/** @type {WebGLRenderingContext} */ ctx) {
        ctx.beginPath();
        ctx.rect(this.x, this.y, Paddle.width, Paddle.height);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}