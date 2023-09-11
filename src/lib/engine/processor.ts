import type { IProductionProcessor, Requirement, SkillEffect, SkillKey } from "./interface";
import { WorldContext } from "./ioc";

function doesSkillEffectSatisfiesRequirement(effect: SkillEffect, requirement: Requirement): boolean {
  const matchingDetail = effect.details.get(requirement.propertyKey)
  if (!matchingDetail) { return false }
  if (requirement.expectation === 'less' && matchingDetail < 0) { return true }
  if (requirement.expectation === 'more' && matchingDetail > 0) { return true }
  return false
}

export class ProductionProcessor implements IProductionProcessor {
  private _produceForDirectRequirements() {
    WorldContext.world.livingEntities.forEach(entity => {
      const skillsToUse = new Set<SkillKey>();
      entity.requirementMap.forEach(requirement => {
        entity.skillMap.forEach(skill => {
          const isMatch = doesSkillEffectSatisfiesRequirement(skill.effect, requirement);
          if (isMatch) {
            skillsToUse.add(skill.key);
          }
        });
      });
      skillsToUse.forEach(skillKey => WorldContext.skillResolver.useSkill(entity, skillKey));
    });
  }

  private _produceForTrade() {
    //
  }

  public process() {
    this._produceForDirectRequirements();
    this._produceForTrade();
  }
}
