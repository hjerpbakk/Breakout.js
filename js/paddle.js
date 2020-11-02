import { Drawable } from "./drawable.js";
import { clamp } from "./helpers.js";
import { XboxController } from "./controllers/gamepad-mappings/xbox-controller.js";
import { DefaultController } from "./controllers/gamepad-mappings/default-controller.js";
import { NimbusController } from "./controllers/gamepad-mappings/nimbus-controller.js";
import { PS4Controller } from "./controllers/gamepad-mappings/ps4-controller.js";
import { XboxControllerWin } from "./controllers/gamepad-mappings/xbox-controller-win.js";

export class Paddle extends Drawable {
    constructor(maxWidth, maxHeight, canvas, color, controlScheme) {
        super();
        this.maxWidth = maxWidth;
        this.maxHeight = maxHeight;
        this.canvas = canvas;
        this.color = color;
        this.controlScheme = controlScheme;
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
        this.controlScheme.subscribeToInputEvents();
        document.addEventListener("touchstart", this.touchHandler.bind(this));
        document.addEventListener("touchmove", this.touchHandler.bind(this));
        window.addEventListener("gamepadconnected", this.gamepadConnected.bind(this));
        window.addEventListener("gamepaddisconnected", this.gamepadDisconnected.bind(this));
    }

    unsubscribeToInputEvents() {
        this.controlScheme.unsubscribeToInputEvents();
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
        // TODO: implement as controller:
        // - touch
        const momentum = this.gamepadUpdateHandler();

        // TODO: Create player <-> inputmanger and standardize update call here...
        // FOR Mouse
        //const momentum = this.controlScheme.update(this.x);
        // FOR Keyboard
        //const momentum = this.controlScheme.update();
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

    gamepadConnected(e) {
        // Uncomment this to find the id of the controller
        //console.log(e.gamepad);
        this.setCurrentController(e.gamepad);
    }

    gamepadDisconnected(e) {
        this.controller = {};
        const gamepadDiv = document.getElementById("gamepad");
        gamepadDiv.innerText = `${this.controllerScheme.name} disconnected`;
    }

    setCurrentController(gamepad) {
        if (!gamepad) {
            this.controller = {};
            return;    
        }

        // Uncomment this to find the id of the controller
        //console.log(this.controller);
        if (!this.controller.id || this.controller.id === gamepad.id) {
            this.controller = gamepad;
            const normalizedControllerId = this.controller.id.toLowerCase();
            if (normalizedControllerId.includes(XboxController.id)) {
                this.controllerScheme = XboxController;
            } else if (normalizedControllerId.includes(NimbusController.id)) {
                this.controllerScheme = new NimbusController(this.controller.buttons.length);
            } else if (normalizedControllerId.includes(PS4Controller.id)) {
                this.controllerScheme = new PS4Controller();
            } else if (normalizedControllerId.includes(XboxControllerWin.id)) {
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
    }

    gamepadUpdateHandler() {
        // Supports only ONE GAMEPAD, for now
        var gamepads = navigator.getGamepads();
        this.setCurrentController(gamepads[0]);

        if(this.controller.buttons) {
            const analogStick = this.controller.axes[0];
            if (analogStick < -0.08) {
                return analogStick;
            } 
            
            if (analogStick > 0.08) {
                return analogStick;
            } 
            
            if (this.controllerScheme.supportButtons) {
                //Uncomment to log which buttons are which on different controllers
                //for(var b=0; b<this.controller.buttons.length; b++) {
                //    if(this.controller.buttons[b].pressed) {
                //        console.log(b);
                //    }
                //}

                const pressed = (button) =>  button < this.controller.buttons.length && this.controller.buttons[button].pressed;
                if(this.controllerScheme.left.some(pressed)) {
                    return -1;
                } else if (this.controllerScheme.right.some(pressed)) {
                    return 1;
                }
            }
        }

        return 0;
    }
}