import { Player } from "./player"
import { Item } from "./item";
import { GameState, Scene } from "./sceneManager";

export class ShoppingScene implements Scene {
    availableItems: Array<Item>;
    player: Player;
    shopbackground: HTMLImageElement;
    shopUIoverlay: HTMLImageElement;
    state: GameState;

    constructor(state: GameState) {
        this.state = state;
        this.player = state.player;
        this.availableItems = ShoppingScene.generateShopItems(this.player.level);

        this.shopbackground = document.createElement("img");
        this.shopbackground.src = "/assets/shop_background.png";

        this.shopUIoverlay = document.createElement("img");
        this.shopUIoverlay.src = "/assets/shop_overlay.png";
    }

    getItemButton(item: Item) {
      const button = document.createElement("button");
      button.appendChild(item.sprite);
      button.classList.add("item");
      return button;
    }

    enter(overlay: HTMLElement) {
        const inventory = document.createElement("div");
        inventory.classList.add("inventory");

        const shop = document.createElement("div");
        shop.classList.add("item-list")
        for (let i = 0; i < 10; i++) {
            const item = new Item();
            shop.appendChild(this.getItemButton(item));
        }

        const owned = document.createElement("div");
        owned.classList.add("item-list")
        for (let i = 0; i < 10; i++) {
            const item = new Item();
            owned.appendChild(this.getItemButton(item));
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
      return [];
    }

    playerBuysItemFromShop(player: Player, item: Item) {
        // This function will react to a player selecting an item, and moves it to their inventory.
        this.availableItems.push(item);
        player.getItem(item);
        player.getMoney(-item.getItemCost());
    }

    generateShopItems(playerLevel: number) {
        // Some fancy algorithm for creating items...
        return [];
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(this.shopbackground, 0, 0, ctx.canvas.width, ctx.canvas.height)        
        ctx.drawImage(this.shopUIoverlay, 0, 0, ctx.canvas.width, ctx.canvas.height)
        ctx.drawImage(this.player.sprite, 110, 350, 384, 384)
    }
}
