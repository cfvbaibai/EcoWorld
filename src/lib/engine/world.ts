import { WorldDeadEvent } from "./event";
import { Status, type IWorld, BuiltinSkillKeys, type IEntity } from "./interface";
import { WorldContext } from "./ioc";


export class World implements IWorld {
  private _entities: IEntity[] = [];
  private _round = 0;

  public get entities() { return this._entities; }
  public get livingEntities() { return this._entities.filter(entity => entity.alive) }
  public get status() {
    if (this.livingEntities.length) {
      return Status.alive;
    }
    return Status.dead;
  }
  public get round(): number { return this._round; }

  init(initEntities: IEntity[]) {
    this._entities = initEntities;
  }

  public step(): void {
    ++this._round;
    WorldContext.productionProcessor.process();
    this._trade();
    this._consume();
    this._sleep();
  }

  public die(): void {
    WorldContext.visualizer.onEvent(new WorldDeadEvent());
  }

  private _trade() {
    //
  }

  private _consume() {
    //
  }

  private _sleep() {
    this.livingEntities.forEach(entity => {
      WorldContext.skillResolver.useSkill(entity, BuiltinSkillKeys.sleep);
    });
  }
}
