<script lang="ts">
	import type { Asset } from './types.js';
	import { formatSize, formatDate } from './types.js';
	import { Button } from '$lib/components/ui/button';
	import { Download } from 'lucide-svelte';

	let {
		asset,
		versionTag = '',
		publishedAt = '',
	}: {
		asset: Asset;
		versionTag: string;
		publishedAt: string;
	} = $props();
</script>

<div class="min-w-0 flex-1">
	<div class="flex flex-wrap items-baseline gap-2">
		<h3 class="text-lg font-semibold">
			FattureHub {versionTag}
		</h3>
		<span class="text-sm text-muted-foreground">
			&mdash; {formatDate(publishedAt)}
		</span>
	</div>
	<p class="mt-1 text-sm text-muted-foreground">
		{asset.name} &middot; {formatSize(asset.size)}
	</p>
	<div class="mt-4 flex flex-wrap gap-3">
		<a href={asset.browser_download_url}>
			<Button>
				<Download class="mr-2 size-4" />
				Scarica
			</Button>
		</a>
	</div>
</div>
