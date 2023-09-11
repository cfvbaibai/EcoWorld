import type { IVisualizer, IWorldEvent } from "./interface";
import { WorldContext } from "./ioc";

export class ConsoleVisualizer implements IVisualizer {
  onEvent(worldEvent: IWorldEvent): void {
    console.log(`[ROUND ${WorldContext.world.round}] ${worldEvent.description}`);
  }
}
