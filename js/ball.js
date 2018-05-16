export class Ball {
    constructor(x, y) {
        this.radius = 10;
        this.reset(x, y);
    }

    reset(x, y) {
        this.x = x;
        this.y = y;
        const speed = 4;
        this.dx = speed;
        this.dy = -speed;
    }

    update() {
        this.x += this.dx;
        this.y += this.dy;
    }

    draw(/** @type {WebGLRenderingContext} */ ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }
}