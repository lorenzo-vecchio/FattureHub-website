<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { ArrowRight, Download } from 'lucide-svelte';
</script>

<section class="relative min-h-screen flex items-center justify-center overflow-hidden border-b">
	<div class="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5"></div>
	<div class="mx-auto max-w-7xl px-6 py-24">
		<div class="mx-auto max-w-3xl text-center">
			<Badge variant="outline" class="mb-4">Open Source · Privacy First</Badge>
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
