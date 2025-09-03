export class TimeStep {
  private device: GPUDevice;
  private buffer: GPUBuffer;
  public gridCount!: number;

  constructor(device: GPUDevice) {
    this.device = device;
    this.gridCount = 5;
    this.buffer = device.createBuffer({
      size: 16,
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    });
  }

  set(value: number) {
    this.device.queue.writeBuffer(
      this.buffer,
      0,
      new Float32Array([value, this.gridCount, 0, 0])
    );
  }

  updateGridCount(count: number) {
    this.gridCount = count;
    this.device.queue.writeBuffer(
      this.buffer,
      0,
      new Float32Array([this.gridCount, this.gridCount, 0, 0])
    );
  }

  getBuffer() {
    return this.buffer;
  }
}
