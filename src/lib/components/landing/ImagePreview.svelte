<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Drawer from '$lib/components/ui/drawer';
	import { mode } from 'mode-watcher';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

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

	let open = $state(false);
	let isMobile = $state(false);

	onMount(() => {
		isMobile = window.innerWidth < 640;
		const onResize = () => isMobile = window.innerWidth < 640;
		window.addEventListener('resize', onResize);
		return () => window.removeEventListener('resize', onResize);
	});
</script>

{#if browser && isMobile}
	<Drawer.Root bind:open>
		<div role="button" tabindex="0" onclick={() => open = true} onkeydown={(e) => e.key === 'Enter' && (open = true)}>
			{@render children?.()}
		</div>
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
{:else}
	<Dialog.Root bind:open>
		<div role="button" tabindex="0" onclick={() => open = true} onkeydown={(e) => e.key === 'Enter' && (open = true)}>
			{@render children?.()}
		</div>
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
{/if}
