import { Drawable } from "./drawable.js";
import { clamp } from "./helpers.js";
import { XboxController } from "./controllers/xbox-controller.js";
import { DefaultController } from "./controllers/default-controller.js";
import { NimbusController } from "./controllers/nimbus-controller.js";
import { PS4Controller } from "./controllers/ps4-controller.js";
import { XboxControllerWin } from "./controllers/xbox-controller-win.js";

export class Paddle extends Drawable {
    constructor(maxWidth, maxHeight, canvas) {
        super();
        this.maxWidth = maxWidth;
        this.maxHeight = maxHeight;
        this.canvas = canvas;
        this.momentum = 0;
        this.controller = {};
        this.controllerScheme = {};
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
        document.addEventListener("keydown", this.keyDownHandler.bind(this));
        document.addEventListener("keyup", this.keyUpHandler.bind(this));
        document.addEventListener("mousemove", this.mouseHandler.bind(this));
        document.addEventListener("touchstart", this.touchHandler.bind(this));
        document.addEventListener("touchmove", this.touchHandler.bind(this));
        window.addEventListener("gamepadconnected", this.gamepadConnected.bind(this));
        window.addEventListener("gamepaddisconnected", this.gamepadDisconnected.bind(this));
    }

    unsubscribeToInputEvents() {
        document.removeEventListener("keydown", this.keyDownHandler.bind(this));
        document.removeEventListener("keyup", this.keyUpHandler.bind(this));
        document.removeEventListener("mousemove", this.mouseHandler.bind(this));
        document.removeEventListener("touchstart", this.touchHandler.bind(this));
        document.removeEventListener("touchmove", this.touchHandler.bind(this));
        window.removeEventListener("gamepadconnected", this.gamepadConnected.bind(this));
        window.removeEventListener("gamepaddisconnected", this.gamepadDisconnected.bind(this));
    }    

    reset() {
        this.x = (this.maxWidth - Paddle.width) / 2;
        this.y = this.maxHeight - Paddle.height * 2;
    }

    update() {
        this.gamepadUpdateHandler();
        this.x += Paddle.speed * this.momentum;
        this.x = clamp(this.x, 0, this.maxWidth - Paddle.width);
    }

    draw(/** @type {WebGLRenderingContext} */ ctx) {
        ctx.beginPath();
        ctx.rect(this.x, this.y, Paddle.width, Paddle.height);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();
    }

    keyDownHandler(e) {
        if (e.keyCode === 39) {
            this.momentum = 1;
        }
        else if (e.keyCode === 37) {
            this.momentum = -1;
        }
    }

    keyUpHandler(e) {
        if (e.keyCode === 39 && this.momentum === 1) {
            this.momentum = 0;
        } else if (e.keyCode === 37 && this.momentum === -1) {
            this.momentum = 0;
        }
    }

    /**
     * @param {MouseEvent} e
     */
    mouseHandler(e) { 
        e.preventDefault();
        this.x = e.pageX - this.canvas.offsetLeft - Paddle.width / 2;
    }

    touchHandler(e) {
        this.x = e.touches[0].pageX - this.canvas.offsetLeft - Paddle.width / 2;
        e.preventDefault();
    }

    gamepadConnected(e) {
        this.controller = e.gamepad;
        // Uncomment this to find the id of the controller
        console.log(this.controller);

        if (this.controller.id.includes(XboxController.id)) {
            this.controllerScheme = XboxController;
        } else if (this.controller.id.includes(NimbusController.id)) {
            this.controllerScheme = new NimbusController(this.controller.buttons.length);
        } else if (this.controller.id.includes(PS4Controller.id)) {
            this.controllerScheme = new PS4Controller(this.controller.buttons.length);
        } else if (this.controller.id.includes(XboxControllerWin.id)) {
            this.controllerScheme = XboxControllerWin;
        } else {
            this.controllerScheme = DefaultController;
        }

        const gamepadDiv = document.getElementById("gamepad");
        gamepadDiv.innerText = `${this.controllerScheme.name} connected - move the paddle using 🕹`;
        if (this.controllerScheme.supportButtons) {
            gamepadDiv.innerText = gamepadDiv.innerText + " or ⬅️ and ➡️";
        }
    }

    gamepadDisconnected(e) {
        this.controller = {};
        const gamepadDiv = document.getElementById("gamepad");
        gamepadDiv.innerText = `${this.controllerScheme.name} disconnected`;
    }

    gamepadUpdateHandler() {
        navigator.getGamepads();
        if(this.controller.buttons) {
            const analogStick = this.controller.axes[0];
            if (analogStick < -0.08) {
                this.momentum = analogStick;
            } else if (analogStick > 0.8) {
                this.momentum = analogStick;
            } else {
                this.momentum = 0;
            }
            
            if (this.controllerScheme.supportButtons) {
                if(this.controller.buttons[this.controllerScheme.left].pressed) {
                    this.momentum = -1;
                } else if (this.controller.buttons[this.controllerScheme.right].pressed) {
                    this.momentum = 1;
                }
            }
            
            // Uncomment to log which buttons are which on different controllers
            // for(var b=0; b<this.controller.buttons.length; b++) {
            //     if(this.controller.buttons[b].pressed) {
            //         console.log(b);
            //     }
            // }
        }
    }
}