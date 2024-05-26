import { Item } from "./item";

export class Enemy {
    public maxHealthPoints: number = 300;
    public healthPoints: number = 300;
    public armorPoints: number = 50;
    public money: number = 0;
    public actionPoints: number = 4;

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

    public getItem(item: Item): void {
        switch (item.getItemType()) {
            case "weapon":
                this.playerWeapon = item;
                break;
            case "shield":
                this.playerShield = item;
                break;
            case "consumable":
                this.consumables.concat(item);
                break;
        }
    }

    public doAction(): Item {
        let chosenAction: Item;
        let actionList = this.consumables
        actionList.push(this.playerWeapon, this.playerShield)


        while (true) {
            //TODO: implement action choice
            let ind = Math.floor(Math.random() * actionList.length);
            chosenAction = actionList[ind];

            if (chosenAction.actionPointCost <= this.actionPoints) {
                this.useItem(chosenAction);
                break;
            } else {
                //TODO: Text Splash for too few AP
            }
        }

        this.healthPoints += chosenAction.healAmount;
        //this.actionPoints += chosenAction.actionPointGain;
        this.actionPoints -= chosenAction.actionPointCost;
        return chosenAction;
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

        this.healthPoints = Math.max(0, this.healthPoints + overflowDamage - this.incomingDMGBoost * effectItem.armorBypassDamage)

        this.actionPoints -= effectItem.actionPointDamage; 

        this.incomingDMGBoost = effectItem.incomingDamageBoost
    }
}
