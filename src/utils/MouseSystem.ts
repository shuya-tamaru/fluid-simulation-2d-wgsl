export class MouseSystem {
  private device: GPUDevice;
  private mouseBuffer!: GPUBuffer;
  private mouse = { x: 0, y: 0 };
  private canvas: HTMLCanvasElement;

  constructor(device: GPUDevice, canvas: HTMLCanvasElement) {
    this.device = device;
    this.canvas = canvas;
    this.init();
  }

  private init() {
    // buffer作成 (8 bytes: x, y)
    this.mouseBuffer = this.device.createBuffer({
      size: 8,
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    });

    // イベントリスナー設定
    this.canvas.addEventListener("mousemove", this.onMouseMove.bind(this));

    this.update();
  }

  private onMouseMove(event: MouseEvent) {
    // 実際のcanvasピクセル座標系に変換
    const rect = this.canvas.getBoundingClientRect();
    const cssX = (event.clientX - rect.left) / rect.width;
    const cssY = (event.clientY - rect.top) / rect.height;

    this.mouse.x = cssX * this.canvas.width;
    this.mouse.y = cssY * this.canvas.height;

    this.update();
  }

  private update() {
    this.device.queue.writeBuffer(
      this.mouseBuffer,
      0,
      new Float32Array([this.mouse.x, this.mouse.y])
    );
  }

  getBuffer() {
    return this.mouseBuffer;
  }
}
