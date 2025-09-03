import { createRandom2DPositions } from "./createRandom2DPositions";

export class SitePositions {
  private device: GPUDevice;
  private sitePositionsBuffer!: GPUBuffer;
  public positionCount: number;
  private maxPositionCount: number;
  private positions!: Float32Array;
  private currentCount!: number;

  constructor(device: GPUDevice, positionCount: number) {
    this.device = device;
    this.positionCount = positionCount;
    this.maxPositionCount = 50;
    this.init();
  }

  public init() {
    this.positions = createRandom2DPositions(this.positionCount);
    this.currentCount = this.positionCount;
    this.sitePositionsBuffer = this.device.createBuffer({
      size: this.maxPositionCount * 2 * 4,
      usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
    });
    this.device.queue.writeBuffer(this.sitePositionsBuffer, 0, this.positions);
  }

  getBuffer() {
    return this.sitePositionsBuffer;
  }

  updatePositions(n: number) {
    if (n > this.maxPositionCount) {
      console.warn(
        `Requested ${n} positions, but max is ${this.maxPositionCount}`
      );
      n = this.maxPositionCount;
    }

    const currentPositionCount = this.positions.length / 2;

    if (n > currentPositionCount) {
      // 位置を増やす：既存データ + 新しいランダムデータ
      const diff = n - currentPositionCount;
      const newPositions = createRandom2DPositions(diff);

      // 新しい配列を作成して既存データと新しいデータを結合
      const updatedPositions = new Float32Array(
        (currentPositionCount + diff) * 2
      );
      updatedPositions.set(this.positions, 0); // 既存データをコピー
      updatedPositions.set(newPositions, this.positions.length); // 新しいデータを追加

      this.positions = updatedPositions;
    } else if (n < currentPositionCount) {
      // 位置を減らす：既存データから前の部分を保持
      this.positions = this.positions.slice(0, n * 2);
    }
    // n == currentPositionCount の場合は何もしない

    this.currentCount = n;

    // バッファを更新（実際に使用する分だけ）
    this.device.queue.writeBuffer(this.sitePositionsBuffer, 0, this.positions);

    // 残りの部分をゼロで埋める（オプション、デバッグ用）
    if (this.positions.length < this.maxPositionCount * 2) {
      const zeros = new Float32Array(
        this.maxPositionCount * 2 - this.positions.length
      );
      this.device.queue.writeBuffer(
        this.sitePositionsBuffer,
        this.positions.byteLength,
        zeros
      );
    }
  }
}
