import { Item } from "./item";

export interface PlayerData {
  money: number;
  level: number;
  weapon: string;
  shield: string;
  consumables: string[];
}

export function savePlayerData(newData: PlayerData) {
  localStorage.setItem("playerData", JSON.stringify(newData));
}

export function loadPlayerData(): PlayerData | null {
  const playerDataStr = localStorage.getItem("playerData");
  if (playerDataStr == null) return null;

  return JSON.parse(playerDataStr);
}


export class Player {
    public money: number;
    public level: number;
    public playerWeapon: Item = new Item("hammer");
    public playerShield: Item = new Item("firewall_shield");
    public consumables: Array<Item> = new Array();

    public maxHealthPoints: number = 600;
    public healthPoints: number = 600;
    public armorPoints: number = 99;
    public actionPoints: number = 5;

    public incomingDMGBoost: number = 1;

    sprite: HTMLImageElement;

    constructor() {
        this.sprite = document.createElement("img");
        this.sprite.src = "/assets/player.png";
        this.level = 1;
        this.money = 1500;
        this.playerWeapon = new Item("hammer");
        this.playerShield = new Item("firewall_shield");
        this.consumables = [];

        const data = loadPlayerData();
        if (data != null) {
            this.money = data.money;
            this.level = data.level;
            this.playerWeapon = new Item(data.weapon);
            this.playerShield = new Item(data.shield);
            this.consumables = data.consumables.map(id => new Item(id));
        }
    }

    public save() {
        const data = <PlayerData>{
            money: this.money,
            level: this.level,
            weapon: this.playerWeapon.itemID,
            shield: this.playerShield.itemID,
            consumables: this.consumables.map(x => x.itemID),
        };

        savePlayerData(data);
    }

    public useItem(item: Item): void {
        if (item.itemType === "consumable") {
            this.consumables = this.consumables.filter(listitem => listitem !== item);
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
    
    public doAction(item: Item): void {
        //Action was valid
        this.useItem(item)

        this.healthPoints += item.healAmount;
        //this.actionPoints += item.actionPointGain;
        this.actionPoints -= item.actionPointCost;
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

        this.healthPoints = Math.max(0, this.healthPoints + overflowDamage - this.incomingDMGBoost * effectItem.armorBypassDamage)

        this.actionPoints -= effectItem.actionPointDamage; 

        this.incomingDMGBoost = effectItem.incomingDamageBoost
    }
}
