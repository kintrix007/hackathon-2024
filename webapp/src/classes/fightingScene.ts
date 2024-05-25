import { GameState, Scene } from "./sceneManager";

export class FightingScene implements Scene {
  state: GameState;

  constructor(state: GameState) {
    this.state = state;
  }

  combatCycle() {
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "black";
    ctx.fillRect(100, 100, 128, 128);
    ctx.drawImage(this.state.player.sprite, 100, 100, 128, 128);
  }

  enter(overlay: HTMLElement) {
    overlay.innerHTML = `
      <button>Attack</button>
      <button>Defend</button>
      <button>Use Item</button>
    `;
  }

  exit(overlay: HTMLElement) {
    overlay.innerHTML = "";
  }
}   
