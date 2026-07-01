<script lang="ts">
	import { ModeWatcher, toggleMode, mode } from 'mode-watcher';
	import { Button } from '$lib/components/ui/button';
	import { Sun, Moon, Menu, Github, Download, Mail } from 'lucide-svelte';

	let { children } = $props();

	let menuOpen = $state(false);

	const siteUrl = 'https://fatturehub.lorenzovecchio.dev';
	const siteName = 'FattureHub';
	const defaultDescription = 'App desktop open source per filtrare, analizzare ed esportare fatture elettroniche FatturaPA con l\'aiuto dell\'AI.';
</script>

<svelte:head>
	<!-- Global Open Graph -->
	<meta property="og:site_name" content={siteName} />
	<meta property="og:locale" content="it_IT" />
	<meta property="og:type" content="website" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@fatturehub" />
	<meta name="twitter:domain" content="fatturehub.lorenzovecchio.dev" />

	<!-- Canonical -->
	<meta property="og:url" content={siteUrl} />
	<link rel="canonical" href={siteUrl} />

	<!-- JSON-LD Organization -->
	<script type="application/ld+json">
		{JSON.stringify({
			"@context": "https://schema.org",
			"@type": "Organization",
			"name": "FattureHub",
			"url": siteUrl,
			"description": defaultDescription,
			"sameAs": ["https://github.com/lorenzo-vecchio/FattureHub"]
		})}
	</script>

	<!-- JSON-LD WebSite -->
	<script type="application/ld+json">
		{JSON.stringify({
			"@context": "https://schema.org",
			"@type": "WebSite",
			"name": siteName,
			"url": siteUrl,
			"inLanguage": "it-IT",
			"description": defaultDescription
		})}
	</script>
</svelte:head>

<ModeWatcher />

<div class="flex min-h-screen flex-col bg-background">
	<header class="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
		<div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
			<a href="/" class="text-lg font-bold tracking-tight" aria-label="FattureHub home">FattureHub</a>

			<!-- Desktop nav -->
			<nav class="hidden sm:flex items-center gap-1" aria-label="Navigazione principale">
				<a href="/#features" class="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">Funzionalità</a>
				<a href="/#how-it-works" class="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">Come funziona</a>
				<a href="/download" class="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">Download</a>
				<div class="mx-2 h-5 w-px bg-border"></div>
				<Button variant="ghost" size="icon-sm" onclick={toggleMode} class="text-muted-foreground" aria-label={mode.current === 'dark' ? 'Attiva tema chiaro' : 'Attiva tema scuro'}>
					{#if mode.current === 'dark'}
						<Sun class="size-4" />
					{:else}
						<Moon class="size-4" />
					{/if}
				</Button>
				<a href="https://github.com/lorenzo-vecchio/FattureHub" rel="external" target="_blank">
					<Button variant="ghost" size="icon-sm" class="text-muted-foreground" aria-label="Vedi su GitHub">
						<Github class="size-4" />
					</Button>
				</a>
				<a href="/download">
					<Button size="sm" class="ml-2 gap-1.5">
						<Download class="size-3.5" />
						Scarica App
					</Button>
				</a>
			</nav>

			<!-- Mobile hamburger -->
			<button type="button" onclick={() => menuOpen = true} class="sm:hidden p-2 text-muted-foreground" aria-label="Apri menu">
				<Menu class="size-5" />
			</button>
		</div>
	</header>

	<!-- Mobile menu overlay -->
	{#if menuOpen}
		<div class="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center sm:hidden" role="dialog" aria-modal="true" aria-label="Menu di navigazione">
			<button type="button" onclick={() => menuOpen = false} class="absolute top-4 right-4 p-2 text-muted-foreground" aria-label="Chiudi menu">
				<svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
			</button>

			<nav class="flex flex-col items-center gap-8" aria-label="Navigazione mobile">
				<a href="/#features" onclick={() => menuOpen = false} class="text-2xl font-medium text-foreground hover:text-primary">Funzionalità</a>
				<a href="/#how-it-works" onclick={() => menuOpen = false} class="text-2xl font-medium text-foreground hover:text-primary">Come funziona</a>
				<a href="/download" onclick={() => menuOpen = false} class="text-2xl font-medium text-foreground hover:text-primary">Download</a>
			</nav>

			<div class="flex flex-col items-center gap-4 absolute bottom-12">
				<button type="button" onclick={toggleMode} class="flex items-center gap-3 text-base text-muted-foreground">
					{#if mode.current === 'dark'}
						<Sun class="size-4" />
						Modalità chiara
					{:else}
						<Moon class="size-4" />
						Modalità scura
					{/if}
				</button>
				<a href="/download" onclick={() => menuOpen = false}>
					<Button class="w-40 gap-1.5">
						<Download class="size-3.5" />
						Scarica App
					</Button>
				</a>
			</div>
		</div>
	{/if}

	<main class="flex-1" id="main-content">
		{@render children()}
	</main>

	<footer class="border-t">
		<div class="mx-auto max-w-7xl px-6 py-12 pb-16">
			<div class="grid grid-cols-1 gap-8 sm:grid-cols-3">
				<div>
					<h3 class="text-sm font-semibold mb-3">FattureHub</h3>
					<p class="text-sm text-muted-foreground leading-relaxed">
						App desktop open source per gestire, filtrare e analizzare fatture elettroniche FatturaPA con l'aiuto dell'AI.
					</p>
				</div>
				<div>
					<h3 class="text-sm font-semibold mb-3">Link</h3>
					<ul class="space-y-2 text-sm text-muted-foreground">
						<li><a href="/#features" class="hover:text-foreground transition-colors">Funzionalità</a></li>
						<li><a href="/#how-it-works" class="hover:text-foreground transition-colors">Come funziona</a></li>
						<li><a href="/download" class="hover:text-foreground transition-colors">Download</a></li>
						<li><a href="/privacy" class="hover:text-foreground transition-colors">Privacy</a></li>
					</ul>
				</div>
				<div>
					<h3 class="text-sm font-semibold mb-3">Contatti</h3>
					<ul class="space-y-2 text-sm text-muted-foreground">
						<li>
							<a href="https://github.com/lorenzo-vecchio/FattureHub" rel="external" target="_blank" class="inline-flex items-center gap-1.5 hover:text-foreground transition-colors">
								<Github class="size-3.5" /> GitHub
							</a>
						</li>
						<li>
							<a href="mailto:contact@lorenzovecchio.dev" class="inline-flex items-center gap-1.5 hover:text-foreground transition-colors">
								<Mail class="size-3.5" /> contact@lorenzovecchio.dev
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="border-t">
			<div class="mx-auto max-w-7xl px-6 py-6">
				<p class="text-sm text-muted-foreground text-center">© 2025 FattureHub. Open source (MIT).</p>
				<p class="mt-3 text-xs text-muted-foreground/70 text-center">
					Made with ❤️ by <a href="http://lorenzovecchio.dev" rel="external" target="_blank" class="underline underline-offset-2 hover:text-foreground transition-colors">Lorenzo Vecchio</a>
				</p>
			</div>
		</div>
	</footer>
</div>
