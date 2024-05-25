import { Player } from "./player"

export class ShoppingScene {
    availableItems: Array<Item>;
    player: Player;
    shopbackground: HTMLImageElement;
    shopUIoverlay: HTMLImageElement;

    constructor(player: Player) {
        this.availableItems = ShoppingScene.generateShopItems(player.level);
        this.player = player

        this.shopbackground = document.createElement("img");
        this.shopbackground.src = "/assets/shop_background.png";

        this.shopUIoverlay = document.createElement("img");
        this.shopUIoverlay.src = "/assets/shop_overlay.png";
    }
  
    static generateShopItems(playerLevel: number) {
      // Some fancy algorithm for creating items...
        return [];
    }
  
    playerBuysItemFromShop(player: Player, item: Item) {
      // This function will react to a player selecting an item, and moves it to their inventory.
        this.availableItems = this.availableItems.filter(i => i !== item);
        player.getItem(item);
        player.getMoney(-item.getItemCost());
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(this.shopbackground, 0, 0, ctx.canvas.width, ctx.canvas.height)        
        ctx.drawImage(this.shopUIoverlay, 0, 0, ctx.canvas.width, ctx.canvas.height)
        ctx.drawImage(this.player.sprite, 110, 350, 384, 384)

        



    }


  }
  
  