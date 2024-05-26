import { Player } from "./player"
import { Item } from "./item";
import { GameState, Scene } from "./sceneManager";
import { FightingScene } from "./fightingScene"

export class ShoppingScene implements Scene {
    availableItems: Array<Item>;
    player: Player;
    shopbackground: HTMLImageElement;
    shopUIoverlay: HTMLImageElement;
    state: GameState;
    currentDescription: string | null;
    battleButton: HTMLImageElement;

    constructor(state: GameState) {
        this.state = state;
        this.player = state.player;
        this.availableItems = ShoppingScene.generateShopItems(this.player.level);

        this.shopbackground = document.createElement("img");
        this.shopbackground.src = "/assets/shop_background.png";

        this.shopUIoverlay = document.createElement("img");
        this.shopUIoverlay.src = "/assets/shop_overlay.png";

        this.battleButton = document.createElement("img");
        this.battleButton.src = "/assets/shop_overlay_battle.png";
        this.currentDescription = null;
    }

    getItemButton(item: Item) {
      const button = document.createElement("button");
      button.appendChild(item.sprite);
      button.classList.add("item");
      const desc = `${item.itemID}[${item.itemType}]: $${item.cost}`;
      button.onpointerenter = () => this.showDescription(desc);
      button.onpointerleave = () => this.showDescription(null);
      return button;
    }

    showDescription(desc: string | null) {
      this.currentDescription = desc;
    }

    enter(overlay: HTMLElement) {
        const goToBattle = document.createElement("button");
        goToBattle.innerText = "Go to Battle";
        goToBattle.onclick = () => 
          this.state.sceneManager.change_scene(new FightingScene(this.state));

        const inventory = document.createElement("div");
        inventory.classList.add("inventory");

        const shop = document.createElement("div");
        const owned = document.createElement("div");

        const weapon = this.getItemButton(this.player.playerWeapon);
        const shield = this.getItemButton(this.player.playerShield);
        
        shop.id = "shop";
        shop.classList.add("item-list")
        for (const item of this.availableItems) {
          const button = this.getItemButton(item);
          button.onclick = () => {
            if (ShoppingScene.purchase(this.state.player, item)) {
              this.availableItems = this.availableItems.filter(x => x != item);
              button.remove();

              switch (item.itemType) {
                case "weapon":
                  weapon.replaceWith(this.getItemButton(item))
                  break;
                case "shield":
                  shield.replaceWith(this.getItemButton(item))
                  break;
                case "consumable":
                  owned.appendChild(this.getItemButton(item));
                  break;
              }
              this.showDescription(null);
            }
          }

          shop.appendChild(button);
        }

        owned.id = "owned";
        owned.classList.add("item-list")

        inventory.appendChild(shop);
        inventory.appendChild(owned);
        overlay.appendChild(inventory);
        overlay.appendChild(goToBattle);
        overlay.appendChild(weapon);
        overlay.appendChild(shield);
    }

    exit(overlay: HTMLElement) {
      overlay.innerHTML = "";
    }

    static generateShopItems(playerLevel: number) {
      const items = [];
      for (let i = 0; i < 5; i++) {
        const itemIds = [ "sword", "shield", "beer" ] as const;
        const idx = Math.floor(Math.random() * 3)
        items.push(new Item(itemIds[idx]!));
      }

      return items;
    }

    static purchase(player: Player, item: Item): boolean {
      if (player.money < item.cost) return false;
      if (player.consumables.length >= 4) return false;

      player.money -= item.cost;
      player.addItem(item);
      return true;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(this.shopbackground, 0, 0, ctx.canvas.width, ctx.canvas.height)        
        ctx.drawImage(this.shopUIoverlay, 0, 0, ctx.canvas.width, ctx.canvas.height)
        ctx.drawImage(this.player.sprite, 130, 350, 384, 384)
        ctx.drawImage(this.battleButton, 0, 0, ctx.canvas.width, ctx.canvas.height)
        
        ctx.strokeStyle = "#FFFFFF"
        ctx.fillStyle = "#FFFFFF"
        ctx.font = "40px Verdana"
        ctx.fillText(String(this.state.player.money), 180, 300)
        ctx.fillText(String(this.state.player.maxHealthPoints), 390, 300)
        
        
        if (this.currentDescription) {
          ctx.fillStyle = "black"
          ctx.fillRect(691, 75, 680, 75)

          ctx.fillStyle = "white";
          ctx.font = "64px Verdana";
          ctx.textAlign = "left";
          ctx.fillText(this.currentDescription, 710, 140);
        }


    }
}
