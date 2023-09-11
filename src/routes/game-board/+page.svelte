<script lang="ts">
	import {
		createSimpleNumericProperty,
		createSimpleNumericSkill,
		createSimplePropertyRequirement
	} from '$lib/engine/entity';
	import {
		type IEntity,
		type RequirementKey,
		type Requirement,
		PropertyKey,
		type PropertyValue,
		type SkillKey,
		type Skill,
		Status
	} from '$lib/engine/interface';
	import { WorldContext } from '$lib/engine/ioc';
	import { sleep } from '$lib/utils';

	const initEntities: IEntity[] = [
		{
			type: 'simpleEntity',
			key: 'A',
			name: 'A',
			alive: true,
			requirementMap: new Map<RequirementKey, Requirement>([
				createSimplePropertyRequirement('alive', PropertyKey.hp, 'more')
			]),
			propertyMap: new Map<PropertyKey, PropertyValue>([
				createSimpleNumericProperty(PropertyKey.hp, 100)
			]),
			skillMap: new Map<SkillKey, Skill>([
				createSimpleNumericSkill('eat', [[PropertyKey.hp, 5]]),
				createSimpleNumericSkill('sleep', [[PropertyKey.hp, -10]])
			])
		}
	];
	const world = WorldContext.world;
	world.init(initEntities);
	async function onStartClick() {
		while (world.status === Status.alive) {
			world.step();
			await sleep(100);
		}
		world.die();
	}
</script>

<div>
	<h1>Game</h1>
	<button on:click={onStartClick}>Start</button>
</div>
