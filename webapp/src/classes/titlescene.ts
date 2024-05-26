import { GameState, Scene } from "./sceneManager";
import { ShoppingScene } from "./shoppingscene";

export class TitleScene implements Scene {
    state: GameState

    constructor(state: GameState) {
      this.state = state;
    }

    generateSplashText() {
        //Routine for autogenerating the splashtext. Yet to be automated with AI?

        return ["There once was a Junior dev who caused too many merge conflicts...", "Clippy demanded he could help the dev clean his branch."]
    }

    enter() {
      const changeToShopping = () => {
        this.state.sceneManager.change_scene(new ShoppingScene(this.state));
      };

      setTimeout(changeToShopping, 1000 * 8);
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
        ctx.font = "40px Verdana";
        ctx.fillText(splashText[0] , ctx.canvas.width/2, ctx.canvas.height/2-50);

        ctx.fillText(splashText[1], ctx.canvas.width/2, ctx.canvas.height/2+50)
    }
}
