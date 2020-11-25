export class NimbusController {
    constructor(numberOfButtons) {
        const DefaultRightButton = 10;
        if (numberOfButtons > DefaultRightButton) {
            this.left = [8];
            this.right = [DefaultRightButton];
            this.supportButtons = true;
        } else {
            this.supportButtons = false;
        }
    }

    static get id() {
        return "nimbus";
    }

    get name() {
        return "Nimbus controller";
    }
}
