<script lang="ts">
	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
	import ImagePreview from './ImagePreview.svelte';

	let {
		imageLight,
		imageDark,
		title,
		description,
	}: {
		imageLight: string;
		imageDark: string;
		title: string;
		description: string;
	} = $props();
</script>

<ImagePreview {imageLight} {imageDark} {title} {description}>
	<Card class="overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group cursor-pointer">
		<div class="aspect-video bg-card flex items-center justify-center overflow-hidden">
			<img src={imageLight} alt={title} class="size-full object-contain dark:hidden" />
			<img src={imageDark} alt={title} class="size-full object-contain hidden dark:block" />
		</div>
		<CardHeader class="pt-4">
			<CardTitle>{title}</CardTitle>
			<CardDescription>{description}</CardDescription>
		</CardHeader>
	</Card>
</ImagePreview>
