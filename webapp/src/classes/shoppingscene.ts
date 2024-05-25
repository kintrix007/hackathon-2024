export class ShoppingScene {
    availableItems: Array<Item>;
    player: Player;

    constructor(p: Player){
        let this.player = p;
        let this.availableItems = new Array();
    }

    playerBuysItemFromShop(player: Player, item: Item) {
        // This function will react to a player selecting an item, and moves it to their inventory.
        this.availableItems.remove(item);
        player.getItem(item);
        player.getMoney(-item.getItemCost());
    }

    generateShopItems(playerLevel: number) {
        // Some fancy algorithm for creating items...
          return [];
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = "Black"
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    }



}