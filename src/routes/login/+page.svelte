<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';

	const BACKEND_URL = 'http://localhost:8080';

	let email = $state('');
	let password = $state('');
	let error = $state('');
	let loading = $state(false);

	async function handleLogin() {
		error = '';
		if (!email || !password) {
			error = 'Inserisci email e password.';
			return;
		}
		loading = true;
		try {
			const res = await fetch(`${BACKEND_URL}/api/auth/login`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, password }),
			});

			if (!res.ok) {
				const body = await res.json();
				throw new Error(body.error || 'Credenziali non valide.');
			}

			const data = await res.json();
			localStorage.setItem('fatturehub_access_token', data.access_token);
			localStorage.setItem('fatturehub_refresh_token', data.refresh_token);
			localStorage.setItem('fatturehub_user', JSON.stringify(data.user));
			goto('/');
		} catch (e) {
			error = e instanceof Error ? e.message : 'Errore di connessione.';
		} finally {
			loading = false;
		}
	}
</script>

<svelte:head>
	<title>Accedi - FattureHub</title>
</svelte:head>

<div class="mx-auto max-w-7xl px-6 py-24">
	<div class="mx-auto max-w-sm">
		<div class="mb-8 text-center">
			<h1 class="text-3xl font-bold">Bentornato</h1>
			<p class="mt-2 text-muted-foreground">Accedi al tuo account FattureHub.</p>
		</div>

		{#if error}
			<div class="mb-4 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
				{error}
			</div>
		{/if}

		<form
			onsubmit={(e) => { e.preventDefault(); handleLogin(); }}
			class="space-y-4"
		>
			<div>
				<label for="email" class="block text-sm font-medium">Email</label>
				<input
					id="email"
					type="email"
					bind:value={email}
					placeholder="nome@esempio.com"
					class="mt-1 block w-full rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
					autocomplete="email"
				/>
			</div>

			<div>
				<label for="password" class="block text-sm font-medium">Password</label>
				<input
					id="password"
					type="password"
					bind:value={password}
					placeholder="••••••••"
					class="mt-1 block w-full rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
					autocomplete="current-password"
				/>
			</div>

			<Button type="submit" disabled={loading} class="w-full">
				{loading ? 'Accesso in corso...' : 'Accedi'}
			</Button>
		</form>

		<p class="mt-6 text-center text-sm text-muted-foreground">
			Non hai un account?
			<a href="/register" class="font-medium text-primary hover:underline">Registrati</a>
		</p>
	</div>
</div>
