import { Drawable } from "./drawable.js";

export class Player extends Drawable {
    constructor(maxWidth, paddle) {
        super();
        this.maxWidth = maxWidth;
        this.paddle = paddle;
        this.score = 0;
        this.lives = 3;
        this.highScoreKey = "HighScore";
        this.highScore = Number(localStorage.getItem(this.highScoreKey));
    }

    draw(/** @type {WebGLRenderingContext} */ ctx) {
        ctx.font = "Bold 16px -apple-system, system-ui, BlinkMacSystemFont, Segoe UI, Roboto, Ubuntu";
        ctx.fillStyle = "black";
        ctx.fillText("🏆 " + this.highScore, 8, 20);
        const livesText = "❤️".repeat(this.lives); 
        let w = ctx.measureText(livesText).width;
        ctx.fillText(livesText, this.maxWidth - 6 - w, 20);

        ctx.font = "Bold 28px -apple-system, system-ui, BlinkMacSystemFont, Segoe UI, Roboto, Ubuntu";
        ctx.fillStyle = "black";
        w = ctx.measureText(this.score).width;
        ctx.fillText(this.score, this.maxWidth / 2 - w / 2, 26);
    }

    increaseScore() {
        this.score++;
        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem(this.highScoreKey, this.highScore);
        }
    }
}