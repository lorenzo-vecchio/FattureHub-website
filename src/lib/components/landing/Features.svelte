<script lang="ts">
	import { Card, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
	import LottieAnimation from './LottieAnimation.svelte';
	import SyncAnimationSimple from './SyncAnimationSimple.svelte';
	import FeatureCard from './FeatureCard.svelte';
	import ImagePreview from './ImagePreview.svelte';

	const images = import.meta.glob('/src/assets/*.png', { eager: true, query: '?url', import: 'default' }) as Record<string, string>;

	function imgSrc(base: string, variant: 'light' | 'dark') {
		return images[`/src/assets/${base}-${variant}.png`] ?? '';
	}
</script>

{#snippet syncPreview()}
	<SyncAnimationSimple />
{/snippet}

{#snippet lockPreview()}
	<LottieAnimation />
{/snippet}

<section id="features" class="border-b py-24">
	<div class="mx-auto max-w-7xl px-6">
		<div class="mx-auto max-w-2xl text-center">
			<h2 class="text-3xl font-bold tracking-tight">Tutto ciò che ti serve</h2>
			<p class="mt-2 text-muted-foreground">Un unico posto per gestire tutte le tue fatture.</p>
		</div>

		<div class="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
			<FeatureCard
				title="Importazione Veloce"
				description="Trascina e rilascia file XML/P7M. Supporto batch per importare centinaia di fatture in pochi secondi."
				imageLight={imgSrc('how-upload', 'light')}
				imageDark={imgSrc('how-upload', 'dark')}
			/>

			<FeatureCard
				title="Filtri Avanzati"
				description="Filtra per data, importo, fornitore, cliente, tipo documento e molto altro. Risultati in tempo reale."
				imageLight={imgSrc('how-filters', 'light')}
				imageDark={imgSrc('how-filters', 'dark')}
			/>

			<FeatureCard
				title="Analisi AI"
				description="Fai domande sulle tue fatture in linguaggio naturale. Usa OpenAI, Claude, DeepSeek o il tuo provider preferito."
				imageLight={imgSrc('AI-response', 'light')}
				imageDark={imgSrc('AI-response', 'dark')}
			/>

			<FeatureCard
				title="Report Automatici"
				description="Genera report dettagliati con un click. Riepiloghi, analisi di spesa, confronti e statistiche."
				imageLight={imgSrc('AI-thinking', 'light')}
				imageDark={imgSrc('AI-thinking', 'dark')}
			/>

			<Card class="overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group cursor-pointer">
				<ImagePreview
					imageLight=""
					imageDark=""
					title="Sync Multi-dispositivo"
					description="I tuoi progetti e le tue fatture sincronizzati su tutti i dispositivi. Lavora dove vuoi, quando vuoi."
					preview={syncPreview}
				>
					<SyncAnimationSimple />
					<CardHeader class="pt-4">
						<CardTitle>Sync Multi-dispositivo</CardTitle>
						<CardDescription>I tuoi progetti e le tue fatture sincronizzati su tutti i dispositivi. Lavora dove vuoi, quando vuoi.</CardDescription>
					</CardHeader>
				</ImagePreview>
			</Card>

			<Card class="overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group cursor-pointer">
				<ImagePreview
					imageLight=""
					imageDark=""
					title="Privacy First"
					description="I tuoi dati sono criptati e rimangono tuoi. AI opzionale con la tua chiave API. Open source e auto-hostabile."
					preview={lockPreview}
				>
					<LottieAnimation />
					<CardHeader class="pt-4">
						<CardTitle>Privacy First</CardTitle>
						<CardDescription>I tuoi dati sono criptati e rimangono tuoi. AI opzionale con la tua chiave API. Open source e auto-hostabile.</CardDescription>
					</CardHeader>
				</ImagePreview>
			</Card>
		</div>
	</div>
</section>
