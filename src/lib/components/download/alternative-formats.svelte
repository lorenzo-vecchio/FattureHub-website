<script lang="ts">
	import type { Asset } from './types.js';
	import { formatSize } from './types.js';

	let {
		assets = [],
	}: {
		assets: Asset[];
	} = $props();
</script>

{#if assets.length > 0}
	<div class="mt-5 border-t pt-4">
		<p class="mb-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">
			Formati alternativi
		</p>
		<div class="space-y-2">
			{#each assets as asset}
				<a
					href={asset.browser_download_url}
					class="flex items-center justify-between rounded-lg border px-3 py-2 text-sm transition-colors hover:bg-accent"
				>
					<span>{asset.name}</span>
					<span class="text-muted-foreground">{formatSize(asset.size)}</span>
				</a>
			{/each}
		</div>
	</div>
{/if}
