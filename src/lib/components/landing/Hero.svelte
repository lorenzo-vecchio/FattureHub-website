<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { ArrowRight, Download } from 'lucide-svelte';
</script>

<section class="relative min-h-screen flex items-center justify-center overflow-hidden border-b">
	<!-- Background -->
	<div class="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5"></div>

	<!-- Decorative gradient orbs -->
	<div class="absolute top-20 left-10 size-64 rounded-full bg-primary/5 blur-3xl"></div>
	<div class="absolute bottom-20 right-10 size-80 rounded-full bg-primary/10 blur-3xl"></div>
	<div class="absolute top-1/2 right-1/4 size-40 rounded-full bg-primary/5 blur-2xl"></div>

	<!-- Floating decorative dots -->
	<div class="absolute top-1/4 right-1/3 size-2 rounded-full bg-primary/20 animate-pulse" style="animation-duration: 3s;"></div>
	<div class="absolute bottom-1/3 left-1/4 size-1.5 rounded-full bg-primary/20 animate-pulse" style="animation-duration: 4s; animation-delay: 1s;"></div>
	<div class="absolute top-1/3 left-1/3 size-1 rounded-full bg-primary/30 animate-pulse" style="animation-duration: 2.5s; animation-delay: 0.5s;"></div>
	<div class="absolute bottom-1/4 right-1/4 size-2.5 rounded-full bg-primary/15 animate-pulse" style="animation-duration: 3.5s; animation-delay: 2s;"></div>

	<div class="mx-auto max-w-7xl px-6 py-24 relative">
		<div class="mx-auto max-w-3xl text-center">
			<Badge variant="default" class="mb-6 px-4 py-1.5 text-sm tracking-wide shadow-sm">Open Source · Privacy First</Badge>
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
