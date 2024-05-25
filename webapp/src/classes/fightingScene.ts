import { Enemy } from "./enemy";
import { GameState, Scene } from "./sceneManager";

export class FightingScene implements Scene {
  state: GameState;

  constructor(state: GameState) {
    this.state = state;
  }

  combatCycle(enemy: Enemy) {
    let playerAction = this.state.player.doAction();
    enemy.ActionEffect(playerAction);

    if (enemy.healthPoints == 0) {
      //TODO: get rewards, victory screen, next enemy...
    }

    let enemyAction = enemy.doAction();
    this.state.player.ActionEffect(enemyAction);

    if (this.state.player.healthPoints == 0) {
      //TODO: death screen, maybe small penalty or smthn?
    }
    
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
