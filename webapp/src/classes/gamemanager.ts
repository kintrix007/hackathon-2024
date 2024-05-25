import { Player } from "./player"
import { SceneManager, GameState } from "./sceneManager"
import { FightingScene } from "./fightingScene"
import { ShoppingScene } from "./shoppingscene";
import { TitleScene } from "./titlescene"

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

    sceneManager.change_scene(new TitleScene(gameState));
}

// Updates the game one frame at a time.
export function update(timestamp: DOMHighResTimeStamp) {
    sceneManager.draw(ctx);
}
