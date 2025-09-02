import { createFullscreenQuad } from "./createFullscreenQuad";
import fullscreenShader from "../shaders/fullscreen.wgsl";
import type { ResolutionSystem } from "../utils/ResolutionSystem";

export class FullScreenPlane {
  private device: GPUDevice;
  private format: GPUTextureFormat;
  private pipeline!: GPURenderPipeline;
  private bindGroup!: GPUBindGroup;

  private vertexBuffer!: GPUBuffer;
  private indexBuffer!: GPUBuffer;
  private indexCount!: number;
  private resolutionSystem!: ResolutionSystem;

  constructor(
    device: GPUDevice,
    format: GPUTextureFormat,
    resolutionSystem: ResolutionSystem
  ) {
    this.device = device;
    this.format = format;
    this.resolutionSystem = resolutionSystem;
    this.init();
  }

  init() {
    const geo = createFullscreenQuad(this.device);
    this.vertexBuffer = geo.vertexBuffer;
    this.indexBuffer = geo.indexBuffer;
    this.indexCount = geo.indexCount;

    const module = this.device.createShaderModule({
      code: fullscreenShader,
    });

    this.pipeline = this.device.createRenderPipeline({
      layout: "auto",
      vertex: { module, entryPoint: "vs_main", buffers: [geo.layout] },
      fragment: {
        module,
        entryPoint: "fs_main",
        targets: [{ format: this.format }],
      },
      primitive: { topology: "triangle-list" },
    });

    this.bindGroup = this.device.createBindGroup({
      layout: this.pipeline.getBindGroupLayout(0),
      entries: [
        {
          binding: 0,
          resource: this.resolutionSystem.getBuffer(),
        },
      ],
    });
  }

  draw(pass: GPURenderPassEncoder) {
    pass.setPipeline(this.pipeline);
    pass.setBindGroup(0, this.bindGroup);
    pass.setVertexBuffer(0, this.vertexBuffer);
    pass.setIndexBuffer(this.indexBuffer, "uint16");
    pass.drawIndexed(this.indexCount);
  }
}
