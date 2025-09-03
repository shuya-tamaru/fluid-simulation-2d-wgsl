import { FullScreenPlane } from "./FullScreenPlane";
import { ResolutionSystem } from "../utils/ResolutionSystem";
import { MouseSystem } from "../utils/MouseSystem";
import { TimeStep } from "../utils/TimeStep";
import { Uniforms } from "../utils/Uniforms";

export function createAssets(
  device: GPUDevice,
  format: GPUTextureFormat,
  canvas: HTMLCanvasElement
) {
  const timeStep = new TimeStep(device);
  const uniforms = new Uniforms(device);
  const resolutionSystem = new ResolutionSystem(device);
  const mouseSystem = new MouseSystem(device, canvas);
  const fullscreenPlane = new FullScreenPlane(
    device,
    format,
    resolutionSystem,
    mouseSystem,
    timeStep,
    uniforms
  );

  return { fullscreenPlane, resolutionSystem, mouseSystem, timeStep, uniforms };
}
