import { ControlScheme } from "../controllers/control-scheme.js";
import { XboxController } from "./gamepad-mappings/xbox-controller.js";
import { DefaultController } from "./gamepad-mappings/default-controller.js";
import { NimbusController } from "./gamepad-mappings/nimbus-controller.js";
import { PS4Controller } from "./gamepad-mappings/ps4-controller.js";
import { XboxControllerWin } from "./gamepad-mappings/xbox-controller-win.js";
import { writeHelp } from "../ui/helpUI.js";

export class Gamepad extends ControlScheme {
    constructor() {
        super();
        this.controller = {};
        this.controllerScheme = {};
    }

    subscribeToInputEvents() {
        this.onGamepadConnected = this.gamepadConnected.bind(this);
        window.addEventListener("gamepadconnected", this.onGamepadConnected);
        this.onGamepadDisconnected = this.gamepadDisconnected.bind(this);
        window.addEventListener("gamepaddisconnected", this.onGamepadDisconnected);
    }

    unsubscribeToInputEvents() {
        window.removeEventListener("gamepadconnected", this.onGamepadConnected);
        window.removeEventListener("gamepaddisconnected", this.onGamepadDisconnected);
    }

    update() {
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

    gamepadConnected(e) {
        // Uncomment this to find the id of the controller
        //console.log(e.gamepad);
        this.setCurrentController(e.gamepad);
    }

    gamepadDisconnected(e) {
        this.controller = {};
        writeHelp(`${this.controllerScheme.name} disconnected`);
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

            let helpText = `${this.controllerScheme.name} connected - move the paddle using 🕹`;
            if (this.controllerScheme.supportButtons) {
                helpText = helpText + " or ⬅️ and ➡️";
            }

            writeHelp(helpText);
        }
    }
}