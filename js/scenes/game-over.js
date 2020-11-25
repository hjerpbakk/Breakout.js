import { Scene } from "./scene.js";
import { writeHelp } from "../ui/helpUI.js";

export class GameOver extends Scene {
  constructor(canvas, maxWidth, maxHeight, dpr, buttonWidth, player) {
    super();
    this.canvas = canvas;
    this.maxWidth = maxWidth;
    this.maxHeight = maxHeight;
    this.dpr = dpr;
    this.buttonWidth = buttonWidth;
    this.player = player;
    this.tryAgain = false;
    this.subscribeToInputEvents();
    writeHelp("Game Over 😭");
    this.canvas.style.cursor = "default";
  }

  update() {
  }

  draw(/** @type {WebGLRenderingContext} */ ctx) {
    this.ctx = ctx;

    ctx.font = "Bold 32px -apple-system, system-ui, BlinkMacSystemFont, Segoe UI, Roboto, Ubuntu";
    ctx.fillStyle = "black";
    let text = "☠️ Ouch! ☠️";
    const titleWidth = ctx.measureText(text).width;
    ctx.fillText(text, this.maxWidth / 2 - titleWidth / 2, this.maxHeight / 2 - 90);

    ctx.font = "Bold 24px -apple-system, system-ui, BlinkMacSystemFont, Segoe UI, Roboto, Ubuntu";
    ctx.fillStyle = "black";
    text = "Your Score";
    ctx.fillText(text, this.maxWidth / 2 - ctx.measureText(text).width / 2, this.maxHeight / 2 - 30);
    text = this.player.score;
    ctx.fillText(text, this.maxWidth / 2 - ctx.measureText(text).width / 2, this.maxHeight / 2);

    text = "High Score";
    ctx.fillText(text, this.maxWidth / 2 - ctx.measureText(text).width / 2, this.maxHeight / 2 + 30);
    text = this.player.highScore;
    ctx.fillText(text, this.maxWidth / 2 - ctx.measureText(text).width / 2, this.maxHeight / 2 + 60);

    ctx.font = "Bold 16px -apple-system, system-ui, BlinkMacSystemFont, Segoe UI, Roboto, Ubuntu";
    text = "Try again!";
    const menuSpacing = 42;
    const settingsWidth = ctx.measureText(text).width;
    this.tryAgainGamePath = new Path2D();
    this.tryAgainGamePath.rect(this.maxWidth / 2 - this.buttonWidth / 2 - 10, (this.maxHeight / 2) + menuSpacing * 3 - 16 - 5, this.buttonWidth + 20, 32);
    this.tryAgainGamePath.closePath();
    ctx.fillStyle = "#FFFFFF";
    ctx.fillStyle = "rgba(225,225,225,0.5)";
    ctx.fill(this.tryAgainGamePath);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#000000";
    ctx.stroke(this.tryAgainGamePath);
    ctx.fillStyle = "black";
    ctx.fillText(text, this.maxWidth / 2 - settingsWidth / 2, (this.maxHeight / 2) + menuSpacing * 3);
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
    if (this.ctx.isPointInPath(this.tryAgainGamePath, XY.x, XY.y)) {
      this.tryAgain = true;
      this.canvas.style.cursor = "default";
      return;
    }
  }

  moveHandler(e) {
    e.preventDefault();
    const XY = this.getXY(e);
    if (this.ctx.isPointInPath(this.tryAgainGamePath, XY.x, XY.y)) {
      this.canvas.style.cursor = "pointer";
    } else {
      this.canvas.style.cursor = "default";
    }
  }
}