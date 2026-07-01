<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { Card, CardContent } from '$lib/components/ui/card';
	import { Download, Github, Sparkles, FileUp, GitFork, Cpu } from 'lucide-svelte';
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

	<div class="mx-auto max-w-7xl px-6 py-24 relative">
		<div class="mx-auto max-w-3xl text-center">
			<div class="flex flex-wrap justify-center gap-2 mb-6">
				<Badge variant="default" class="px-4 py-1.5 text-sm tracking-wide shadow-sm">
					<Sparkles class="mr-1.5 size-3.5" />
					Open Source · Privacy First
				</Badge>
				<Badge variant="secondary" class="px-4 py-1.5 text-sm">
					<Cpu class="mr-1.5 size-3.5" />
					AI Locale
				</Badge>
			</div>

			<h1 class="text-4xl font-bold tracking-tight sm:text-6xl">
				Le tue fatture,
				<span class="text-primary">più intelligenti</span>
			</h1>
			<p class="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
				Carica, filtra e analizza le tue fatture FatturaPA XML/P7M con l'AI.
				Usa la tua chiave API (OpenAI, Claude, DeepSeek…) o in locale con <strong>Ollama</strong>.
				Tutto offline, tutto tuo.
			</p>

			<!-- Platform chips -->
			<div class="mt-8 flex flex-wrap items-center justify-center gap-2 text-sm text-muted-foreground">
				<span class="inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5">macOS (Apple Silicon)</span>
				<span class="inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5">macOS (Intel)</span>
				<span class="inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5">Windows (x64)</span>
				<span class="inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5">Linux (DEB)</span>
				<span class="inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5">Linux (AppImage)</span>
				<span class="inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5">Linux (RPM)</span>
			</div>

			<div class="mt-10 flex items-center justify-center gap-4">
				<a href="/download">
					<Button size="lg" class="gap-2">
						<Download class="size-4" />
						Scarica l'App
					</Button>
				</a>
				<a href="https://github.com/lorenzo-vecchio/FattureHub" rel="external" target="_blank">
					<Button variant="outline" size="lg" class="gap-2">
						<Github class="size-4" />
						GitHub
					</Button>
				</a>
			</div>
		</div>

		<!-- Stats row -->
		<div class="mt-20 grid grid-cols-1 gap-4 sm:grid-cols-3 max-w-2xl mx-auto">
			<Card class="border-primary/10">
				<CardContent class="flex flex-col items-center gap-1 py-4">
					<FileUp class="size-5 text-primary" />
					<span class="text-2xl font-bold">100%</span>
					<span class="text-xs text-muted-foreground">Offline, niente cloud</span>
				</CardContent>
			</Card>
			<Card class="border-primary/10">
				<CardContent class="flex flex-col items-center gap-1 py-4">
					<GitFork class="size-5 text-primary" />
					<span class="text-2xl font-bold">Open Source</span>
					<span class="text-xs text-muted-foreground">MIT License</span>
				</CardContent>
			</Card>
			<Card class="border-primary/10">
				<CardContent class="flex flex-col items-center gap-1 py-4">
					<Cpu class="size-5 text-primary" />
					<span class="text-2xl font-bold">AI Locale</span>
					<span class="text-xs text-muted-foreground">Ollama supporto nativo</span>
				</CardContent>
			</Card>
		</div>
	</div>
</section>
