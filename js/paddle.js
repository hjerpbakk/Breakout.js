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
        document.addEventListener("touchstart", this.touchHandler.bind(this));
        document.addEventListener("touchmove", this.touchHandler.bind(this));
    }

    unsubscribeToInputEvents() {
        this.controlScheme.unsubscribeToInputEvents();
        document.removeEventListener("touchstart", this.touchHandler.bind(this));
        document.removeEventListener("touchmove", this.touchHandler.bind(this));
    }    

    reset() {
        this.x = (this.maxWidth - Paddle.width) / 2;
        this.y = this.maxHeight - Paddle.height * 2;
    }

    update() {
        // TODO: implement as controller:
        // - touch
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

    touchHandler(e) {
        this.x = e.touches[0].pageX - this.canvas.offsetLeft - Paddle.width / 2;
        e.preventDefault();
    }
}