<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';

	const BACKEND_URL = 'http://localhost:8080';

	let name = $state('');
	let email = $state('');
	let password = $state('');
	let confirmPassword = $state('');
	let error = $state('');
	let loading = $state(false);
	let success = $state(false);

	async function handleRegister() {
		error = '';
		if (!name || !email || !password) {
			error = 'Compila tutti i campi.';
			return;
		}
		if (password.length < 8) {
			error = 'La password deve essere di almeno 8 caratteri.';
			return;
		}
		if (password !== confirmPassword) {
			error = 'Le password non coincidono.';
			return;
		}
		if (!email.includes('@')) {
			error = 'Inserisci un indirizzo email valido.';
			return;
		}

		loading = true;
		try {
			const res = await fetch(`${BACKEND_URL}/api/auth/register`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name, email, password }),
			});

			if (!res.ok) {
				const body = await res.json();
				throw new Error(body.error || 'Errore durante la registrazione.');
			}

			success = true;
			setTimeout(() => goto('/verify'), 2000);
		} catch (e) {
			error = e instanceof Error ? e.message : 'Errore di connessione.';
		} finally {
			loading = false;
		}
	}
</script>

<svelte:head>
	<title>Registrati - FattureHub</title>
</svelte:head>

<div class="mx-auto max-w-7xl px-6 py-24">
	<div class="mx-auto max-w-sm">
		<div class="mb-8 text-center">
			<h1 class="text-3xl font-bold">Crea il tuo account</h1>
			<p class="mt-2 text-muted-foreground">Inizia a sincronizzare le tue fatture su tutti i dispositivi.</p>
		</div>

		{#if success}
			<div class="rounded-lg bg-primary/10 p-4 text-center text-sm text-primary">
				Account creato con successo! Reindirizzamento alla verifica email...
			</div>
		{:else}
			{#if error}
				<div class="mb-4 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
					{error}
				</div>
			{/if}

			<form
				onsubmit={(e) => { e.preventDefault(); handleRegister(); }}
				class="space-y-4"
			>
				<div>
					<label for="name" class="block text-sm font-medium">Nome</label>
					<input
						id="name"
						type="text"
						bind:value={name}
						placeholder="Mario Rossi"
						class="mt-1 block w-full rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
					/>
				</div>

				<div>
					<label for="email" class="block text-sm font-medium">Email</label>
					<input
						id="email"
						type="email"
						bind:value={email}
						placeholder="mario@esempio.com"
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
						placeholder="Minimo 8 caratteri"
						class="mt-1 block w-full rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
						autocomplete="new-password"
					/>
				</div>

				<div>
					<label for="confirm-password" class="block text-sm font-medium">Conferma Password</label>
					<input
						id="confirm-password"
						type="password"
						bind:value={confirmPassword}
						placeholder="Ripeti la password"
						class="mt-1 block w-full rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
						autocomplete="new-password"
					/>
				</div>

				<Button type="submit" disabled={loading} class="w-full">
					{loading ? 'Registrazione in corso...' : 'Crea Account'}
				</Button>
			</form>

			<p class="mt-6 text-center text-sm text-muted-foreground">
				Hai già un account?
				<a href="/login" class="font-medium text-primary hover:underline">Accedi</a>
			</p>
		{/if}
	</div>
</div>
