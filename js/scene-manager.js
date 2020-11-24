import { SinglePlayerGame } from './scenes/single-player-game.js';
import { GameOver } from './scenes/game-over.js';
import { Victory } from './scenes/victory.js';
import { MainMenu } from './scenes/main-menu.js';
import { SinglePlayerSettings } from './scenes/single-player-settings.js';
import { MultiplayerSettings } from './scenes/multiplayer-settings.js';

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
            case SinglePlayerGame:
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
                    this.changeScene(new SinglePlayerSettings(this.canvas, this.maxWidth, this.maxHeight, this.dpr, this.currentScene.buttonWidth));
                } else if (this.currentScene.localCoop) {
                    this.changeScene(new MultiplayerSettings(this.canvas, this.maxWidth, this.maxHeight, this.dpr, this.currentScene.buttonWidth));
                }

                break;
            case SinglePlayerSettings:
                if (this.currentScene.singlePlayer) {
                    this.level = 0
                    this.createNewGame(0, 3);
                }
                
                break;
            case MultiplayerSettings:
                if (this.currentScene.localCoop) {
                    this.level = 0
                    this.createNewGame(0, 1);
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
        this.changeScene(new SinglePlayerGame(this.canvas, this.maxWidth, this.maxHeight, this.level, startScore, startLives, this.currentScene.control));
    }

    createMainMenu() {
        this.changeScene(new MainMenu(this.canvas, this.maxWidth, this.maxHeight, this.dpr));
    }
}