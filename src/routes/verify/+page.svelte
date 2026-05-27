<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';

	const BACKEND_URL = 'http://localhost:8080';

	let email = $state('');
	let code = $state('');
	let step = $state<'email' | 'code' | 'success'>('email');
	let error = $state('');
	let loading = $state(false);
	let resendCooldown = $state(0);

	async function sendCode() {
		error = '';
		if (!email) {
			error = 'Inserisci il tuo indirizzo email.';
			return;
		}
		loading = true;
		try {
			const res = await fetch(`${BACKEND_URL}/api/auth/send-verification`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email }),
			});
			if (!res.ok) {
				const body = await res.json();
				throw new Error(body.error || 'Errore durante l\'invio del codice.');
			}
			step = 'code';
			startCooldown();
		} catch (e) {
			error = e instanceof Error ? e.message : 'Errore di connessione.';
		} finally {
			loading = false;
		}
	}

	async function verifyCode() {
		error = '';
		if (!code || code.length !== 6) {
			error = 'Inserisci il codice di 6 cifre.';
			return;
		}
		loading = true;
		try {
			const res = await fetch(`${BACKEND_URL}/api/auth/verify-code`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, code }),
			});
			if (!res.ok) {
				const body = await res.json();
				throw new Error(body.error || 'Codice non valido.');
			}
			step = 'success';
			setTimeout(() => goto('/login'), 2500);
		} catch (e) {
			error = e instanceof Error ? e.message : 'Errore di connessione.';
		} finally {
			loading = false;
		}
	}

	function startCooldown() {
		resendCooldown = 60;
		const interval = setInterval(() => {
			resendCooldown--;
			if (resendCooldown <= 0) clearInterval(interval);
		}, 1000);
	}
</script>

<svelte:head>
	<title>Verifica Email - FattureHub</title>
</svelte:head>

<div class="mx-auto max-w-7xl px-6 py-24">
	<div class="mx-auto max-w-sm">
		{#if step === 'success'}
			<div class="text-center">
				<div class="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-primary/10">
					<span class="text-3xl">✓</span>
				</div>
				<h1 class="text-2xl font-bold">Email verificata!</h1>
				<p class="mt-2 text-muted-foreground">Reindirizzamento al login...</p>
			</div>

		{:else if step === 'code'}
			<div class="mb-8 text-center">
				<h1 class="text-3xl font-bold">Verifica la tua email</h1>
				<p class="mt-2 text-muted-foreground">
					Inserisci il codice a 6 cifre inviato a <strong>{email}</strong>
				</p>
			</div>

			{#if error}
				<div class="mb-4 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">{error}</div>
			{/if}

			<form onsubmit={(e) => { e.preventDefault(); verifyCode(); }} class="space-y-4">
				<div>
					<label for="code" class="block text-sm font-medium">Codice di verifica</label>
					<input
						id="code"
						type="text"
						bind:value={code}
						maxlength={6}
						placeholder="000000"
						class="mt-1 block w-full text-center text-2xl tracking-[0.5em] rounded-lg border border-input bg-background px-3 py-3 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
					/>
				</div>

				<Button type="submit" disabled={loading} class="w-full">
					{loading ? 'Verifica in corso...' : 'Verifica'}
				</Button>
			</form>

			<div class="mt-4 text-center">
				{#if resendCooldown > 0}
					<p class="text-sm text-muted-foreground">Invia nuovo codice tra {resendCooldown}s</p>
				{:else}
					<button onclick={sendCode} class="text-sm text-primary hover:underline">
						Invia nuovo codice
					</button>
				{/if}
			</div>

		{:else}
			<div class="mb-8 text-center">
				<h1 class="text-3xl font-bold">Verifica Email</h1>
				<p class="mt-2 text-muted-foreground">Inserisci la tua email per ricevere il codice di verifica.</p>
			</div>

			{#if error}
				<div class="mb-4 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">{error}</div>
			{/if}

			<form onsubmit={(e) => { e.preventDefault(); sendCode(); }} class="space-y-4">
				<div>
					<label for="verify-email" class="block text-sm font-medium">Email</label>
					<input
						id="verify-email"
						type="email"
						bind:value={email}
						placeholder="nome@esempio.com"
						class="mt-1 block w-full rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
					/>
				</div>

				<Button type="submit" disabled={loading} class="w-full">
					{loading ? 'Invio in corso...' : 'Invia Codice'}
				</Button>
			</form>
		{/if}
	</div>
</div>
