import { Player } from "./player";

export interface GameState {
  player: Player;
  sceneManager: SceneManager;
}


export interface Scene {
  enter(overlay: HTMLElement): void;
  exit(overlay: HTMLElement): void;
  draw(ctx: CanvasRenderingContext2D): void;
}

export class SceneManager {
  current: Scene | null;

  constructor() {
    this.current = null;
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.current?.draw(ctx);
  }

  change_scene(scene: Scene) {
    const overlay = this.getOverlay();
    this.current?.exit(overlay);
    this.current = scene;
    this.current.enter(overlay);
  }

  getOverlay() {
    return document.getElementById("overlay")!;
  }
}
