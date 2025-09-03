import GUI from "lil-gui";
import { SitePositions } from "../gfx/SitePositions";

export class Gui {
  private gui!: GUI;
  private sitePositions!: SitePositions;

  constructor(sitePositions: SitePositions) {
    this.gui = new GUI({ title: "Controls for SitePositions" });
    this.sitePositions = sitePositions;
    this.init();
  }

  init() {
    this.gui
      .add(this.sitePositions, "positionCount", 10, 500, 1)
      .name("Site Positions")
      .onChange((n: number) => {
        this.sitePositions.updatePositions(n);
      });
  }

  dispose() {
    this.gui.destroy();
  }
}
