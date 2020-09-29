import { InGame } from './scenes/in-game.js';
import { GameOver } from './scenes/game-over.js';
import { Victory } from './scenes/victory.js';
import { MainMenu } from './scenes/main-menu.js';
import { Settings } from './scenes/settings.js';

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
                } else if (this.currentScene.remainingBricks === 0) {
                    this.level++;
                    this.createNewGame(this.currentScene.player.score, this.currentScene.player.lives);
                }

                break;
            case GameOver:
            case Victory:
                this.createMainMenu();
                break;
            case MainMenu:
                if (this.currentScene.singlePlayer) {
                    this.level = 0
                    this.createNewGame(0, 3);
                } else if (this.currentScene.localCoop) {
                    this.level = 0
                    this.createNewGame(0, 1);
                } else if (this.currentScene.settings) {
                    this.changeScene(new Settings(this.canvas, this.maxWidth, this.maxHeight, this.dpr, this.currentScene.buttonWidth));
                }

                break;
            case Settings:
                if (this.currentScene.returnToMainMenu) {
                    this.createMainMenu();
                }

                break;
        }

        return this.currentScene;
    }

    changeScene(newScene) {
        this.currentScene.dispose();
        this.currentScene = newScene;
    }

    createNewGame(startScore, startLives) {
        this.changeScene(new InGame(this.canvas, this.maxWidth, this.maxHeight, this.level, startScore, startLives));
    }

    createMainMenu() {
        this.changeScene(new MainMenu(this.canvas, this.maxWidth, this.maxHeight, this.dpr));
    }
}