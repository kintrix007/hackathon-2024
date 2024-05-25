import { Player } from "./player"
import { TitleScene } from "./titlescene"
import { FightingScene } from "./fightingScene"
import { ShoppingScene } from "./shoppingscene"

const canvas = document.getElementById("canvas")! as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

ctx.fillStyle = "green";

let gameState = 2;

let titleScene: TitleScene;
let shoppingScene: ShoppingScene;
let fightingScene: FightingScene;


export function onKeydown() {

}

export function initialize() {
    let player = new Player();

    titleScene = new TitleScene();
    shoppingScene = new ShoppingScene();
    fightingScene = new FightingScene(player);            
}

//Updates the game one frame at a time.
export function update() {
    switch (gameState) {
        case 0:
            //Titlescreen phase.
            titleScene.draw(ctx);
            break;
        
        case 1:
            //Shoppingscene phase.
            shoppingScene.draw(ctx)
            break;
        case 2:
            fightingScene.draw(ctx)
            break;
        case 3:
            //finalScene.draw(ctx)
        default:
            break;
    }






}









