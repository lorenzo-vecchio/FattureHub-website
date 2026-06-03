<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { Brain, Cloud, Download, FileText, Search, Shield } from 'lucide-svelte';
</script>

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
				<CardContent class="grow space-y-3">
					<div class="flex items-center gap-2 text-sm"><FileText class="size-4 text-primary" /> App desktop completa</div>
					<div class="flex items-center gap-2 text-sm"><Search class="size-4 text-primary" /> Filtri avanzati</div>
					<div class="flex items-center gap-2 text-sm"><Download class="size-4 text-primary" /> Esportazione DOCX</div>
					<div class="flex items-center gap-2 text-sm"><Brain class="size-4 text-muted-foreground/50" /> AI con la tua chiave API</div>
					<div class="flex items-center gap-2 text-sm text-muted-foreground/50"><Cloud class="size-4" /> Sync cloud non disponibile</div>
				</CardContent>
				<CardFooter>
					<a href="/download" class="w-full">
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
				<CardContent class="grow space-y-3">
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
			<div class="relative">
				<div class="absolute -top-3 left-1/2 z-10 -translate-x-1/2">
					<Badge>Più Popolare</Badge>
				</div>
				<Card class="border-primary shadow-lg">
					<CardHeader>
						<CardTitle>Pro</CardTitle>
						<CardDescription>Per professionisti</CardDescription>
						<p class="mt-4">
							<span class="text-3xl font-bold">€10</span>
							<span class="text-muted-foreground">/mese</span>
						</p>
					</CardHeader>
					<CardContent class="grow space-y-3">
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
			</div>

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
				<CardContent class="grow space-y-3">
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
