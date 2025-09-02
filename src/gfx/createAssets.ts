import { FullScreenPlane } from "./FullScreenPlane";
import { ResolutionSystem } from "../utils/ResolutionSystem";
import { MouseSystem } from "../utils/MouseSystem";

export function createAssets(
  device: GPUDevice,
  format: GPUTextureFormat,
  canvas: HTMLCanvasElement
) {
  const resolutionSystem = new ResolutionSystem(device);
  const mouseSystem = new MouseSystem(device, canvas);
  const fullscreenPlane = new FullScreenPlane(
    device,
    format,
    resolutionSystem,
    mouseSystem
  );

  return { fullscreenPlane, resolutionSystem, mouseSystem };
}
