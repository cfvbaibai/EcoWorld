import { EntityDeadEvent, EntityPropertyChangeEvent, SkillUsingEvent } from "./event";
import { PropertyKey, type IEntity, type ISkillResolver, type SkillKey } from "./interface";
import { WorldContext } from "./ioc";

export class SkillResolver implements ISkillResolver {
  public useSkill(entity: IEntity, skillKey: SkillKey) {
    const skill = entity.skillMap.get(skillKey);
    const baseErrorMsg = `Entity ${entity.key} cannot use skill ${skillKey}.`;

    function getError(reason: string) {
      return new Error(`${baseErrorMsg} Reason: ${reason}`);
    }

    if (!skill) { throw getError('No such skill.'); }
    if (skill.type === 'simpleSkill') {
      if (skill.effect.type === 'simpleNumeric') {
        skill.effect.details.forEach((effectAmount, propertyKey) => {
          const property = entity.propertyMap.get(propertyKey);
          if (!property) {
            throw getError(`Skill tries to affect non-existing property ${propertyKey}.`);
          }
          if (property.type !== 'simpleNumeric') {
            throw getError(
              `The skill's effect is simpleNumeric, ` +
              `but the property ${propertyKey}'s type is not simpleNumeric.`);
          }

          WorldContext.visualizer.onEvent(new SkillUsingEvent(entity, skill.key));
          const oldValue = property.value;
          property.value += effectAmount;
          const newValue = property.value;
          WorldContext.visualizer.onEvent(new EntityPropertyChangeEvent(entity, propertyKey, oldValue, newValue));

          if (propertyKey === PropertyKey.hp) {
            if (newValue <= 0) {
              WorldContext.visualizer.onEvent(new EntityDeadEvent(entity));
              entity.alive = false;
            }
          }
        });
      } else {
        throw getError('Non-supported effect tye: ' + skill.effect.type);
      }
    } else {
      throw getError('Non-supported skill type: ' + skill.type);
    }
  }
}
