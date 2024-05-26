import { Item } from "./item";

export class Player {
    public maxHealthPoints: number = 100;
    public healthPoints: number = 100;
    public armorPoints: number = 20;
    public money: number = 250;
    public actionPoints: number = 5;

    public incomingDMGBoost: number = 1;

    public playerWeapon: Item = new Item("sword");
    public playerShield: Item = new Item("shield");
    
    public consumables: Array<Item> = new Array();

    sprite: HTMLImageElement;
    level: number;

    constructor() {
        this.sprite = document.createElement("img");
        this.sprite.src = "/assets/player.png";
        this.level = 1;
      }

    public useItem(item: Item): void {
        if (item.isConsumable()) {
            this.consumables.splice(this.consumables.indexOf(item), 1)
        }
    }

    public addItem(item: Item): void {
        switch (item.getItemType()) {
            case "weapon":
                this.playerWeapon = item;
                break;
            case "shield":
                this.playerShield = item;
                break;
            case "consumable":
                this.consumables.push(item);
                break;
        }
    }

    public getMoney(moneyGet: number): void {
        this.money = Math.max(0, this.money + moneyGet);
    }
    
    public doAction(): Item {
        let chosenAction: Item;

        while (true) {
            //TODO: implement action choice
            chosenAction = this.playerWeapon;
            
            if (chosenAction.actionPointCost <= this.actionPoints) {
                this.useItem(chosenAction);
                break;
            } else {
                //TODO: Text Splash for too few AP
            }
        }

        this.healthPoints += chosenAction.healAmount;
        this.actionPoints += chosenAction.actionPointGain;
        this.actionPoints -= chosenAction.actionPointCost;
        return chosenAction;
    }

    public getActions(): Array<Item> {
        let actions = this.consumables;
        return actions.concat(this.playerWeapon, this.playerShield);
    }

    public ActionEffect(effectItem: Item): void {
        let armorDamage = Math.floor(effectItem.baseDamage * this.incomingDMGBoost);
        let overflowDamage = 0;

        if (this.armorPoints - armorDamage < 0) {
            this.armorPoints = 0
            overflowDamage = this.armorPoints - armorDamage;
        } else {
            this.armorPoints -= armorDamage; 
        }

        this.healthPoints = Math.min(0, this.healthPoints + overflowDamage - this.incomingDMGBoost * effectItem.armorBypassDamage)

        this.actionPoints -= effectItem.actionPointDamage; 

        this.incomingDMGBoost = effectItem.incomingDamageBoost
    }
}
