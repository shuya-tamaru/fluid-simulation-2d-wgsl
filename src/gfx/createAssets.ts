import { FullScreenPlane } from "./FullScreenPlane";
import { ResolutionSystem } from "../utils/ResolutionSystem";
import { MouseSystem } from "../utils/MouseSystem";
import { SitePositions } from "./SitePositions";
import { TimeStep } from "../utils/TimeStep";

export function createAssets(
  device: GPUDevice,
  format: GPUTextureFormat,
  canvas: HTMLCanvasElement
) {
  const timeStep = new TimeStep(device);
  const resolutionSystem = new ResolutionSystem(device);
  const mouseSystem = new MouseSystem(device, canvas);
  const sitePositions = new SitePositions(device, 30);
  const fullscreenPlane = new FullScreenPlane(
    device,
    format,
    resolutionSystem,
    mouseSystem,
    sitePositions,timeStep
  );

  return { fullscreenPlane, resolutionSystem, mouseSystem, sitePositions, timeStep };
}
