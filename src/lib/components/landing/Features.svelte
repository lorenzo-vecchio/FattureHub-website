<script lang="ts">
	import { mode } from 'mode-watcher';
	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
	import LottieAnimation from './LottieAnimation.svelte';
	import SyncAnimationSimple from './SyncAnimationSimple.svelte';

	const images = import.meta.glob('/src/assets/*.png', { eager: true, query: '?url', import: 'default' }) as Record<string, string>;

	function image(base: string) {
		return images[`/src/assets/${base}-${mode.current}.png`] ?? '';
	}
</script>

<section id="features" class="border-b py-24">
	<div class="mx-auto max-w-7xl px-6">
		<div class="mx-auto max-w-2xl text-center">
			<h2 class="text-3xl font-bold tracking-tight">Tutto ciò che ti serve</h2>
			<p class="mt-2 text-muted-foreground">Un unico posto per gestire tutte le tue fatture.</p>
		</div>

		<div class="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
			<Card class="overflow-hidden">
				<div class="aspect-video bg-card flex items-center justify-center border-b overflow-hidden">
					<img src={image('how-upload')} alt="Schermata di upload fatture" class="size-full object-contain" />
				</div>
				<CardHeader>
					<CardTitle>Importazione Veloce</CardTitle>
					<CardDescription>Trascina e rilascia file XML/P7M. Supporto batch per importare centinaia di fatture in pochi secondi.</CardDescription>
				</CardHeader>
			</Card>

			<Card class="overflow-hidden">
				<div class="aspect-video bg-card flex items-center justify-center border-b overflow-hidden">
					<img src={image('how-filters')} alt="Pannello dei filtri" class="size-full object-contain" />
				</div>
				<CardHeader>
					<CardTitle>Filtri Avanzati</CardTitle>
					<CardDescription>Filtra per data, importo, fornitore, cliente, tipo documento e molto altro. Risultati in tempo reale.</CardDescription>
				</CardHeader>
			</Card>

			<Card class="overflow-hidden">
				<div class="aspect-video bg-card flex items-center justify-center border-b overflow-hidden">
					<img src={image('AI-response')} alt="Interfaccia assistente AI" class="size-full object-contain" />
				</div>
				<CardHeader>
					<CardTitle>Analisi AI</CardTitle>
					<CardDescription>Fai domande sulle tue fatture in linguaggio naturale. Usa OpenAI, Claude, DeepSeek o il tuo provider preferito.</CardDescription>
				</CardHeader>
			</Card>

			<Card class="overflow-hidden">
				<div class="aspect-video bg-card flex items-center justify-center border-b overflow-hidden">
					<img src={image('AI-thinking')} alt="Report generato dall'AI" class="size-full object-contain" />
				</div>
				<CardHeader>
					<CardTitle>Report Automatici</CardTitle>
					<CardDescription>Genera report dettagliati con un click. Riepiloghi, analisi di spesa, confronti e statistiche.</CardDescription>
				</CardHeader>
			</Card>

			<Card class="overflow-hidden">
				<SyncAnimationSimple />
				<CardHeader>
					<CardTitle>Sync Multi-dispositivo</CardTitle>
					<CardDescription>I tuoi progetti e le tue fatture sincronizzati su tutti i dispositivi. Lavora dove vuoi, quando vuoi.</CardDescription>
				</CardHeader>
			</Card>

			<Card class="overflow-hidden">
				<LottieAnimation />
				<CardHeader>
					<CardTitle>Privacy First</CardTitle>
					<CardDescription>I tuoi dati sono criptati e rimangono tuoi. AI opzionale con la tua chiave API. Open source e auto-hostabile.</CardDescription>
				</CardHeader>
			</Card>
		</div>
	</div>
</section>
