import { GameState, Scene } from "./sceneManager";
import { FightingScene } from "./fightingScene";

export class TitleScene implements Scene {
    state: GameState

    constructor(state: GameState) {
      this.state = state;
    }

    generateSplashText() {
        //Routine for autogenerating the splashtext.

        return ["The princess is in another castle.", "Our young developer quests on..."]
    }

    enter() {
      this.state.sceneManager.change_scene(new FightingScene(this.state));
    }

    exit() {

    }

    draw(ctx: CanvasRenderingContext2D) {
        let splashText = this.generateSplashText()

        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        
        ctx.strokeStyle = '#FFFFFF';
        ctx.fillStyle = "#FFFFFF";
        ctx.textAlign = "center";
        ctx.font = "78px Verdana";
        ctx.fillText(splashText[0] , ctx.canvas.width/2, ctx.canvas.height/2-50);
        ctx.fillText(splashText[1], ctx.canvas.width/2, ctx.canvas.height/2+50)

    }
}
