import { Scene } from "./scene.js";

export class Victory extends Scene {
    update() {
        alert("YOU WIN, CONGRATULATIONS!"); 
    }

    draw(/** @type {WebGLRenderingContext} */ ctx) {
        
    }

    dispose() {

    }
}