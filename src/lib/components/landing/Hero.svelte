<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { Download } from 'lucide-svelte';
</script>

<section class="relative min-h-screen flex items-center justify-center overflow-hidden border-b">
	<!-- Background -->
	<div class="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" aria-hidden="true"></div>

	<!-- Decorative gradient orbs -->
	<div class="absolute top-20 left-10 size-64 rounded-full bg-primary/5 blur-3xl" aria-hidden="true"></div>
	<div class="absolute bottom-20 right-10 size-80 rounded-full bg-primary/10 blur-3xl" aria-hidden="true"></div>
	<div class="absolute top-1/2 right-1/4 size-40 rounded-full bg-primary/5 blur-2xl" aria-hidden="true"></div>

	<!-- Floating decorative dots -->
	<div class="absolute top-1/4 right-1/3 size-2 rounded-full bg-primary/20 animate-pulse" style="animation-duration: 3s;" aria-hidden="true"></div>
	<div class="absolute bottom-1/3 left-1/4 size-1.5 rounded-full bg-primary/20 animate-pulse" style="animation-duration: 4s; animation-delay: 1s;" aria-hidden="true"></div>
	<div class="absolute top-1/3 left-1/3 size-1 rounded-full bg-primary/30 animate-pulse" style="animation-duration: 2.5s; animation-delay: 0.5s;" aria-hidden="true"></div>
	<div class="absolute bottom-1/4 right-1/4 size-2.5 rounded-full bg-primary/15 animate-pulse" style="animation-duration: 3.5s; animation-delay: 2s;" aria-hidden="true"></div>

	<div class="mx-auto max-w-7xl px-6 py-24 relative">
		<div class="mx-auto max-w-3xl text-center">
			<Badge variant="default" class="mb-6 px-4 py-1.5 text-sm tracking-wide shadow-sm">Open Source · Privacy First</Badge>
			<h1 class="text-4xl font-bold tracking-tight sm:text-6xl">
				Le tue fatture,
				<span class="text-primary">più intelligenti</span>
			</h1>
			<p class="mt-6 text-lg leading-8 text-muted-foreground">
				Carica le tue fatture XML/P7M, filtralle e analizzale con l'AI — usando la tua chiave API preferita (OpenAI, Claude, DeepSeek...) o in locale con <strong>Ollama</strong> (presto disponibile). Interfaccia disponibile in tema chiaro e scuro.
			</p>

			<div class="mt-8 flex flex-wrap items-center justify-center gap-2 text-sm text-muted-foreground">
				<span class="inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5">macOS (Apple Silicon)</span>
				<span class="inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5">macOS (Intel)</span>
				<span class="inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5">Windows</span>
				<span class="inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5">Linux (DEB)</span>
				<span class="inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5">Linux (AppImage)</span>
				<span class="inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5">Linux (RPM)</span>
			</div>

			<div class="mt-10 flex items-center justify-center gap-4">
				<a href="/download">
					<Button size="lg" class="gap-2">
						<Download class="mr-2 size-4" />
						Scarica l'App
					</Button>
				</a>
			</div>
		</div>
	</div>
</section>
