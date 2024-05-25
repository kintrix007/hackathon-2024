import { Player } from "./player"

export class ShoppingScene {
    availableItems: Array<Item>;
    player: Player;

    constructor(player: Player) {
        this.availableItems = ShoppingScene.generateShopItems(player.level);
        this.player = player
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
        ctx.fillStyle = "Black"
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        
        ctx.drawImage(this.player.playerSprite)




    }


  }
  
  