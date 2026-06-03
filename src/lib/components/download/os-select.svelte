<script lang="ts">
	import type { OSConfig } from './types.js';
	import * as Select from '$lib/components/ui/select';

	let {
		osList = [],
		value = $bindable(''),
	}: {
		osList: OSConfig[];
		value: string;
	} = $props();
</script>

<div>
	<span class="mb-1.5 block text-sm font-medium" id="os-label">Sistema operativo</span>
	<Select.Root bind:value type="single">
		<Select.Trigger class="w-full" aria-labelledby="os-label">
			<span>{osList.find(o => o.id === value)?.label || 'Seleziona OS'}</span>
		</Select.Trigger>
		<Select.Content>
			{#each osList as os (os.id)}
				<Select.Item value={os.id}>{os.label}</Select.Item>
			{/each}
		</Select.Content>
	</Select.Root>
</div>
