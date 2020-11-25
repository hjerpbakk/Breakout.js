import { ControlScheme } from "./control-scheme.js";
import { Paddle } from "../paddle.js";

export class Touch extends ControlScheme {
    constructor(canvas) {
        super();
        this.canvas = canvas;
        this.touchedX = 0;
        this.momentum = 0;
        this.hasMovedAtAll = false;
    }

    subscribeToInputEvents() {
        this.onTouchStart = this.touchHandler.bind(this);
        document.addEventListener("touchstart", this.onTouchStart);
        this.onTouchMove = this.touchHandler.bind(this);
        document.addEventListener("touchmove", this.onTouchMove);
    }

    unsubscribeToInputEvents() {
        document.removeEventListener("touchstart", this.onTouchStart);
        document.removeEventListener("touchmove", this.onTouchMove);
    }

    update(paddleX) {
        if (!this.hasMovedAtAll) {
            return 0;
        }
        
        const x = this.touchedX - this.canvas.offsetLeft;
        if (x > paddleX + Paddle.width) {
            return 1;
        } else if (x < paddleX) {
            return -1;
        } else {
            const halfPaddle = Paddle.width / 2;
            const center = paddleX + halfPaddle;
            const ratio = (x - center) / halfPaddle;
            return ratio;
        }
    }

    touchHandler(e) {
        e.preventDefault();
        this.touchedX = e.touches[0].pageX;
        this.hasMovedAtAll = true;
    }
}