<script lang="ts">
	import '../app.d.ts';
	import { ModeWatcher } from 'mode-watcher';
	import { Button } from '$lib/components/ui/button';
	import { isLoggedIn, logout as authLogout, getUser } from '$lib/auth';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let { children } = $props();

	let loggedIn = $state(false);
	let userName = $state('');

	onMount(() => {
		loggedIn = isLoggedIn();
		const user = getUser();
		if (user) userName = user.name;
	});

	function handleLogout() {
		authLogout();
		loggedIn = false;
		userName = '';
		goto('/');
	}
</script>

<ModeWatcher />

<div class="flex min-h-screen flex-col bg-background">
	<header class="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
		<div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
			<a href="/" class="text-lg font-bold tracking-tight">FattureHub</a>
			<nav class="flex items-center gap-4">
				<a href="/#features" class="text-sm text-muted-foreground hover:text-foreground">Funzionalità</a>
				<a href="/#pricing" class="text-sm text-muted-foreground hover:text-foreground">Prezzi</a>
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
		</div>
	</header>

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
