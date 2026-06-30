<script lang="ts">
	import HowItWorksCard from './HowItWorksCard.svelte';

	const images = import.meta.glob('/src/assets/*.png', { eager: true, query: '?url', import: 'default' }) as Record<string, string>;

	function imgSrc(base: string, variant: 'light' | 'dark') {
		return images[`/src/assets/${base}-${variant}.png`] ?? '';
	}
</script>

<section class="border-b py-24">
	<div class="mx-auto max-w-7xl px-6">
		<div class="mx-auto max-w-2xl text-center">
			<h2 class="text-3xl font-bold tracking-tight">Come Funziona</h2>
			<p class="mt-2 text-muted-foreground">In tre semplici passi.</p>
		</div>

		<div class="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
			<HowItWorksCard
				step={1}
				title="Carica le tue fatture"
				description="Trascina i file XML o P7M nell'app. Supportiamo import batch e ZIP."
				imageLight={imgSrc('how-upload', 'light')}
				imageDark={imgSrc('how-upload', 'dark')}
			/>

			<HowItWorksCard
				step={2}
				title="Analizza e filtra"
				description="Usa i filtri avanzati o l'AI per analizzare, riassumere e ottenere insight sulle tue fatture."
				imageLight={imgSrc('how-filters', 'light')}
				imageDark={imgSrc('how-filters', 'dark')}
			/>

			<HowItWorksCard
				step={3}
				title="Esporta e sincronizza"
				description="Esporta in DOCX e salva i progetti per ritrovarli in seguito."
				imageLight={imgSrc('AI-response', 'light')}
				imageDark={imgSrc('AI-response', 'dark')}
			/>
		</div>
	</div>
</section>
