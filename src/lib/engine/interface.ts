export interface Keyed<KeyType> { key: KeyType, name: string }

export type RequirementKey = string
export type SimplePropertyRequirementExpectation = 'more' | 'less'
export type Requirement = Keyed<RequirementKey> & {
  type: 'singleProperty'
  propertyKey: PropertyKey
  expectation: SimplePropertyRequirementExpectation
}

export enum PropertyKey {
  hp = 'hp',
  gold = 'gold',
  fertilizer = 'fertilizer',
}

export type PropertyDef = Keyed<PropertyKey> & {
  type: 'simpleNumeric'
  min: number
  max: number
}

export type PropertyValue = {
  type: 'simpleNumeric'
  value: number
}

export type SkillKey = string;

export type SkillPrice = {
  type: 'simpleMultiProps'
  details: Map<PropertyKey, number>
}

export type SkillEffect = {
  type: 'simpleNumeric'
  details: Map<PropertyKey, number>
}

export type Skill = Keyed<SkillKey> & {
  type: 'simpleSkill'
  price: SkillPrice
  effect: SkillEffect
}

export interface IEntity extends Keyed<string> {
  type: 'simpleEntity',
  requirementMap: Map<RequirementKey, Requirement>
  propertyMap: Map<PropertyKey, PropertyValue>
  skillMap: Map<SkillKey, Skill>
  alive: boolean
}

export enum Status {
  alive = 'alive',
  dead = 'dead',
}

export interface IWorld {
  get entities(): IEntity[]
  get livingEntities(): IEntity[]
  get status(): Status
  get round(): number
  init(entities: IEntity[]): void
  step(): void,
  die(): void,
}

export const BuiltinSkillKeys: Record<string, SkillKey> = {
  sleep: 'sleep'
}

export interface IWorldEvent {
  description: string
}

export interface IVisualizer {
  onEvent(worldEvent: IWorldEvent): void
}

export interface ISkillResolver {
  useSkill(entity: IEntity, skillKey: SkillKey): void;
}

export interface IProductionProcessor {
  process(): void
}

export interface IWorldContext {
  readonly world: IWorld
  readonly skillResolver: ISkillResolver
  readonly productionProcessor: IProductionProcessor
  readonly visualizer: IVisualizer
}