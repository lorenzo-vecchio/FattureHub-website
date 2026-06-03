<script lang="ts">
	import type { Release, Asset } from './types.js';
	import * as Card from '$lib/components/ui/card';
	import { Apple, Monitor, Terminal } from 'lucide-svelte';
	import PrimaryDownload from './primary-download.svelte';
	import AlternativeFormats from './alternative-formats.svelte';

	let {
		release,
		primaryAsset,
		altAssets,
		osId = '',
	}: {
		release: Release;
		primaryAsset: Asset;
		altAssets: Asset[];
		osId: string;
	} = $props();
</script>

<Card.Root class="overflow-hidden">
	<Card.Content class="p-6">
		<div class="flex items-start gap-4">
			<div class="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
				{#if osId.startsWith('macos')}
					<Apple class="size-6 text-primary" />
				{:else if osId === 'windows'}
					<Monitor class="size-6 text-primary" />
				{:else if osId.startsWith('linux')}
					<Terminal class="size-6 text-primary" />
				{/if}
			</div>
			<PrimaryDownload
				asset={primaryAsset}
				versionTag={release.tag_name}
				publishedAt={release.published_at}
			/>
		</div>
		<AlternativeFormats assets={altAssets} />
	</Card.Content>
</Card.Root>
