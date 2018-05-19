export function clamp(val, min, max) {
    return val < min ? min : val > max ? max : val;
}

function dist(x1, y1, x2, y2) {
    var dx = x1 - x2, dy = y1 - y2;
    return Math.sqrt(dx * dx + dy * dy);
}
function p2c(px, py, cx, cy, cr) {
    return dist(px, py, cx, cy) < cr;
}
export function r2c(rx1, ry1, rx2, ry2, cx, cy, cr) {
    return dist(clamp(cx, rx1, rx2), clamp(cy, ry1, ry2), cx, cy) < cr;
}
function p2r(px, py, rx1, ry1, rx2, ry2) {
    return px > rx1 && py > ry1 && px < rx2 && py < ry2;
}