import itemData from "./items.json";

type ItemData = {
  [key: string]: (WeaponData | ShieldData | ConsumableData) & { "cost": number; }
};

interface WeaponData {
  type: "weapon";
  baseDamage: number;
  armorBypassDamage: number;
}

interface ShieldData {
  type: "shield";
}

interface ConsumableData {
  type: "consumable";
}

export class Item {
    public itemID: string;
    public itemType: "weapon" | "shield" | "consumable";

    public cost = 0;
    public actionPointCost = 1;
    public actionPointGain = 0;

    public baseDamage = 0;
    public armorBypassDamage = 0;
    //public armorPoints = 0;
    
    public actionPointDamage = 0;
    public healAmount = 0;
    public incomingDamageBoost = 1;
    public sprite: HTMLImageElement;

    constructor(itemID: string) {
        this.itemID = itemID;
        // This will be overridden when we load the data from the JSON
        this.itemType = "weapon";

        this.sprite = document.createElement("img");
        this.sprite.src = `/assets/${itemID}.png`;

        this.constructFromJson(itemID);
    }

    constructFromJson(itemID: string) {
      const data = (<ItemData>itemData)[itemID];
      if (data == null) return null;

      this.cost = data.cost;

      // TODO: Fill in the rest of the data.
      switch (data.type) {
        case "weapon":
          this.itemType = "weapon";
          this.baseDamage = data.baseDamage;
          this.armorBypassDamage = data.armorBypassDamage;
          break;
        case "shield":
          this.itemType = "shield";
          break;
        case "consumable":
          this.itemType = "consumable";
          break;
        default:
          alert(`Item '${itemID}' has invalid type.`);
      }
    }

    isWeapon() {
        return this.itemType === "weapon";
    }

    isShield() {
        return this.itemType === "shield";
    }

    isConsumable() {
        return this.itemType === "consumable";
    }

    getActionPointCost() {
        return this.actionPointCost;
    }

    getItemType() {
        return this.itemType;
    }

    getItemCost() {
        return this.cost;
    }
}
