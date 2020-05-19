import { InGame } from './scenes/in-game.js';
import { GameOver } from './scenes/game-over.js';
import { Victory } from './scenes/victory.js';
import { MainMenu } from './scenes/main-menu.js';

export class SceneManager {
    constructor(canvas, maxWidth, maxHeight, dpr) {
        this.canvas = canvas;
        this.maxWidth = maxWidth;
        this.maxHeight = maxHeight;
        this.dpr = dpr;
        this.currentScene = new MainMenu(canvas, maxWidth, maxHeight, dpr);
    }

    getCurrentScene() {
        switch (this.currentScene.constructor) {
            case InGame:
                if (!this.currentScene.player.lives) {
                    this.changeScene(new GameOver());
                } else if (this.currentScene.player.score === this.currentScene.brickRowCount * this.currentScene.brickColumnCount) {
                    this.changeScene(new Victory());
                }

                break;
            case GameOver:
            case Victory:
                this.changeScene(new MainMenu(this.canvas, this.maxWidth, this.maxHeight, this.dpr));
                break;
            case MainMenu:
                if (this.currentScene.newGame) {
                    this.changeScene(new InGame(this.canvas, this.maxWidth, this.maxHeight));
                }

                break;
        }

        return this.currentScene;
    }

    changeScene(newScene) {
        this.currentScene.dispose();
        this.currentScene = newScene;
    }
}