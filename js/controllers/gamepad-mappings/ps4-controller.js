export class PS4Controller {
    constructor(numberOfButtons) {
        const DefaultRightButton = 17;
        if (numberOfButtons > DefaultRightButton) {
            this.left = 16;
            this.right = DefaultRightButton;
        } else {
            this.left = 14;
            this.right = 15;
        }
    }

    static get id() {
        return "Wireless controller";
    }

    get name() {
        return "PS4 controller";
    }

    get supportButtons() {
        return true;
    }
}