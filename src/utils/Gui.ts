import GUI from "lil-gui";
import  { Uniforms } from "./Uniforms";

export class Gui {
  private gui!: GUI;
  private uniforms!: Uniforms;

  constructor(uniforms: Uniforms) {
    this.gui = new GUI({ title: "Controls " });
    this.uniforms = uniforms;
    this.init();
  }

  init() {
    this.gui
      .add(this.uniforms, "gridCount", 3, 100, 1)
      .name("Divisions")
      .onChange((n: number) => {
        this.uniforms.updateGridCount(n);
      });

      this.gui
      .addColor(this.uniforms, "color1", 255) 
      .name("Color 1")
      .onChange((color: { r: number, g: number, b: number ,a: number}) => {
        this.uniforms.updateColor1(color);
      });
      
      this.gui
      .addColor(this.uniforms, "color2", 255)
      .name("Color 2")
      .onChange((color: { r: number, g: number, b: number ,a: number}) => {
        this.uniforms.updateColor2(color);
      });
      
      this.gui
      .addColor(this.uniforms, "color3", 255)
      .name("Color 3")
      .onChange((color: { r: number, g: number, b: number ,a: number}) => {
        this.uniforms.updateColor3(color);
      });

      this.gui
      .add(this.uniforms, "moveStrength", 0.0, 1.0, 0.01)
      .name("Move Strength")
      .onChange((n: number) => {
        this.uniforms.updateMoveStrength(n);
      });

  }

  dispose() {
    this.gui.destroy();
  }
}
