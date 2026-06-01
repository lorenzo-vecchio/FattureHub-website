<script lang="ts">
	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
	import ImagePreview from './ImagePreview.svelte';

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
</script>

<Card class="overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group cursor-pointer">
	<ImagePreview {imageLight} {imageDark} {title} {description}>
		{#if children}
			{@render children()}
		{:else}
			<div class="aspect-video bg-card flex items-center justify-center border-b overflow-hidden">
				<img src={imageLight} alt={title} class="size-full object-contain dark:hidden" />
				<img src={imageDark} alt={title} class="size-full object-contain hidden dark:block" />
			</div>
		{/if}
		<CardHeader>
			<CardTitle>{title}</CardTitle>
			<CardDescription>{description}</CardDescription>
		</CardHeader>
	</ImagePreview>
</Card>
