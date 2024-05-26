import { Enemy } from "./enemy";
import { GameState, Scene } from "./sceneManager";
import { Item } from "./item";

export class FightingScene implements Scene {
  state: GameState;
  fightingBackground: HTMLImageElement;
  enemy: Enemy;

  constructor(state: GameState) {
    this.state = state;
    this.enemy = new Enemy;
    
    this.fightingBackground = document.createElement("img");
    this.fightingBackground.src = "/assets/battle_background.png";
  }

  combatCycle() {
    while (this.state.player.actionPoints > 0) {
      let playerAction = this.state.player.doAction();
      this.enemy.ActionEffect(playerAction);
      
      if (this.enemy.healthPoints == 0) {
        //TODO: get rewards, victory screen, next enemy...
      
      }
    }

    while (this.enemy.actionPoints > 0) {
      let enemyAction = this.enemy.doAction();
      this.state.player.ActionEffect(enemyAction);

      if (this.state.player.healthPoints == 0) {
        //TODO: death screen, maybe small penalty or smthn?
      }
    }
    
  }

  createEnemy() {
    //TODO Generate an enemy randomly. Or don't
    this.enemy = new Enemy();
    this.enemy.maxHealthPoints = 100;
    this.enemy.healthPoints = 100;
  }


  draw(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.drawImage(this.fightingBackground, 0, 0, ctx.canvas.width, ctx.canvas.height)        
    
    ctx.drawImage(this.state.player.sprite, 180, 400, 384, 384);

    //Healthbar drawing!!
    ctx.beginPath()
    ctx.strokeStyle = "#FFFFFF"
    ctx.fillStyle = "#FFFFFF"
    ctx.fillRect(180, 800, 384, 40)

    ctx.fillStyle = "rgba(0, 0, 0, 1)";
    ctx.strokeStyle = "#FFFFFF"
    ctx.fillRect(190, 805, 364, 30)
    ctx.fillStyle = "rgba(0, 255, 0, 1)";
    ctx.fillRect(190, 805, 364 * (this.state.player.healthPoints/this.state.player.maxHealthPoints), 30)
    ctx.stroke()

    //Healthbar for enemy! :)
    ctx.beginPath()
    ctx.strokeStyle = "#FFFFFF"
    ctx.fillStyle = "#FFFFFF"
    ctx.fillRect(860, 800, 384, 40)

    ctx.fillStyle = "rgba(0, 0, 0, 1)";
    ctx.strokeStyle = "#FFFFFF"
    ctx.fillRect(870, 805, 364, 30)
    ctx.fillStyle = "rgba(0, 255, 0, 1)";
    ctx.fillRect(870, 805, 364 * (this.enemy.healthPoints/this.state.player.maxHealthPoints), 30)
    ctx.stroke()



  }

  itemClicked(item: Item) {
    // TODO: When an item is clicked, this gets called
    alert(`Clicked item '${item.itemID}'`);
  }

  getItemButton(item: Item) {
    const button = document.createElement("button");
    button.appendChild(item.sprite);
    button.classList.add("item");
    button.onpointerenter = () => {};
    button.onpointerleave = () => {};
    return button;
  }

  enter(overlay: HTMLElement) {
    this.createEnemy();

    const items = document.createElement("div");

    for (const item of this.state.player.getActions()) {
      const button = this.getItemButton(item);
      button.onclick = () => this.itemClicked(item);
      items.appendChild(button);
    }

    overlay.appendChild(items);
  }

  exit(overlay: HTMLElement) {
    overlay.innerHTML = "";
  }
}   
