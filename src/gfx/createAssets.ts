import { FullScreenPlane } from "./FullScreenPlane";
import { ResolutionSystem } from "../utils/ResolutionSystem";

export function createAssets(device: GPUDevice, format: GPUTextureFormat) {
  const resolutionSystem = new ResolutionSystem(device);
  const fullscreenPlane = new FullScreenPlane(device, format, resolutionSystem);

  return { fullscreenPlane, resolutionSystem };
}
