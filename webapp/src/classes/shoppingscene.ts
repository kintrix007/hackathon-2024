import { Player } from "./player"
import { Item } from "./item";
import { GameState, Scene } from "./sceneManager";

export class ShoppingScene implements Scene {
    availableItems: Array<Item>;
    player: Player;
    shopbackground: HTMLImageElement;
    shopUIoverlay: HTMLImageElement;
    state: GameState;
    currentDescription: string | null;

    constructor(state: GameState) {
        this.state = state;
        this.player = state.player;
        this.availableItems = ShoppingScene.generateShopItems(this.player.level);

        this.shopbackground = document.createElement("img");
        this.shopbackground.src = "/assets/shop_background.png";

        this.shopUIoverlay = document.createElement("img");
        this.shopUIoverlay.src = "/assets/shop_overlay.png";
        this.currentDescription = null;
    }

    getItemButton(item: Item) {
      const button = document.createElement("button");
      button.appendChild(item.sprite);
      button.classList.add("item");
      const desc = `${item.cost}`;
      button.onpointerenter = () => this.showDescription(desc);
      button.onpointerleave = () => this.showDescription(null);
      return button;
    }

    showDescription(desc: string | null) {
      this.currentDescription = desc;
    }

    static purchase(player: Player, item: Item) {
      if (player.money < item.cost) return false;

      player.money -= item.cost;
      player.addItem(item);
      return true;
    }

    enter(overlay: HTMLElement) {
        const inventory = document.createElement("div");
        inventory.classList.add("inventory");

        const shop = document.createElement("div");
        const owned = document.createElement("div");

        shop.id = "shop";
        shop.classList.add("item-list")
        for (const item of this.availableItems) {
          const button = this.getItemButton(item);
          button.onclick = () => {
            if (ShoppingScene.purchase(this.state.player, item)) {
              this.availableItems = this.availableItems.filter(x => x != item);
              button.remove();
              owned.appendChild(this.getItemButton(item));
              this.showDescription(null);
            }
          }

          shop.appendChild(button);
        }

        owned.id = "owned";
        owned.classList.add("item-list")
        for (let i = 0; i < 1; i++) {
          const item = new Item(0);
          const button = this.getItemButton(item)
          owned.appendChild(button);
        }

        inventory.appendChild(shop);
        inventory.appendChild(owned);
        overlay.appendChild(inventory);
    }

    exit(overlay: HTMLElement) {
      overlay.innerHTML = "";
    }

    static generateShopItems(playerLevel: number) {
      // Some fancy algorithm for creating items...
      return Array.from({ length: 5 }).map(x => new Item(0));
    }

    playerBuysItemFromShop(player: Player, item: Item) {
        // This function will react to a player selecting an item, and moves it to their inventory.
        this.availableItems.push(item);
        player.addItem(item);
        player.getMoney(-item.getItemCost());
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(this.shopbackground, 0, 0, ctx.canvas.width, ctx.canvas.height)        
        ctx.drawImage(this.shopUIoverlay, 0, 0, ctx.canvas.width, ctx.canvas.height)
        ctx.drawImage(this.player.sprite, 110, 350, 384, 384)

        if (this.currentDescription) {
          ctx.fillText(this.currentDescription, 750, 150);
        }
    }
}
