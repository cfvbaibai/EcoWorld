import type { IWorldContext } from "./interface";
import { ProductionProcessor } from "./processor";
import { SkillResolver } from "./skill";
import { ConsoleVisualizer } from "./visualization";
import { World } from "./world";

export const WorldContext: IWorldContext = {
  world: new World(),
  visualizer: new ConsoleVisualizer(),
  skillResolver: new SkillResolver(),
  productionProcessor: new ProductionProcessor(),
} as IWorldContext;
