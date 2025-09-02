export class ResolutionSystem {
  private device: GPUDevice;
  private resolutionBuffer!: GPUBuffer;
  private resolution = { width: 0, height: 0 };

  constructor(device: GPUDevice) {
    this.device = device;
    this.init();
  }

  private init() {
    this.resolution.width = window.innerWidth;
    this.resolution.height = window.innerHeight;

    this.resolutionBuffer = this.device.createBuffer({
      size: 8,
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    });

    this.update();
  }

  resize(width: number, height: number) {
    this.resolution.width = width;
    this.resolution.height = height;
    this.update();
  }

  update() {
    this.device.queue.writeBuffer(
      this.resolutionBuffer,
      0,
      new Float32Array([this.resolution.width, this.resolution.height])
    );
  }

  getBuffer() {
    return this.resolutionBuffer;
  }
}
