export class Item {
    public itemType = 0;
    public itemID = 0;
    public baseDamage = 0;
    public armorBypassDamage = 0;
    public actionPointDamage = 0;
    public healAmount = 0;
    public actionPointDelay = 0;
    public actionPointCost = 0;
    public attackDamageBoost = 0;
    public incomingDamageBoost = 0;
    public applyStatusEffect = 0;

    constructor(itemID: number) {
        //this.unpackDataFromTable(itemID);
        this.itemID = itemID;
        this.itemType = -1;
    }

    unpackDataFromTable(itemID: number) {
    // something to do with getDataFromTable...
        console.log(Item.getDataFromTable(itemID));
    }

    static getDataFromTable(itemID: number) {
    // A function for initializing the data in an Item.
        return [0, 0, 0];
    }


    isWeapon() {
        return this.itemType === 0;
    }

    isShield() {
        return this.itemType === 1;
    }

    isConsumable() {
        return this.itemType === 2;
    }

    getActionPointCost() {
        return this.actionPointCost;
    }

    applyEffectsToPlayer(player: Player) {
        //TODO: Make this
        return
    }
    

}