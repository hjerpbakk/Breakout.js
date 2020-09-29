import { ControlScheme } from "../controllers/control-scheme.js";

export class Keyboard extends ControlScheme {
    constructor(left, right) {
        super();
        this.left = left;
        this.right = right;
        this.momentum = 0;
    }

    subscribeToInputEvents() {
        document.addEventListener("keydown", this.keyDownHandler.bind(this));
        document.addEventListener("keyup", this.keyUpHandler.bind(this));
    }

    unsubscribeToInputEvents() {
        document.removeEventListener("keydown", this.keyDownHandler.bind(this));
        document.removeEventListener("keyup", this.keyUpHandler.bind(this));
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