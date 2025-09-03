import GUI from "lil-gui";
import { SitePositions } from "../gfx/SitePositions";
import type { TimeStep } from "./TimeStep";

export class Gui {
  private gui!: GUI;
  private timeStep!: TimeStep;

  constructor(timeStep: TimeStep) {
    this.gui = new GUI({ title: "Controls " });
    this.timeStep = timeStep;
    this.init();
  }

  init() {
    this.gui
      .add(this.timeStep, "gridCount", 3, 100, 1)
      .name("Divisions")
      .onChange((n: number) => {
        this.timeStep.updateGridCount(n);
      });
  }

  dispose() {
    this.gui.destroy();
  }
}
