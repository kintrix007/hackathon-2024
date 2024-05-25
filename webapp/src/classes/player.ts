export class Player {
    public maxHealthPoints: number = 0;
    public healthPoints: number = 0;
    public armorPoints: number = 0;
    public money: number = 0;
    public actionPoints: number = 0;

    public playerWeapon: Item = new Item(0);
    public playerShield: Item = new Item(1);
    
    public consumables: Set<Item> = new Set();

    sprite: HTMLImageElement;
    level: number;

    constructor() {
        this.sprite = document.createElement("img");
        this.sprite.src = "/assets/player.png";
        this.level = 1;
      }

    public adjustHealth(healthGain: number): void {
        if (healthGain > 0) {
            this.healthPoints += healthGain;
        }
        else {
            let damageLeft: number = this.armorPoints + healthGain;
            this.armorPoints = Math.max(0, this.armorPoints + healthGain);
            this.healthPoints += Math.max(0, this.healthPoints + damageLeft);
        }

        // Player dying mechanics are handled in FightingScene loop!
    }

    public getArmor(armorGain: number): void {
        this.armorPoints = Math.max(0, this.armorPoints + armorGain);
    }

    public useItem(item: Item): void {
        if (item.getActionPointCost() > this.actionPoints) {
            //This should go to a messaging system later!!! Ask Boldi
            console.log("You do not have enough AP for this");
            return;
        }

        // If damage spell, just make player enact damage on enemy.
        item.applyEffectsToPlayer(this);

        if (item.isConsumable()) {
            this.consumables.delete(item);
        }
    }

    public getItem(item: Item): void {
        switch (item.getItemType()) {
            case 0:
                this.playerWeapon = item;
                break;
            case 1:
                this.playerShield = item;
                break;
            case 2:
                this.consumables.add(item);
                break;
            default:
                console.log("Invalid Item type (>2) retrieved");
        }
    }

    public getMoney(moneyGet: number): void {
        this.money = Math.max(0, this.money + moneyGet);
    }

}
