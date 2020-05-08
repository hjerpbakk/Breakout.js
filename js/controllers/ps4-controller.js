export class PS4Controller {
    constructor(numberOfButtons) {
        const defaultRightButton = 17;
        if (numberOfButtons > defaultRightButton) {
            this.left = 14;
            this.right = 15;
        } else {
            this.left = 16;
            this.right = 17;
        }
    }

    static get id() {
        return "Wireless Controller";
    }

    get name() {
        return "PS4 Controller";
    }

    get supportButtons() {
        return true;
    }
}