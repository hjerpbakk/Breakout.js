import { Scene } from "./scene.js";

export class MainMenu extends Scene {
    constructor(canvas, maxWidth, maxHeight, dpr) {
        super();
        this.canvas = canvas;
        this.canvas.style.cursor = "default";
        this.maxWidth = maxWidth;
        this.maxHeight = maxHeight;
        this.dpr = dpr;
        this.subscribeToInputEvents();
        this.newGame = false;
    }

    update() {
        
    }

    draw(/** @type {WebGLRenderingContext} */ ctx) {
        this.ctx = ctx;

        ctx.font = "Bold 32px -apple-system, system-ui, BlinkMacSystemFont, Segoe UI, Roboto, Ubuntu";
        ctx.fillStyle = "black";
        let text = "Breakout";
        let w = ctx.measureText(text).width;
        ctx.fillText(text, this.maxWidth / 2 - w / 2, this.maxHeight / 2 - 90);

        ctx.font = "Bold 16px -apple-system, system-ui, BlinkMacSystemFont, Segoe UI, Roboto, Ubuntu";
        text = "New Game";
        w = ctx.measureText(text).width;
        
        this.newGamePath = new Path2D();
        this.newGamePath.rect(this.maxWidth / 2 - w / 2 - 10, this.maxHeight / 2 - ((16 * this.dpr) / 2) - 5, w + 20, 16 * this.dpr);
        this.newGamePath.closePath();

        ctx.fillStyle = "#FFFFFF";
        ctx.fillStyle = "rgba(225,225,225,0.5)";
        ctx.fill(this.newGamePath);
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#000000";
        ctx.stroke(this.newGamePath);

        ctx.fillStyle = "black";
        ctx.fillText(text, this.maxWidth / 2 - w / 2, this.maxHeight / 2);
    }

    dispose() {
        this.unsubscribeToInputEvents();
    }

    subscribeToInputEvents() {
        document.addEventListener("click", this.clickedHandler.bind(this));
        document.addEventListener("mousemove", this.moveHandler.bind(this));
    }

    unsubscribeToInputEvents() {
      document.removeEventListener("click", this.clickedHandler.bind(this));
      document.removeEventListener("mousemove", this.moveHandler.bind(this));
    }

    getXY(e) {
      const rect = this.canvas.getBoundingClientRect()
      const y = (e.clientY - rect.top) * this.dpr;
      const x = (e.clientX - rect.left) * this.dpr;
      return {x:x, y:y};
    }

    clickedHandler(e) {
      const XY = this.getXY(e);
      if(this.ctx.isPointInPath(this.newGamePath, XY.x, XY.y)) {
        this.newGame = true;
      }
    }

    moveHandler(e) {
      const XY = this.getXY(e);
      if(this.ctx.isPointInPath(this.newGamePath, XY.x, XY.y)) {
        this.canvas.style.cursor = "pointer";
      } else {
        this.canvas.style.cursor = "default";
      }
    }
}