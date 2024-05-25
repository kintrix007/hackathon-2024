class Item {
  this.baseDamage = 0;



  constructor(itemID) {
    this.unpackDataFromTable(itemID);
  }

  unpackDataFromTable(itemID) {
    // something to do with getDataFromTable...
    console.log(this.getDataFromTable(itemID));
  }

  static getDataFromTable(itemID) {
    // A function for initializing the data in an Item.
    return [0, 0, 0];
  }

  get shieldValue() {
    return this.shieldValue;
  }

  get spellAttackDamage() {
    return this.spellAttackDamage;
  }

  get actionPointCost() {
    return this.actionPointCost;
  }

  get attackDamage() {
    return this.attackDamage;
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

  get itemType() {
    return this.itemType;
  }

  applyEffectsToPlayer(player) {
    // Implement this method
  }

  get itemCost() {
    return this.itemCost;
  }
}

