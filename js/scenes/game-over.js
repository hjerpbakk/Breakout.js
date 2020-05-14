import { Scene } from "./scene.js";

export class GameOver extends Scene {
    update() {
        alert("GAME OVER"); 
    }

    draw(/** @type {WebGLRenderingContext} */ ctx) {
        
    }

    dispose() {

    }
}