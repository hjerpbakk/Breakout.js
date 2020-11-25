export class Scene {
    // Implementation required
    update() {
        throw new Error('The method update must be implemented');
    }

    // Implementation required
    draw(/** @type {WebGLRenderingContext} */ ctx) {
        throw new Error('The method draw must be implemented');
    }

    // Implementation required
    dispose() {
        throw new Error('The method dispose must be implemented');
    }

    getXY(e) {
        const rect = this.canvas.getBoundingClientRect()
        const y = (e.clientY - rect.top) * this.dpr;
        const x = (e.clientX - rect.left) * this.dpr;
        return { x: x, y: y };
    }
}