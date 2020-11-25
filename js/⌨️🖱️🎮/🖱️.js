import { ControlScheme } from "./control-scheme.js";
import { Paddle } from "../paddle.js";

export class Mouse extends ControlScheme {
    constructor(canvas, maxWidth) {
        super();
        this.canvas = canvas;
        this.maxWidth = maxWidth;
        this.mouseX = 0;
        this.hasMovedAtAll = false;
    }

    subscribeToInputEvents() {
        this.onMouseMove = this.mouseHandler.bind(this);
        document.addEventListener("mousemove", this.onMouseMove);
    }

    unsubscribeToInputEvents() {
        document.removeEventListener("mousemove", this.onMouseMove);
    }

    /**
     * @param {MouseEvent} e
     */
    mouseHandler(e) { 
        e.preventDefault();
        this.mouseX = e.pageX;
        this.hasMovedAtAll = true;
    }

    update(paddleX) {
        if (!this.hasMovedAtAll) {
            return 0;
        }
        
        const x = this.mouseX - this.canvas.offsetLeft;
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
}