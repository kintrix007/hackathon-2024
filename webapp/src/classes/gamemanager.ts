import { Player } from "./player"
import { SceneManager, GameState } from "./sceneManager"
import { FightingScene } from "./fightingScene"
import { ShoppingScene } from "./shoppingscene";
import { TitleScene } from "./titlescene"
import { VictoryScene } from "./victoryscene";
import { DefeatScene } from "./defeatscene";

const canvas = document.getElementById("canvas")! as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

let sceneManager: SceneManager;

export function onKeydown(event: KeyboardEvent) {

}

export function initialize(score: number) {
    let player = new Player();
    player.money += score;
    player.save();
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
