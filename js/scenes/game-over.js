import { Scene } from "./scene.js";

export class GameOver extends Scene {
    constructor(canvas, maxWidth, maxHeight, dpr, buttonWidth) {
        super();
        this.canvas = canvas;
        this.maxWidth = maxWidth;
        this.maxHeight = maxHeight;
        this.dpr = dpr;
        this.buttonWidth = buttonWidth;
        this.subscribeToInputEvents();
    }

    update() {
        //alert("GAME OVER"); 
    }

    draw(/** @type {WebGLRenderingContext} */ ctx) {
        ctx.font = "Bold 32px -apple-system, system-ui, BlinkMacSystemFont, Segoe UI, Roboto, Ubuntu";
        ctx.fillStyle = "black";
        let text = "Game Over";
        const titleWidth = ctx.measureText(text).width;
        ctx.fillText(text, this.maxWidth / 2 - titleWidth / 2, this.maxHeight / 2 - 90);

        ctx.font = "Bold 16px -apple-system, system-ui, BlinkMacSystemFont, Segoe UI, Roboto, Ubuntu";

        text = "Try again!";
        const menuSpacing = 42;
        const settingsWidth = ctx.measureText(text).width;
        this.startGamePath = new Path2D();
        this.startGamePath.rect(this.maxWidth / 2 - this.buttonWidth / 2 - 10, (this.maxHeight / 2) + menuSpacing * 3 - ((16 * this.dpr) / 2) - 5, this.buttonWidth + 20, 16 * this.dpr);
        this.startGamePath.closePath();
        ctx.fillStyle = "#FFFFFF";
        ctx.fillStyle = "rgba(225,225,225,0.5)";
        ctx.fill(this.startGamePath);
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#000000";
        ctx.stroke(this.startGamePath);
        ctx.fillStyle = "black";
        ctx.fillText(text, this.maxWidth / 2 - settingsWidth / 2, (this.maxHeight / 2) + menuSpacing * 3);
    }

    dispose() {
        this.unsubscribeToInputEvents();
    }

    subscribeToInputEvents() {
        //this.onClick = this.clickedHandler.bind(this);
        //document.addEventListener("click", this.onClick);
        //this.onMouseMove = this.moveHandler.bind(this);
        //document.addEventListener("mousemove", this.onMouseMove);
    }

    unsubscribeToInputEvents() {
        //document.removeEventListener("click", this.onClick);
        //document.removeEventListener("mousemove", this.onMouseMove);
    }
}