<script lang="ts">
	import type { Release } from './types.js';
	import * as Select from '$lib/components/ui/select';
	import { Badge } from '$lib/components/ui/badge';

	let {
		releases = [],
		latest = '',
		value = $bindable(''),
	}: {
		releases: Release[];
		latest: string;
		value: string;
	} = $props();
</script>

<div>
	<span class="mb-1.5 block text-sm font-medium" id="version-label">Versione</span>
	<Select.Root bind:value type="single">
		<Select.Trigger class="w-full" aria-labelledby="version-label">
			<span>{value || 'Seleziona versione'}</span>
		</Select.Trigger>
		<Select.Content>
			{#each releases as release (release.tag_name)}
				<Select.Item value={release.tag_name}>
					<div class="flex items-center gap-2">
						<span>{release.tag_name}</span>
						{#if release.tag_name === latest}
							<Badge class="text-[10px] px-1.5 py-0">Ultima</Badge>
						{/if}
					</div>
				</Select.Item>
			{/each}
		</Select.Content>
	</Select.Root>
</div>
