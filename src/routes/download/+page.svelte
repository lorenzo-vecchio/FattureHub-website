<script lang="ts">
	import { onMount } from 'svelte';
	import type { Release } from '$lib/components/download/types.js';
	import { osConfigs, detectOS, matchAsset, getPrimaryAsset, getAltAssets } from '$lib/components/download/types.js';
	import Hero from '$lib/components/download/hero.svelte';
	import VersionSelect from '$lib/components/download/version-select.svelte';
	import OSSelect from '$lib/components/download/os-select.svelte';
	import DownloadCard from '$lib/components/download/download-card.svelte';

	let { data } = $props();

	let releases: Release[] = $derived(data.releases ?? []);
	let latest = $derived(data.latest ?? '');
	let loadError = $derived(data.error ?? '');

	let selectedVersion = $state('');
	let selectedOS = $state('');

	$effect(() => {
		if (latest) selectedVersion = latest;
	});

	onMount(() => {
		selectedOS = detectOS(true);
		const uaData = (navigator as any).userAgentData;
		if (!uaData?.getHighEntropyValues) return;
		uaData.getHighEntropyValues(['architecture']).then((data: any) => {
			if (data.architecture === 'arm') selectedOS = 'macos-arm64';
		});
	});

	const currentRelease = $derived(
		releases.find(r => r.tag_name === selectedVersion) ?? null
	);

	const availableOS = $derived.by(() => {
		if (!currentRelease) return [];
		return osConfigs.filter(os =>
			currentRelease.assets.some(a => matchAsset(a.name, os.id))
		);
	});

	$effect(() => {
		if (selectedOS && availableOS.length > 0 && !availableOS.some(o => o.id === selectedOS)) {
			selectedOS = availableOS[0].id;
		}
	});

	const primaryAsset = $derived(
		currentRelease ? getPrimaryAsset(currentRelease.assets, selectedOS) : null
	);

	const altAssets = $derived(
		currentRelease ? getAltAssets(currentRelease.assets, selectedOS) : []
	);
</script>

<svelte:head>
	<title>Scarica - FattureHub</title>
	<meta name="description" content="Scarica l'ultima versione di FattureHub per il tuo sistema operativo." />
</svelte:head>

<div class="mx-auto max-w-7xl px-6 py-24">
	<div class="mx-auto max-w-2xl">
		<Hero />

		{#if loadError}
			<div class="rounded-lg bg-destructive/10 p-4 text-center text-sm text-destructive">
				{loadError}
			</div>
		{:else if releases.length === 0}
			<div class="rounded-lg bg-muted p-8 text-center">
				<p class="text-sm text-muted-foreground">Nessuna versione disponibile.</p>
			</div>
		{:else}
			<div class="space-y-6">
				<div class="grid gap-4 sm:grid-cols-2">
					<VersionSelect bind:value={selectedVersion} {releases} {latest} />
					<OSSelect bind:value={selectedOS} osList={availableOS} />
				</div>

				{#if currentRelease && primaryAsset}
					<DownloadCard
						release={currentRelease}
						primaryAsset={primaryAsset}
						altAssets={altAssets}
						osId={selectedOS}
					/>
				{:else if currentRelease && !primaryAsset}
					<div class="rounded-lg bg-muted p-8 text-center">
						<p class="text-sm text-muted-foreground">
							Nessun file disponibile per questa combinazione.
						</p>
					</div>
				{/if}
			</div>
		{/if}
	</div>
</div>
