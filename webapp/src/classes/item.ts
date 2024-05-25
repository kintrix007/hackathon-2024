class Item {
    public itemType = 0;
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
}

class Item {
    // 0: weapon, 1: shield, 2: consumable
    public itemType: number = 0;
    public itemCost: number = 0;
    public baseDamage: number = 0;
    public armorBypassDamage: number = 0;
    public actionPointDamage: number = 0;
    public healAmount: number = 0;
    public actionPointDelay: number = 0;
    public actionPointCost: number = 0;
    public attackDamageBoost: number = 0;
    public incomingDamageBoost: number = 0;
    public applyStatusEffect: number = 0;

    public int attackDamage;
    public int shieldValue;
    public int spellAttackDamage;
    public int actionPointCost;


    public int getShieldValue() {
        return shieldValue;
    }

    public int getSpellAttackDamage() {
        return spellAttackDamage;
    }

    public int getActionPointCost() {
        return actionPointCost;
    }

    public int getAttackDamage() {
        return attackDamage;
    }

    public Item(int itemID) {
        this.unpackDataFromTable(itemID);
    }

    public void unpackDataFromTable(int itemID) {
        //something to do with getDataFromTable...
        System.out.println(getDataFromTable(itemID));
    }

    public static List<Float> getDataFromTable(int itemID) {
        //A function for initializing the data in an Item.
        return List.of(0f, 0f, 0f);
    }

    public boolean isWeapon() {
        return (this.itemType == 0);
    }

    public boolean isShield() {
        return (this.itemType == 1);
    }

    public boolean isConsumable() {
        return (this.itemType == 2);
    }

    public int getItemType() {
        return this.itemType;
    }

    public void applyEffectsToPlayer(Player player) {

    }

    public int getItemCost() {
        return this.itemCost;
    }




}


