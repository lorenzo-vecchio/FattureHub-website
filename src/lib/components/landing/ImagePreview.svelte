<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Drawer from '$lib/components/ui/drawer';
	import { mode } from 'mode-watcher';

	let {
		imageLight,
		imageDark,
		title,
		description,
		children,
		preview,
	}: {
		imageLight: string;
		imageDark: string;
		title: string;
		description: string;
		children?: import('svelte').Snippet;
		preview?: import('svelte').Snippet;
	} = $props();

	const isDark = $derived(mode.current === 'dark');
	const src = $derived(isDark ? imageDark : imageLight);

	let dialogOpen = $state(false);
	let drawerOpen = $state(false);
</script>

<Dialog.Root bind:open={dialogOpen}>
	<div role="button" tabindex="0" onclick={() => dialogOpen = true} onkeydown={(e) => e.key === 'Enter' && (dialogOpen = true)} class="max-sm:hidden">
		{@render children?.()}
	</div>
	<Dialog.Content class="w-[90vw] max-sm:hidden">
		<Dialog.Header>
			<Dialog.Title>{title}</Dialog.Title>
			<Dialog.Description>{description}</Dialog.Description>
		</Dialog.Header>
		<div class="w-full aspect-video bg-card rounded-lg overflow-hidden">
			{#if preview}
				{@render preview()}
			{:else}
				<img src={src} alt={title} class="size-full object-contain" />
			{/if}
		</div>
	</Dialog.Content>
</Dialog.Root>

<Drawer.Root bind:open={drawerOpen}>
	<div role="button" tabindex="0" onclick={() => drawerOpen = true} onkeydown={(e) => e.key === 'Enter' && (drawerOpen = true)} class="sm:hidden">
		{@render children?.()}
	</div>
	<Drawer.Content class="sm:hidden">
		<Drawer.Header>
			<Drawer.Title>{title}</Drawer.Title>
			<Drawer.Description>{description}</Drawer.Description>
		</Drawer.Header>
		<div class="w-full aspect-video bg-card rounded-lg overflow-hidden px-4">
			{#if preview}
				{@render preview()}
			{:else}
				<img src={src} alt={title} class="size-full object-contain" />
			{/if}
		</div>
	</Drawer.Content>
</Drawer.Root>
