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
	}: {
		imageLight: string;
		imageDark: string;
		title: string;
		description: string;
		children?: import('svelte').Snippet;
	} = $props();

	const isDark = $derived(mode.current === 'dark');
	const src = $derived(isDark ? imageDark : imageLight);

	let open = $state(false);
</script>

<!-- Dialog (desktop) -->
<div class="hidden md:contents">
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
				<img src={src} alt={title} class="size-full object-contain" />
			</div>
		</Dialog.Content>
	</Dialog.Root>
</div>

<!-- Drawer (mobile) -->
<div class="block md:hidden">
	<Drawer.Root bind:open>
		<Drawer.Trigger class="text-left w-full">
			{@render children?.()}
		</Drawer.Trigger>
		<Drawer.Content>
			<Drawer.Header>
				<Drawer.Title>{title}</Drawer.Title>
				<Drawer.Description>{description}</Drawer.Description>
			</Drawer.Header>
			<div class="w-full aspect-video bg-card rounded-lg overflow-hidden px-4">
				<img src={src} alt={title} class="size-full object-contain" />
			</div>
		</Drawer.Content>
	</Drawer.Root>
</div>
