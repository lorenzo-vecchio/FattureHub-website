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

<div class="contents max-sm:hidden">
	<Dialog.Root bind:open={dialogOpen}>
		<button type="button" onclick={() => dialogOpen = true} class="text-left w-full cursor-pointer">
			{@render children?.()}
		</button>
		<Dialog.Content class="w-[90vw]">
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
</div>

<div class="contents sm:hidden">
	<Drawer.Root bind:open={drawerOpen}>
		<button type="button" onclick={() => drawerOpen = true} class="text-left w-full cursor-pointer">
			{@render children?.()}
		</button>
		<Drawer.Content>
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
</div>
