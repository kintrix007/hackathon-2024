import { Player } from "./player";

export class FightingScene {
  public player;

  constructor(player: Player) {
    this.player = player;
  }

  combatCycle() {
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "black";
    ctx.fillRect(100, 100, 128, 128);

    const playerSprite = document.createElement("img");
    playerSprite.src = "/assets/player.png";
    ctx.drawImage(playerSprite, 100, 100, 128, 128);
  }
}   
