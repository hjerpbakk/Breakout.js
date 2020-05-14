import { InGame } from './scenes/in-game.js';
import { GameOver } from './scenes/game-over.js';
import { Victory } from './scenes/victory.js';

export class SceneManager {
    constructor(canvas, maxWidth, maxHeight) {
        this.canvas = canvas;
        this.maxWidth = maxWidth;
        this.maxHeight = maxHeight;
        this.createNewGame();
    }

    getCurrentScene() {
        if (this.currentScene instanceof InGame) {
            if (!this.currentScene.player.lives) {
                this.currentScene = new GameOver();
            } else if (this.currentScene.player.score === this.currentScene.brickRowCount * this.currentScene.brickColumnCount) {
                this.currentScene = new Victory();
            }
        } else if (this.currentScene instanceof GameOver || this.currentScene instanceof Victory) {
            this.createNewGame();
        }

        return this.currentScene;
    }

    createNewGame() {
        this.currentScene = new InGame(this.canvas, this.maxWidth, this.maxHeight);
    }
}