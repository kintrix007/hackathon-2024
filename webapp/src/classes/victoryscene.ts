import { GameState, Scene } from "./sceneManager";

export class VictoryScene implements Scene {
    state: GameState;
    fightingBackground: HTMLImageElement;

    
    constructor(state: GameState) {
        this.state = state;
        
        this.fightingBackground = document.createElement("img");
        this.fightingBackground.src = "/assets/battle_background.png";
    }

    enter() {

    }
    
    exit() {

    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        ctx.drawImage(this.fightingBackground, 0, 0, ctx.canvas.width, ctx.canvas.height)        
    
        ctx.drawImage(this.state.player.sprite, 180, 400, 384, 384);

        ctx.beginPath()
        ctx.strokeStyle = "#FFFFFF"
        ctx.fillStyle = "#FFFFFF"
        ctx.fillRect(860, 800, 384, 40)

        ctx.fillStyle = "rgba(0, 0, 0, 1)";
        ctx.strokeStyle = "#FFFFFF"
        ctx.fillRect(870, 805, 364, 30)
        ctx.stroke()

        ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
        ctx.fillRect(225, 20, 1000, 450)

        ctx.fillStyle = "white";
        ctx.strokeStyle = "#FFFFFF"
        ctx.font = "32px Verdana";
        ctx.textAlign = "center";
        ctx.fillText('Clippy was defeated. Haha, get rekt Clippy.', 720, 200)
        ctx.fillText('Our developer goes on to push to production', 720, 250)
        ctx.fillText('many more fridays...', 720, 300)
        ctx.stroke()
    }
}