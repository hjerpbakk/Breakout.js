import { Scene } from "./scene.js";

export class MultiplayerSettings extends Scene {
  constructor(canvas, maxWidth, maxHeight, dpr, buttonWidth) {
    super();
    this.canvas = canvas;
    this.maxWidth = maxWidth;
    this.maxHeight = maxHeight;
    this.dpr = dpr;
    this.buttonWidth = buttonWidth;
    this.subscribeToInputEvents();
    this.localCoop = false;
    this.canvas.style.cursor = "default";
  }

  update() {
    this.controllers = [];
  }

  draw(/** @type {WebGLRenderingContext} */ ctx) {
    this.ctx = ctx;

    const menuSpacing = 42;

    ctx.font = "Bold 32px -apple-system, system-ui, BlinkMacSystemFont, Segoe UI, Roboto, Ubuntu";
    ctx.fillStyle = "black";
    // TODO: use in both co-op and competitive multiplayer
    let text = "Multiplayer";
    const titleWidth = ctx.measureText(text).width;
    ctx.fillText(text, this.maxWidth / 2 - titleWidth / 2, this.maxHeight / 2 - 90);

    this.controllerFontSize = 24;
    ctx.font = `Bold ${this.controllerFontSize}px -apple-system, system-ui, BlinkMacSystemFont, Segoe UI, Roboto, Ubuntu`;

    ctx.fillStyle = "black";
    ctx.fillText("Player 1", 30, this.maxHeight / 2 - 30);
    this.addControlButton("⌨️", 30, this.maxHeight / 2 + 10, true);
    this.addControlButton("🖱️", 63, this.maxHeight / 2 + 10, true);
    this.addControlButton("🎮", 96, this.maxHeight / 2 + 10, true);
    text = "Player 2";
    const player2Width = ctx.measureText(text).width;
    ctx.fillStyle = "black";
    ctx.fillText(text, this.maxWidth - player2Width - 30, this.maxHeight / 2 - 30);
    this.addControlButton("⌨️‎", this.maxWidth - player2Width - 30, this.maxHeight / 2 + 10, false);
    this.addControlButton("🖱️‎", this.maxWidth - player2Width + 3, this.maxHeight / 2 + 10, false);
    this.addControlButton("🎮‎", this.maxWidth - player2Width + 36, this.maxHeight / 2 + 10, false);

    ctx.font = "Bold 16px -apple-system, system-ui, BlinkMacSystemFont, Segoe UI, Roboto, Ubuntu";

    text = "Confirm";
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

  addControlButton(text, x, y, isPlayer1) {
    this.ctx.fillStyle = "black";
    this.ctx.fillText(text, x, y);
    const measuredWidth = this.ctx.measureText(text).width;
    const path = new Path2D();
    path.rect(x - 5, y - this.controllerFontSize, measuredWidth + 10, this.controllerFontSize + 5);
    path.closePath();
    this.ctx.fillStyle = "#FFFFFF00";
    this.ctx.fill(path);
    this.ctx.lineWidth = 2;
    if (text === this.getPlayer1Control() || text === this.getPlayer2Control()) {
      this.ctx.strokeStyle = "green";
    } else {
      this.ctx.strokeStyle = "#00000000";
    }

    this.ctx.stroke(path);
    this.controllers.push({ path: path, control: text, isPlayer1: isPlayer1 });
  }

  dispose() {
    this.unsubscribeToInputEvents();
  }

  subscribeToInputEvents() {
    this.onClick = this.clickedHandler.bind(this);
    document.addEventListener("click", this.onClick);
    this.onMouseMove = this.moveHandler.bind(this);
    document.addEventListener("mousemove", this.onMouseMove);
  }

  unsubscribeToInputEvents() {
    document.removeEventListener("click", this.onClick);
    document.removeEventListener("mousemove", this.onMouseMove);
  }

  clickedHandler(e) {
    e.preventDefault();
    const XY = this.getXY(e);
    if (this.ctx.isPointInPath(this.startGamePath, XY.x, XY.y)) {
      this.localCoop = true;
      this.canvas.style.cursor = "default";
      return;
    }

    this.controllers.forEach(control => {
      if (this.ctx.isPointInPath(control.path, XY.x, XY.y)) {
        // Invisible space FTW
        const player2Marker = "‎";
        if (control.control.includes(player2Marker)) {
          this.setPlayer2Control(control.control);
        } else {
          this.setPlayer1Control(control.control);
        }

        return;
      }
    });
  }

  moveHandler(e) {
    e.preventDefault();
    const XY = this.getXY(e);
    if (this.ctx.isPointInPath(this.startGamePath, XY.x, XY.y) || this.controllers.some((p) => this.ctx.isPointInPath(p.path, XY.x, XY.y))) {
      this.canvas.style.cursor = "pointer";
    } else {
      this.canvas.style.cursor = "default";
    }
  }

  getPlayer1Control() {
    return localStorage.getItem("Player1Control") ?? "⌨️";
  }

  getPlayer2Control() {
    return localStorage.getItem("Player2Control") ?? "🖱️‎";
  }

  setPlayer1Control(control) {
    localStorage.setItem("Player1Control", control);
  }

  setPlayer2Control(control) {
    localStorage.setItem("Player2Control", control);
  }
}