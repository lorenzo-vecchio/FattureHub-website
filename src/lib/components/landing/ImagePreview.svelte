<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
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

	let open = $state(false);
</script>

<Dialog.Root bind:open>
	<Dialog.Trigger class="text-left w-full">
		{@render children?.()}
	</Dialog.Trigger>
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
