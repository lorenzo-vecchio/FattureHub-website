<script lang="ts">
	import { ModeWatcher, toggleMode, mode } from 'mode-watcher';
	import { Button } from '$lib/components/ui/button';
	import { Sun, Moon, Menu } from 'lucide-svelte';

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
			<nav class="hidden sm:flex items-center gap-4" aria-label="Navigazione principale">
				<a href="/#features" class="text-sm text-muted-foreground hover:text-foreground">Funzionalità</a>
				<Button variant="ghost" size="icon-sm" onclick={toggleMode} class="text-muted-foreground" aria-label={mode.current === 'dark' ? 'Attiva tema chiaro' : 'Attiva tema scuro'}>
					{#if mode.current === 'dark'}
						<Sun class="size-4" />
					{:else}
						<Moon class="size-4" />
					{/if}
				</Button>
				<a href="/download">
					<Button size="sm">Scarica App</Button>
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
					<Button class="w-40">Scarica App</Button>
				</a>
			</div>
		</div>
	{/if}

	<main class="flex-1" id="main-content">
		{@render children()}
	</main>

	<footer class="border-t">
		<div class="mx-auto max-w-7xl px-6 py-8">
			<div class="flex flex-col items-center justify-between gap-4 sm:flex-row">
				<p class="text-sm text-muted-foreground">© 2025 FattureHub. Tutti i diritti riservati.</p>
				<div class="flex gap-6">
					<a href="https://github.com/lorenzo-vecchio/FattureHub" class="text-sm text-muted-foreground hover:text-foreground" rel="external">GitHub</a>
					<a href="mailto:info@fatturehub.com" class="text-sm text-muted-foreground hover:text-foreground">Contatti</a>
					<a href="/privacy" class="text-sm text-muted-foreground hover:text-foreground">Privacy</a>
				</div>
			</div>
		</div>
	</footer>
</div>
