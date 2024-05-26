import { GameState, Scene } from "./sceneManager";

export class DefeatScene implements Scene {
    state: GameState;
    fightingBackground: HTMLImageElement;
    playerDeadSprite: HTMLImageElement;
    clippySprite: HTMLImageElement;

    constructor(state: GameState) {
        this.state = state;
        
        this.fightingBackground = document.createElement("img");
        this.fightingBackground.src = "/assets/battle_background.png";

        this.playerDeadSprite = document.createElement("img");
        this.playerDeadSprite.src = "/assets/dead_player.png";


        this.clippySprite = document.createElement("img");
        this.clippySprite.src = "/assets/angry_clippy.png";
    }

    enter() {

    }
    
    exit() {

    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        ctx.drawImage(this.fightingBackground, 0, 0, ctx.canvas.width, ctx.canvas.height)        
        ctx.drawImage(this.playerDeadSprite, 180, 400, 384, 384);
        ctx.drawImage(this.clippySprite, 820, 380, 450, 450);

        

        ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
        ctx.fillRect(225, 20, 1000, 450)

        ctx.beginPath()
        ctx.strokeStyle = "#FFFFFF"
        ctx.fillStyle = "#FFFFFF"
        ctx.fillRect(180, 800, 384, 40)

        ctx.fillStyle = "rgba(0, 0, 0, 1)";
        ctx.strokeStyle = "#FFFFFF"
        ctx.fillRect(190, 805, 364, 30)
        ctx.fillStyle = "rgba(0, 200, 0, 1)";

        ctx.fillStyle = "white";
        ctx.strokeStyle = "#FFFFFF"
        ctx.font = "32px Verdana";
        ctx.textAlign = "center";
        ctx.fillText('Holy shit, Clippy won. That is so based.', 720, 200)
        ctx.fillText('Well, back to programming with you.', 720, 250)
        ctx.fillText('I hope you are more skilled in Java :)', 720, 300)
        ctx.stroke()
    }
}