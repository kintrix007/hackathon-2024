class ShoppingScene {
    public availableItems: Item[];
    public player: Player;

    constructor(p: Player){
        this.player = p;
        this.availableItems = new Array();
    }

    public playerBuysItemFromShop(player: Player, item: Item): void {
        // This function will react to a player selecting an item, and moves it to their inventory.
        this.availableItems.remove(item);
        player.getItem(item);
        player.getMoney(-item.getItemCost());
    }




}