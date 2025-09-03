import { FullScreenPlane } from "./FullScreenPlane";
import { ResolutionSystem } from "../utils/ResolutionSystem";
import { MouseSystem } from "../utils/MouseSystem";
import { SitePositions } from "./SitePositions";

export function createAssets(
  device: GPUDevice,
  format: GPUTextureFormat,
  canvas: HTMLCanvasElement
) {
  const resolutionSystem = new ResolutionSystem(device);
  const mouseSystem = new MouseSystem(device, canvas);
  const sitePositions = new SitePositions(device, 30);
  const fullscreenPlane = new FullScreenPlane(
    device,
    format,
    resolutionSystem,
    mouseSystem,
    sitePositions
  );

  return { fullscreenPlane, resolutionSystem, mouseSystem, sitePositions };
}
