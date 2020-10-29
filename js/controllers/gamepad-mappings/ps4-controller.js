export class PS4Controller {
    // Tested browsers:
    // Win:
    // macOS:
    // - Firefox
    constructor() {
        this.left = [14, 16];
        this.right = [15, 17];
    }

    static get id() {
        return "wireless controller";
    }

    get name() {
        return "PS4 controller";
    }

    get supportButtons() {
        return true;
    }
}