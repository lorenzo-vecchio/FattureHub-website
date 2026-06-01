<script lang="ts">
	import { ModeWatcher, toggleMode, mode } from 'mode-watcher';
	import { Button } from '$lib/components/ui/button';
	import { isLoggedIn, logout as authLogout, getUser, tryRefreshAuth } from '$lib/auth';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { Sun, Moon, Menu } from 'lucide-svelte';
	import * as Sheet from '$lib/components/ui/sheet';

	let { children } = $props();

	let loggedIn = $state(false);
	let menuOpen = $state(false);

	onMount(() => {
		initAuth();
		window.addEventListener('authchange', updateAuth);
		return () => window.removeEventListener('authchange', updateAuth);
	});

	async function initAuth() {
		await tryRefreshAuth();
		updateAuth();
	}

	function updateAuth() {
		loggedIn = isLoggedIn();
	}

	function handleLogout() {
		authLogout();
		menuOpen = false;
		goto('/');
	}
</script>

<ModeWatcher />

<div class="flex min-h-screen flex-col bg-background">
	<header class="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
		<div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
			<a href="/" class="text-lg font-bold tracking-tight">FattureHub</a>

			<!-- Desktop nav -->
			<nav class="hidden sm:flex items-center gap-4">
				<a href="/#features" class="text-sm text-muted-foreground hover:text-foreground">Funzionalità</a>
				<a href="/#pricing" class="text-sm text-muted-foreground hover:text-foreground">Prezzi</a>
				<Button variant="ghost" size="icon-sm" onclick={toggleMode} class="text-muted-foreground">
					{#if mode.current === 'dark'}
						<Sun class="size-4" />
					{:else}
						<Moon class="size-4" />
					{/if}
				</Button>
				{#if loggedIn}
					<a href="/settings" class="text-sm text-muted-foreground hover:text-foreground">Il mio account</a>
					<Button variant="ghost" size="sm" onclick={handleLogout}>Esci</Button>
				{:else}
					<a href="/login">
						<Button variant="ghost" size="sm">Accedi</Button>
					</a>
					<a href="/register">
						<Button size="sm">Registrati</Button>
					</a>
				{/if}
			</nav>

			<!-- Mobile hamburger -->
			<button type="button" onclick={() => menuOpen = true} class="sm:hidden p-2 text-muted-foreground">
				<Menu class="size-5" />
			</button>
		</div>
	</header>

	<!-- Mobile menu sheet -->
	<Sheet.Root bind:open={menuOpen}>
		<Sheet.Content side="right" class="w-[300px]">
			<Sheet.Header>
				<Sheet.Title>Menu</Sheet.Title>
				<Sheet.Description>Navigazione</Sheet.Description>
			</Sheet.Header>
			<div class="flex flex-col gap-4 px-4 py-6">
				<a href="/#features" onclick={() => menuOpen = false} class="text-base font-medium text-foreground hover:text-primary">Funzionalità</a>
				<a href="/#pricing" onclick={() => menuOpen = false} class="text-base font-medium text-foreground hover:text-primary">Prezzi</a>
				<hr class="border-t" />
				<button type="button" onclick={() => { toggleMode(); }} class="flex items-center gap-3 text-base text-foreground">
					{#if mode.current === 'dark'}
						<Sun class="size-4" />
						Modalità chiara
					{:else}
						<Moon class="size-4" />
						Modalità scura
					{/if}
				</button>
				<hr class="border-t" />
				{#if loggedIn}
					<a href="/settings" onclick={() => menuOpen = false} class="text-base font-medium text-foreground hover:text-primary">Il mio account</a>
					<Button variant="outline" onclick={handleLogout} class="w-full">Esci</Button>
				{:else}
					<a href="/login" onclick={() => menuOpen = false}>
						<Button variant="outline" class="w-full">Accedi</Button>
					</a>
					<a href="/register" onclick={() => menuOpen = false}>
						<Button class="w-full">Registrati</Button>
					</a>
				{/if}
			</div>
		</Sheet.Content>
	</Sheet.Root>

	<main class="flex-1">
		{@render children()}
	</main>

	<footer class="border-t">
		<div class="mx-auto max-w-7xl px-6 py-8">
			<div class="flex flex-col items-center justify-between gap-4 sm:flex-row">
				<p class="text-sm text-muted-foreground">© 2025 FattureHub. Tutti i diritti riservati.</p>
				<div class="flex gap-6">
					<a href="https://github.com/lorenzo-vecchio/filtra-fatture" class="text-sm text-muted-foreground hover:text-foreground">GitHub</a>
					<a href="mailto:info@fatturehub.com" class="text-sm text-muted-foreground hover:text-foreground">Contatti</a>
				</div>
			</div>
		</div>
	</footer>
</div>
