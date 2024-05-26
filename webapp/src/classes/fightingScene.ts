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

  combatCycle(item: Item) {
    if (this.state.player.actionPoints >= item.actionPointCost) {
      this.enemy.ActionEffect(item);
      
      if (this.enemy.healthPoints == 0) {
        //TODO: get rewards, victory screen, next enemy...
      
      }
    }
    
    //When player has no AP: end turn
    if (this.state.player.actionPoints == 0) {
      while (this.enemy.actionPoints > 0) {
        let enemyAction = this.enemy.doAction();
        this.state.player.ActionEffect(enemyAction);

        if (this.state.player.healthPoints == 0) {
          //TODO: death screen, maybe small penalty or smthn?
        }
      }
    }

  }

  itemClicked(item: Item) {
    // TODO: When an item is clicked, this gets called
    // alert(`Clicked item '${item.itemID}'`);
    
    this.combatCycle(item) 
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

    let maxArmorPoints = 100;
    //Healthbar & Armor-bar drawing!!
    ctx.beginPath()
    ctx.strokeStyle = "#FFFFFF"
    ctx.fillStyle = "#FFFFFF"
    ctx.fillRect(180, 800, 384, 40)

    ctx.fillStyle = "rgba(0, 0, 0, 1)";
    ctx.strokeStyle = "#FFFFFF"
    ctx.fillRect(190, 805, 364, 30)
    ctx.fillStyle = "rgba(0, 200, 0, 1)";
    //healthbar
    ctx.fillRect(190, 805, 364 * (this.state.player.healthPoints/this.state.player.maxHealthPoints), 30)
    ctx.fillStyle = "rgba(255, 0, 255, 1)"
    //armorbar
    ctx.fillRect(190, 825, 364 * (this.state.player.armorPoints/maxArmorPoints), 10)
    ctx.stroke()
    ctx.fillStyle = "white";
    ctx.strokeStyle = "#FFFFFF"
    ctx.font = "20px Verdana";
    ctx.fillText(`Action Points: ${this.state.player.actionPoints}`, 200, 870)
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
    ctx.fillStyle = "rgba(255, 0, 255, 1)"
    //armorbar
    ctx.fillRect(870, 825, 364 * (this.enemy.armorPoints/maxArmorPoints), 10)


    ctx.stroke()
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

    //TODO Generate an enemy randomly. Or don't
    this.enemy = new Enemy;
    this.enemy.maxHealthPoints = 150;
    this.enemy.healthPoints = 20;
    this.enemy.armorPoints = 40;
  }

  exit(overlay: HTMLElement) {
    overlay.innerHTML = "";
  }
}   
