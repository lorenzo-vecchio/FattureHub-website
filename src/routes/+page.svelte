<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import {
		Card,
		CardContent,
		CardDescription,
		CardFooter,
		CardHeader,
		CardTitle,
	} from '$lib/components/ui/card';
	import {
		ArrowRight,
		Brain,
		Cloud,
		FileText,
		CreditCard,
		Shield,
		Download,
		Upload,
		Search,
	} from 'lucide-svelte';
</script>

<svelte:head>
	<title>FattureHub - Analisi Fatture con AI</title>
	<meta name="description" content="Gestisci, filtra e analizza le tue fatture con l'aiuto dell'intelligenza artificiale. Disponibile come app desktop e web." />
</svelte:head>

<!-- Hero -->
<section class="relative overflow-hidden border-b">
	<div class="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5"></div>
	<div class="mx-auto max-w-7xl px-6 py-24 sm:py-32">
		<div class="mx-auto max-w-3xl text-center">
			<Badge variant="outline" class="mb-4">Open Source · Privacy Prima</Badge>
			<h1 class="text-4xl font-bold tracking-tight sm:text-6xl">
				Le tue fatture,
				<span class="text-primary">più intelligenti</span>
			</h1>
			<p class="mt-6 text-lg leading-8 text-muted-foreground">
				Carica le tue fatture XML/P7M, filtralle, analizzale con l'AI e sincronizzale su tutti i tuoi dispositivi.
				Usa la tua chiave API o quella del nostro backend.
			</p>
			<div class="mt-10 flex items-center justify-center gap-4">
				<a href="/register">
					<Button size="lg" class="gap-2">
						Inizia Gratuitamente
						<ArrowRight class="size-4" />
					</Button>
				</a>
				<a href="https://github.com/lorenzo-vecchio/filtra-fatture" target="_blank" rel="noopener">
					<Button variant="outline" size="lg">
						<Download class="mr-2 size-4" />
						Scarica l'App
					</Button>
				</a>
			</div>
		</div>
	</div>
</section>

<!-- Features -->
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

<!-- How it Works -->
<section class="border-b py-24">
	<div class="mx-auto max-w-7xl px-6">
		<div class="mx-auto max-w-2xl text-center">
			<h2 class="text-3xl font-bold tracking-tight">Come Funziona</h2>
			<p class="mt-2 text-muted-foreground">In tre semplici passi.</p>
		</div>

		<div class="mt-16 grid gap-8 md:grid-cols-3">
			<div class="text-center">
				<div class="mx-auto flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground text-lg font-bold">1</div>
				<h3 class="mt-4 font-semibold">Carica le tue fatture</h3>
				<p class="mt-2 text-sm text-muted-foreground">Trascina i file XML o P7M nell'app. Supportiamo import batch e ZIP.</p>
				<div class="mt-4 aspect-video rounded-lg bg-muted flex items-center justify-center">
					<div class="text-center p-4">
						<Upload class="mx-auto size-6 text-muted-foreground/50" />
						<p class="mt-1 text-xs text-muted-foreground/50">Screenshot: zona di upload con drag & drop attivo, file in fase di caricamento</p>
					</div>
				</div>
			</div>

			<div class="text-center">
				<div class="mx-auto flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground text-lg font-bold">2</div>
				<h3 class="mt-4 font-semibold">Analizza e filtra</h3>
				<p class="mt-2 text-sm text-muted-foreground">Usa i filtri avanzati o l'AI per analizzare, riassumere e ottenere insight sulle tue fatture.</p>
				<div class="mt-4 aspect-video rounded-lg bg-muted flex items-center justify-center">
					<div class="text-center p-4">
						<Search class="mx-auto size-6 text-muted-foreground/50" />
						<p class="mt-1 text-xs text-muted-foreground/50">Screenshot: pannello dei filtri con risultati filtrati in tempo reale</p>
					</div>
				</div>
			</div>

			<div class="text-center">
				<div class="mx-auto flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground text-lg font-bold">3</div>
				<h3 class="mt-4 font-semibold">Esporta e sincronizza</h3>
				<p class="mt-2 text-sm text-muted-foreground">Esporta in DOCX, salva i progetti nel cloud e sincronizza su tutti i tuoi dispositivi.</p>
				<div class="mt-4 aspect-video rounded-lg bg-muted flex items-center justify-center">
					<div class="text-center p-4">
						<Cloud class="mx-auto size-6 text-muted-foreground/50" />
						<p class="mt-1 text-xs text-muted-foreground/50">Screenshot: pannello progetti con lista dei progetti salvati e opzione di sincronizzazione</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Pricing -->
<section id="pricing" class="border-b py-24">
	<div class="mx-auto max-w-7xl px-6">
		<div class="mx-auto max-w-2xl text-center">
			<h2 class="text-3xl font-bold tracking-tight">Piani e Prezzi</h2>
			<p class="mt-2 text-muted-foreground">Scegli il piano che fa per te. L'app base è gratuita e open source.</p>
		</div>

		<div class="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
			<!-- Gratis -->
			<Card>
				<CardHeader>
					<CardTitle>Gratis</CardTitle>
					<CardDescription>Per uso occasionale</CardDescription>
					<p class="mt-4">
						<span class="text-3xl font-bold">Gratis</span>
					</p>
				</CardHeader>
				<CardContent class="space-y-3">
					<div class="flex items-center gap-2 text-sm"><FileText class="size-4 text-primary" /> App desktop completa</div>
					<div class="flex items-center gap-2 text-sm"><Search class="size-4 text-primary" /> Filtri avanzati</div>
					<div class="flex items-center gap-2 text-sm"><Download class="size-4 text-primary" /> Esportazione DOCX</div>
					<div class="flex items-center gap-2 text-sm"><Brain class="size-4 text-muted-foreground/50" /> AI con la tua chiave API</div>
					<div class="flex items-center gap-2 text-sm text-muted-foreground/50"><Cloud class="size-4" /> Sync cloud non disponibile</div>
				</CardContent>
				<CardFooter>
					<a href="https://github.com/lorenzo-vecchio/filtra-fatture" class="w-full">
						<Button variant="outline" class="w-full">Scarica App</Button>
					</a>
				</CardFooter>
			</Card>

			<!-- Starter -->
			<Card>
				<CardHeader>
					<CardTitle>Starter</CardTitle>
					<CardDescription>Per iniziare</CardDescription>
					<p class="mt-4">
						<span class="text-3xl font-bold">€5</span>
						<span class="text-muted-foreground">/mese</span>
					</p>
				</CardHeader>
				<CardContent class="space-y-3">
					<div class="flex items-center gap-2 text-sm"><FileText class="size-4 text-primary" /> App desktop completa</div>
					<div class="flex items-center gap-2 text-sm"><Search class="size-4 text-primary" /> Filtri avanzati</div>
					<div class="flex items-center gap-2 text-sm"><Download class="size-4 text-primary" /> Esportazione DOCX</div>
					<div class="flex items-center gap-2 text-sm"><Brain class="size-4 text-primary" /> 5 crediti AI/mese inclusi</div>
					<div class="flex items-center gap-2 text-sm"><Cloud class="size-4 text-primary" /> Sync cloud illimitato</div>
				</CardContent>
				<CardFooter>
					<a href="/register" class="w-full">
						<Button variant="outline" class="w-full">Inizia</Button>
					</a>
				</CardFooter>
			</Card>

			<!-- Pro -->
			<Card class="relative border-primary shadow-lg">
				<div class="absolute -top-3 left-1/2 -translate-x-1/2">
					<Badge>Più Popolare</Badge>
				</div>
				<CardHeader>
					<CardTitle>Pro</CardTitle>
					<CardDescription>Per professionisti</CardDescription>
					<p class="mt-4">
						<span class="text-3xl font-bold">€10</span>
						<span class="text-muted-foreground">/mese</span>
					</p>
				</CardHeader>
				<CardContent class="space-y-3">
					<div class="flex items-center gap-2 text-sm"><FileText class="size-4 text-primary" /> App desktop completa</div>
					<div class="flex items-center gap-2 text-sm"><Search class="size-4 text-primary" /> Filtri avanzati</div>
					<div class="flex items-center gap-2 text-sm"><Download class="size-4 text-primary" /> Esportazione DOCX</div>
					<div class="flex items-center gap-2 text-sm"><Brain class="size-4 text-primary" /> 15 crediti AI/mese inclusi</div>
					<div class="flex items-center gap-2 text-sm"><Cloud class="size-4 text-primary" /> Sync cloud illimitato</div>
					<div class="flex items-center gap-2 text-sm"><Shield class="size-4 text-primary" /> Backup file su cloud</div>
				</CardContent>
				<CardFooter>
					<a href="/register" class="w-full">
						<Button class="w-full">Inizia Prova Gratuita</Button>
					</a>
				</CardFooter>
			</Card>

			<!-- Business -->
			<Card>
				<CardHeader>
					<CardTitle>Business</CardTitle>
					<CardDescription>Per team e aziende</CardDescription>
					<p class="mt-4">
						<span class="text-3xl font-bold">€25</span>
						<span class="text-muted-foreground">/mese</span>
					</p>
				</CardHeader>
				<CardContent class="space-y-3">
					<div class="flex items-center gap-2 text-sm"><FileText class="size-4 text-primary" /> App desktop completa</div>
					<div class="flex items-center gap-2 text-sm"><Search class="size-4 text-primary" /> Filtri avanzati</div>
					<div class="flex items-center gap-2 text-sm"><Download class="size-4 text-primary" /> Esportazione DOCX</div>
					<div class="flex items-center gap-2 text-sm"><Brain class="size-4 text-primary" /> 50 crediti AI/mese inclusi</div>
					<div class="flex items-center gap-2 text-sm"><Cloud class="size-4 text-primary" /> Sync cloud illimitato</div>
					<div class="flex items-center gap-2 text-sm"><Shield class="size-4 text-primary" /> Backup file su cloud</div>
				</CardContent>
				<CardFooter>
					<a href="/register" class="w-full">
						<Button variant="outline" class="w-full">Contatta</Button>
					</a>
				</CardFooter>
			</Card>
		</div>

		<div class="mt-12 text-center">
			<p class="text-sm text-muted-foreground">
				Tutti i piani includono crediti AI consumabili. Crediti aggiuntivi disponibili come acquisti una tantum.
				<br />1 credito AI equivale a circa 1 milione di token (modificabile in futuro).
			</p>
		</div>
	</div>
</section>

<!-- CTA -->
<section class="py-24">
	<div class="mx-auto max-w-7xl px-6">
		<div class="mx-auto max-w-2xl text-center">
			<h2 class="text-3xl font-bold tracking-tight">Pronto a semplificare le tue fatture?</h2>
			<p class="mt-2 text-muted-foreground">Scarica l'app gratuitamente o registrati per attivare la sincronizzazione cloud e l'AI backend.</p>
			<div class="mt-10 flex items-center justify-center gap-4">
				<a href="/register">
					<Button size="lg" class="gap-2">
						Crea Account Gratuito
						<ArrowRight class="size-4" />
					</Button>
				</a>
				<a href="https://github.com/lorenzo-vecchio/filtra-fatture" target="_blank" rel="noopener">
					<Button variant="outline" size="lg">
						<Download class="mr-2 size-4" />
						Scarica App
					</Button>
				</a>
			</div>
		</div>
	</div>
</section>
