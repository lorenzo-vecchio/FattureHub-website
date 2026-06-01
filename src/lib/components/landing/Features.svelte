<script lang="ts">
	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { Brain, Cloud, FileText, Search, Shield, Upload } from 'lucide-svelte';
</script>

<section id="features" class="border-b py-24">
	<div class="mx-auto max-w-7xl px-6">
		<div class="mx-auto max-w-2xl text-center">
			<h2 class="text-3xl font-bold tracking-tight">Tutto ciò che ti serve</h2>
			<p class="mt-2 text-muted-foreground">Un unico posto per gestire tutte le tue fatture.</p>
		</div>

		<div class="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
			<Card class="overflow-hidden">
				<div class="aspect-video bg-muted flex items-center justify-center border-b">
					<div class="text-center p-6">
						<Upload class="mx-auto size-8 text-muted-foreground/50" />
						<p class="mt-2 text-xs text-muted-foreground/50">Screenshot: schermata di upload delle fatture con drag & drop della zona di caricamento</p>
					</div>
				</div>
				<CardHeader>
					<CardTitle>Importazione Veloce</CardTitle>
					<CardDescription>Trascina e rilascia file XML/P7M. Supporto batch per importare centinaia di fatture in pochi secondi.</CardDescription>
				</CardHeader>
			</Card>

			<Card class="overflow-hidden">
				<div class="aspect-video bg-muted flex items-center justify-center border-b">
					<div class="text-center p-6">
						<Search class="mx-auto size-8 text-muted-foreground/50" />
						<p class="mt-2 text-xs text-muted-foreground/50">Screenshot: pannello dei filtri con data range, tipo documento, importo e ricerca testuale</p>
					</div>
				</div>
				<CardHeader>
					<CardTitle>Filtri Avanzati</CardTitle>
					<CardDescription>Filtra per data, importo, fornitore, cliente, tipo documento e molto altro. Risultati in tempo reale.</CardDescription>
				</CardHeader>
			</Card>

			<Card class="overflow-hidden">
				<div class="aspect-video bg-muted flex items-center justify-center border-b">
					<div class="text-center p-6">
						<Brain class="mx-auto size-8 text-muted-foreground/50" />
						<p class="mt-2 text-xs text-muted-foreground/50">Screenshot: interfaccia dell'assistente AI con conversazione e analisi delle fatture selezionate</p>
					</div>
				</div>
				<CardHeader>
					<CardTitle>Analisi AI</CardTitle>
					<CardDescription>Fai domande sulle tue fatture in linguaggio naturale. Usa OpenAI, Claude, DeepSeek o il tuo provider preferito.</CardDescription>
				</CardHeader>
			</Card>

			<Card class="overflow-hidden">
				<div class="aspect-video bg-muted flex items-center justify-center border-b">
					<div class="text-center p-6">
						<FileText class="mx-auto size-8 text-muted-foreground/50" />
						<p class="mt-2 text-xs text-muted-foreground/50">Screenshot: report generato dall'AI con tabelle riassuntive e grafici</p>
					</div>
				</div>
				<CardHeader>
					<CardTitle>Report Automatici</CardTitle>
					<CardDescription>Genera report dettagliati con un click. Riepiloghi, analisi di spesa, confronti e statistiche.</CardDescription>
				</CardHeader>
			</Card>

			<Card class="overflow-hidden">
				<div class="aspect-video bg-muted flex items-center justify-center border-b">
					<div class="text-center p-6">
						<Cloud class="mx-auto size-8 text-muted-foreground/50" />
						<p class="mt-2 text-xs text-muted-foreground/50">Illustrazione: sincronizzazione tra dispositivi con frecce che collegano computer, tablet e smartphone</p>
					</div>
				</div>
				<CardHeader>
					<CardTitle>Sync Multi-dispositivo</CardTitle>
					<CardDescription>I tuoi progetti e le tue fatture sincronizzati su tutti i dispositivi. Lavora dove vuoi, quando vuoi.</CardDescription>
				</CardHeader>
			</Card>

			<Card class="overflow-hidden">
				<div class="aspect-video bg-muted flex items-center justify-center border-b">
					<div class="text-center p-6">
						<Shield class="mx-auto size-8 text-muted-foreground/50" />
						<p class="mt-2 text-xs text-muted-foreground/50">Illustrazione: scudo con lucchetto che rappresenta la sicurezza e privacy dei dati</p>
					</div>
				</div>
				<CardHeader>
					<CardTitle>Privacy Prima</CardTitle>
					<CardDescription>I tuoi dati rimangono tuoi. AI opzionale con la tua chiave API. Open source e auto-hostabile.</CardDescription>
				</CardHeader>
			</Card>
		</div>
	</div>
</section>
