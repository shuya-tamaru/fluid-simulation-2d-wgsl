export class Uniforms {
  private device: GPUDevice;
  private buffer!: GPUBuffer;
  public gridCount!: number;
  public moveStrength!: number;
  public color1!: { r: number; g: number; b: number };
  public color2!: { r: number; g: number; b: number };
  public color3!: { r: number; g: number; b: number };

  constructor(device: GPUDevice) {
    this.device = device;

    this.color1 = { r: 230, g: 0, b: 18 }; //#E60012
    this.color2 = { r: 0, g: 104, b: 183 }; //#0068B7
    this.color3 = { r: 210, g: 215, b: 218 }; //#D2D7DA
    this.gridCount = 24;
    this.moveStrength = 0.2;

    this.init();
  }

  private init() {
    this.buffer = this.device.createBuffer({
      size: 16 * 4,
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    });

    this.device.queue.writeBuffer(
      this.buffer,
      0,
      new Float32Array([
        this.color1.r,
        this.color1.g,
        this.color1.b,
        1.0,
        this.color2.r,
        this.color2.g,
        this.color2.b,
        1.0,
        this.color3.r,
        this.color3.g,
        this.color3.b,
        1.0,
        this.gridCount,
        this.moveStrength,
        0,
        0,
      ])
    );
  }

  updateGridCount(count: number) {
    this.gridCount = count;
    this.device.queue.writeBuffer(
      this.buffer,
      0,
      new Float32Array([
        this.color1.r,
        this.color1.g,
        this.color1.b,
        1.0,
        this.color2.r,
        this.color2.g,
        this.color2.b,
        1.0,
        this.color3.r,
        this.color3.g,
        this.color3.b,
        1.0,
        this.gridCount,
        this.moveStrength,
        0,
        0,
      ])
    );
  }

  updateMoveStrength(strength: number) {
    this.moveStrength = strength;
    this.device.queue.writeBuffer(
      this.buffer,
      0,
      new Float32Array([
        this.color1.r,
        this.color1.g,
        this.color1.b,
        1.0,
        this.color2.r,
        this.color2.g,
        this.color2.b,
        1.0,
        this.color3.r,
        this.color3.g,
        this.color3.b,
        1.0,
        this.gridCount,
        this.moveStrength,
        0,
        0,
      ])
    );
  }

  updateColor1(color: { r: number; g: number; b: number }) {
    this.color1 = color;
    this.device.queue.writeBuffer(
      this.buffer,
      0,
      new Float32Array([
        this.color1.r,
        this.color1.g,
        this.color1.b,
        1.0,
        this.color2.r,
        this.color2.g,
        this.color2.b,
        1.0,
        this.color3.r,
        this.color3.g,
        this.color3.b,
        1.0,
        this.gridCount,
        this.moveStrength,
        0,
        0,
      ])
    );
  }

  updateColor2(color: { r: number; g: number; b: number }) {
    this.color2 = color;
    this.device.queue.writeBuffer(
      this.buffer,
      0,
      new Float32Array([
        this.color1.r,
        this.color1.g,
        this.color1.b,
        1.0,
        this.color2.r,
        this.color2.g,
        this.color2.b,
        1.0,
        this.color3.r,
        this.color3.g,
        this.color3.b,
        1.0,
        this.gridCount,
        this.moveStrength,
        0,
        0,
      ])
    );
  }

  updateColor3(color: { r: number; g: number; b: number }) {
    this.color3 = color;
    this.device.queue.writeBuffer(
      this.buffer,
      0,
      new Float32Array([
        this.color1.r,
        this.color1.g,
        this.color1.b,
        1.0,
        this.color2.r,
        this.color2.g,
        this.color2.b,
        1.0,
        this.color3.r,
        this.color3.g,
        this.color3.b,
        1.0,
        this.gridCount,
        this.moveStrength,
        0,
        0,
      ])
    );
  }

  getBuffer() {
    return this.buffer;
  }
}
