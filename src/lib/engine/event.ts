import type { IEntity, IWorldEvent, PropertyKey, SkillKey } from "./interface";

export class EntityPropertyChangeEvent implements IWorldEvent {
  description: string;

  constructor(entity: IEntity, propertyKey: PropertyKey, oldValue: number, newValue: number) {
    this.description = `${entity.key}.${propertyKey}: ${oldValue} -> ${newValue}`;
  }
}

export class EntityDeadEvent implements IWorldEvent {
  description: string;

  constructor(entity: IEntity) {
    this.description = `${entity.key} is dead.`;
  }
}

export class WorldDeadEvent implements IWorldEvent {
  description: string;

  constructor() {
    this.description = 'World is dead.';
  }
}

export class SkillUsingEvent implements IWorldEvent {
  description: string;

  constructor(entity: IEntity, skillKey: SkillKey) {
    this.description = `${entity.key} is using skill **${skillKey}**...`;
  }
}
