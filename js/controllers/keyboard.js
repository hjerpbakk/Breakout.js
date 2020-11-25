import { ControlScheme } from "../controllers/control-scheme.js";

export class Keyboard extends ControlScheme {
    constructor(left, right) {
        super();
        this.left = left;
        this.right = right;
        this.momentum = 0;
    }

    subscribeToInputEvents() {
        this.onKeyDown = this.keyDownHandler.bind(this);
        document.addEventListener("keydown", this.onKeyDown);
        this.onKeyUp = this.keyUpHandler.bind(this);
        document.addEventListener("keyup", this.onKeyUp);
    }

    unsubscribeToInputEvents() {
        document.removeEventListener("keydown", this.onKeyDown);
        document.removeEventListener("keyup", this.onKeyUp);
    }

    update() {
        return this.momentum;
    }

    keyDownHandler(e) {
        if (e.keyCode === this.right) {
            this.momentum = 1;
        }
        else if (e.keyCode === this.left ) {
            this.momentum = -1;
        }
    }

    keyUpHandler(e) {
        if (e.keyCode === this.right && this.momentum === 1) {
            this.momentum = 0;
        } else if (e.keyCode === this.left  && this.momentum === -1) {
            this.momentum = 0;
        }
    }
}