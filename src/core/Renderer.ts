import type { Scene } from "../scene/Scene";
import type { ResolutionSystem } from "../utils/ResolutionSystem";

export class Renderer {
  private device: GPUDevice;
  private context: GPUCanvasContext;

  private scene!: Scene;
  private resolutionSystem!: ResolutionSystem;

  constructor(
    device: GPUDevice,
    context: GPUCanvasContext,
    _canvas: HTMLCanvasElement,
    scene: Scene,
    resolutionSystem: ResolutionSystem
  ) {
    this.device = device;
    this.context = context;
    this.scene = scene;
    this.resolutionSystem = resolutionSystem;
  }

  async init() {}

  update() {
    // 2Dでは特に更新処理は不要
  }

  onResize(_w: number, _h: number) {
    this.resolutionSystem.resize(_w, _h);
  }

  render() {
    const encoder = this.device.createCommandEncoder();
    const pass = encoder.beginRenderPass({
      colorAttachments: [
        {
          view: this.context.getCurrentTexture().createView(),
          clearValue: { r: 0.05, g: 0.07, b: 0.1, a: 1.0 },
          loadOp: "clear",
          storeOp: "store",
        },
      ],
    });
    this.scene.draw(pass);
    pass.end();
    this.device.queue.submit([encoder.finish()]);
  }
}
