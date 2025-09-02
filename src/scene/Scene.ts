import type { FullScreenPlane } from "../gfx/FullScreenPlane";

export class Scene {
  private fullscreenPlane!: FullScreenPlane;

  constructor(fullscreenPlane: FullScreenPlane) {
    this.fullscreenPlane = fullscreenPlane;
  }

  draw(pass: GPURenderPassEncoder) {
    this.fullscreenPlane.draw(pass);
  }
}
