import { PropertyKey, type PropertyDef, type SimplePropertyRequirementExpectation, type Requirement, type PropertyValue, type RequirementKey, type SkillKey, type Skill } from "./interface";

export const EntityPropertyDefs = new Map<PropertyKey, PropertyDef>();
EntityPropertyDefs.set(PropertyKey.hp, {
  key: PropertyKey.hp,
  name: 'HP',
  type: 'simpleNumeric',
  min: 0,
  max: 100,
});
EntityPropertyDefs.set(PropertyKey.gold, {
  key: PropertyKey.gold,
  name: 'HP',
  type: 'simpleNumeric',
  min: 0,
  max: Infinity,
});
EntityPropertyDefs.set(PropertyKey.fertilizer, {
  key: PropertyKey.fertilizer,
  name: 'HP',
  type: 'simpleNumeric',
  min: 0,
  max: Infinity,
});

export function createSimplePropertyRequirement(
  key: RequirementKey, propertyKey: PropertyKey, expectation: SimplePropertyRequirementExpectation
): [RequirementKey, Requirement] {
  return [key, {
    key,
    name: key,
    type: 'singleProperty',
    propertyKey,
    expectation
  }];
}
export function createSimpleNumericProperty(
  propertyKey: PropertyKey, value: number
): [PropertyKey, PropertyValue] {
  return [propertyKey, {
    type: 'simpleNumeric',
    value,
  }];
}
export function createSimpleNumericSkill(
  key: string, effects: [PropertyKey, number][]
): [SkillKey, Skill] {
  return [key, {
    type: 'simpleSkill',
    key,
    name: key,
    price: {
      type: 'simpleMultiProps',
      details: new Map<PropertyKey, number>(),
    },
    effect: {
      type: 'simpleNumeric',
      details: new Map<PropertyKey, number>(effects),
    }
  }];
}
