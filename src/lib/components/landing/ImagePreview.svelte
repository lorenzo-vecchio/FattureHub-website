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
	<Dialog.Trigger class="text-left w-full max-sm:hidden">
		{@render children?.()}
	</Dialog.Trigger>
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
	<Drawer.Trigger class="text-left w-full sm:hidden">
		{@render children?.()}
	</Drawer.Trigger>
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
