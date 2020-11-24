import { Scene } from "./scene.js";

export class SinglePlayerSettings extends Scene {
    constructor(canvas, maxWidth, maxHeight, dpr, buttonWidth) {
        super();
        this.canvas = canvas;
        this.canvas.style.cursor = "default";
        this.maxWidth = maxWidth;
        this.maxHeight = maxHeight;
        this.dpr = dpr;
        this.buttonWidth = buttonWidth;
        this.subscribeToInputEvents();
        this.singlePlayer = false;
        this.control = "⌨️";
    }

    update() {
      this.controllers = [];
    }

    draw(/** @type {WebGLRenderingContext} */ ctx) {
        this.ctx = ctx;

        const menuSpacing = 42;

        ctx.font = "Bold 32px -apple-system, system-ui, BlinkMacSystemFont, Segoe UI, Roboto, Ubuntu";
        ctx.fillStyle = "black";
        let text = "Single Player";
        const titleWidth = ctx.measureText(text).width;
        ctx.fillText(text, this.maxWidth / 2 - titleWidth / 2, this.maxHeight / 2 - 90);

        this.controllerFontSize = 24;
        ctx.font = `Bold ${this.controllerFontSize}px -apple-system, system-ui, BlinkMacSystemFont, Segoe UI, Roboto, Ubuntu`;
        
        ctx.fillStyle = "black";
        text = "Player 1";
        const p1X = this.maxWidth / 2 - ctx.measureText(text).width / 2;
        ctx.fillText(text, p1X, this.maxHeight / 2 - 30);
        this.addControlButton("⌨️", p1X, this.maxHeight / 2 + 10);
        this.addControlButton("🖱️", p1X + 33, this.maxHeight / 2 + 10);
        this.addControlButton("🎮", p1X + 66, this.maxHeight / 2 + 10);

        ctx.font = "Bold 16px -apple-system, system-ui, BlinkMacSystemFont, Segoe UI, Roboto, Ubuntu";

        text = "Let's go!";
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

    addControlButton(text, x, y) {
      this.ctx.fillStyle = "black";
      this.ctx.fillText(text, x, y);
      const measuredWidth = this.ctx.measureText(text).width;
      const path = new Path2D();
      path.rect(x - 5, y - this.controllerFontSize, measuredWidth + 10, this.controllerFontSize + 5);
      path.closePath();
      this.ctx.fillStyle = "#FFFFFF00";
      this.ctx.fill(path);
      this.ctx.lineWidth = 2;
      if (text === this.getPlayer1Control()) {
        this.ctx.strokeStyle = "green";
      } else {
        this.ctx.strokeStyle = "#00000000";
      }
      
      this.ctx.stroke(path);
      this.controllers.push({path: path, control: text, isPlayer1: true});
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
      if (this.ctx.isPointInPath(this.startGamePath, XY.x, XY.y)) {
        this.singlePlayer = true;
        return;
      }

      this.controllers.forEach(control => {
        if (this.ctx.isPointInPath(control.path, XY.x, XY.y)) {
          this.setPlayer1Control(control.control);
          return;
        }
      });
    }

    moveHandler(e) {
      const XY = this.getXY(e);
      if(this.ctx.isPointInPath(this.startGamePath, XY.x, XY.y) || this.controllers.some((p) => this.ctx.isPointInPath(p.path, XY.x, XY.y))) {
        this.canvas.style.cursor = "pointer";
      } else {
        this.canvas.style.cursor = "default";
      }
    }

    getPlayer1Control() {
      this.control = localStorage.getItem("Player1Control") ?? "⌨️";
      return this.control;
    }

    setPlayer1Control(control) {
      localStorage.setItem("Player1Control", control);
    }
}