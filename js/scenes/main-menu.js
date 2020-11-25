import { Scene } from "./scene.js";
import { writeHelp } from "../ui/helpUI.js";

export class MainMenu extends Scene {
  constructor(canvas, maxWidth, maxHeight, dpr) {
    super();
    this.canvas = canvas;
    this.maxWidth = maxWidth;
    this.maxHeight = maxHeight;
    this.dpr = dpr;
    this.subscribeToInputEvents();
    this.singlePlayer = false;
    this.localCoop = false;
    this.settings = false;
    writeHelp("Choose your game mode");
    this.canvas.style.cursor = "default";
  }

  update() {

  }

  draw(/** @type {WebGLRenderingContext} */ ctx) {
    this.ctx = ctx;

    const menuSpacing = 42;

    ctx.font = "Bold 32px -apple-system, system-ui, BlinkMacSystemFont, Segoe UI, Roboto, Ubuntu";
    ctx.fillStyle = "black";
    let text = "Breakout";
    const titleWidth = ctx.measureText(text).width;
    ctx.fillText(text, this.maxWidth / 2 - titleWidth / 2, this.maxHeight / 2 - 90);

    ctx.font = "Bold 16px -apple-system, system-ui, BlinkMacSystemFont, Segoe UI, Roboto, Ubuntu";

    text = "Single Player";
    this.buttonWidth = ctx.measureText(text).width;
    this.singlePlayerPath = new Path2D();
    this.singlePlayerPath.rect(this.maxWidth / 2 - this.buttonWidth / 2 - 10, this.maxHeight / 2 - ((16 * this.dpr) / 2) - 5, this.buttonWidth + 20, 16 * this.dpr);
    this.singlePlayerPath.closePath();
    ctx.fillStyle = "#FFFFFF";
    ctx.fillStyle = "rgba(225,225,225,0.5)";
    ctx.fill(this.singlePlayerPath);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#000000";
    ctx.stroke(this.singlePlayerPath);
    ctx.fillStyle = "black";
    ctx.fillText(text, this.maxWidth / 2 - this.buttonWidth / 2, this.maxHeight / 2);

    
    text = "Local Co-op";
    const coopWidth = ctx.measureText(text).width;
    this.localCoopPath = new Path2D();
    this.localCoopPath.rect(this.maxWidth / 2 - this.buttonWidth / 2 - 10, (this.maxHeight / 2) + menuSpacing - ((16 * this.dpr) / 2) - 5, this.buttonWidth + 20, 16 * this.dpr);
    this.localCoopPath.closePath();
    ctx.fillStyle = "#FFFFFF";
    ctx.fillStyle = "rgba(225,225,225,0.5)";
    ctx.fill(this.localCoopPath);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#000000";
    ctx.stroke(this.localCoopPath);
    ctx.fillStyle = "black";
    ctx.fillText(text, this.maxWidth / 2 - coopWidth / 2, (this.maxHeight / 2) + menuSpacing);
    
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
    const XY = this.getXY(e);
    if (this.ctx.isPointInPath(this.singlePlayerPath, XY.x, XY.y)) {
      this.singlePlayer = true;
      this.canvas.style.cursor = "default";
    } else if (this.ctx.isPointInPath(this.localCoopPath, XY.x, XY.y)) {
      this.localCoop = true;
      this.canvas.style.cursor = "default";
    }
  }

  moveHandler(e) {
    const XY = this.getXY(e);
    if (this.ctx.isPointInPath(this.singlePlayerPath, XY.x, XY.y) ||
      this.ctx.isPointInPath(this.localCoopPath, XY.x, XY.y)) {
      this.canvas.style.cursor = "pointer";
    } else {
      this.canvas.style.cursor = "default";
    }
  }
}