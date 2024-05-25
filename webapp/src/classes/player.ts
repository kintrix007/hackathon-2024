export class Player {
  sprite: HTMLImageElement
  level: number

  constructor() {
    this.sprite = document.createElement("img");
    this.sprite.src = "/assets/player.png";
    this.level = 1;
  }
}
