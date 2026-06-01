<script lang="ts">
	import ImagePreview from './ImagePreview.svelte';

	let {
		step,
		imageLight,
		imageDark,
		title,
		description,
	}: {
		step: number;
		imageLight: string;
		imageDark: string;
		title: string;
		description: string;
	} = $props();
</script>

<div class="text-center transition-all duration-300 hover:-translate-y-1 group cursor-pointer">
	<ImagePreview {imageLight} {imageDark} {title} {description}>
		<div class="mx-auto flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground text-lg font-bold">{step}</div>
		<h3 class="mt-4 font-semibold">{title}</h3>
		<p class="mt-2 text-sm text-muted-foreground">{description}</p>
		<div class="mt-4 aspect-video rounded-lg bg-card flex items-center justify-center overflow-hidden">
			<img src={imageLight} alt={title} class="size-full object-contain dark:hidden" />
			<img src={imageDark} alt={title} class="size-full object-contain hidden dark:block" />
		</div>
	</ImagePreview>
</div>
