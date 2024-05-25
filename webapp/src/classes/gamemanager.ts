import { Player } from "./player"
import { TitleScene } from "./titlescene"
import { FightingScene } from "./fightingScene"
import { SceneManager, GameState } from "./sceneManager"
import { ShoppingScene } from "./shoppingscene";

const canvas = document.getElementById("canvas")! as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

let sceneManager: SceneManager;

export function onKeydown() {

}

export function initialize() {
    let player = new Player();
    sceneManager = new SceneManager();

    let gameState: GameState = {
      player,
      sceneManager,
    };

    sceneManager.change_scene(new ShoppingScene(gameState));
}

// Updates the game one frame at a time.
export function update(timestamp: DOMHighResTimeStamp) {
    sceneManager.draw(ctx);
}
