<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import { apiFetch, isLoggedIn, logout as authLogout, getUser } from '$lib/auth';
	import { onMount } from 'svelte';
	import { Brain, CreditCard, LogOut, Sparkles, ExternalLink, Loader } from 'lucide-svelte';

	let loading = $state(true);
	let verifying = $state(false);
	let error = $state('');
	let user = $state(getUser());
	let credits = $state<{ balance: number; monthly_allowance: number; subscription_status: string } | null>(null);
	let transactions = $state<{ id: string; amount: number; type: string; description: string; created_at: string }[]>([]);
	let plans = $state<{ id: string; name: string; price_id: string; price: number; monthly_credits: number; file_backup: boolean }[]>([]);
	let topups = $state<{ id: string; name: string; price_id: string; price: number; credits: number }[]>([]);
	let subscription = $state<{ status: string } | null>(null);
	let checkoutLoading = $state(false);

	onMount(() => {
		if (!isLoggedIn()) {
			goto('/login');
			return;
		}
		const sessionId = typeof window !== 'undefined'
		? new URL(window.location.href).searchParams.get('session_id')
		: null;
		if (sessionId) {
			verifyPayment(sessionId);
		} else {
			loadData();
		}
	});

	async function verifyPayment(sessionId: string) {
		verifying = true;
		error = '';
		const maxAttempts = 10;
		for (let i = 0; i < maxAttempts; i++) {
			try {
				const data = await apiFetch<{ status: string }>(`/api/stripe/verify-payment?session_id=${sessionId}`);
				if (data.status === 'completed') {
					await loadData();
					verifying = false;
					return;
				}
				if (i < maxAttempts - 1) {
					await new Promise(r => setTimeout(r, 2000));
				}
			} catch {
				if (i < maxAttempts - 1) {
					await new Promise(r => setTimeout(r, 2000));
				} else {
					error = 'Il pagamento sembra non essere stato completato. Ricarica la pagina o contatta il supporto.';
				}
			}
		}
		verifying = false;
		loadData();
	}

	async function loadData() {
		loading = true;
		error = '';
		try {
			const [creditsData, plansData, subData, txData] = await Promise.all([
				apiFetch<any>('/api/credits'),
				apiFetch<any>('/api/plans'),
				apiFetch<any>('/api/stripe/subscription'),
				apiFetch<any>('/api/credits/transactions'),
			]);
			credits = creditsData;
			plans = plansData.plans || [];
			topups = plansData.topups || [];
			subscription = subData;
			transactions = txData;
		} catch (e) {
			error = e instanceof Error ? e.message : 'Errore nel caricamento dei dati.';
		} finally {
			loading = false;
		}
	}

	async function createCheckout(planId?: string, topupId?: string) {
		checkoutLoading = true;
		error = '';
		try {
			const data = await apiFetch<{ url: string }>('/api/stripe/create-checkout', {
				method: 'POST',
				body: JSON.stringify({ plan_id: planId, topup_id: topupId }),
			});
			window.location.href = data.url;
		} catch (e) {
			error = e instanceof Error ? e.message : 'Errore durante la creazione del checkout.';
		} finally {
			checkoutLoading = false;
		}
	}

	async function openBillingPortal() {
		try {
			const data = await apiFetch<{ url: string }>('/api/stripe/portal');
			window.location.href = data.url;
		} catch (e) {
			error = e instanceof Error ? e.message : 'Errore.';
		}
	}

	function handleLogout() {
		authLogout();
		goto('/');
	}
</script>

<svelte:head>
	<title>Account - FattureHub</title>
</svelte:head>

<div class="mx-auto max-w-4xl px-6 py-12">
	<div class="mb-8 flex items-center justify-between">
		<div>
			<h1 class="text-3xl font-bold">Il mio account</h1>
			<p class="text-muted-foreground">{user?.email}</p>
		</div>
		<Button variant="ghost" size="sm" onclick={handleLogout}>
			<LogOut class="mr-1.5 size-4" />
			Esci
		</Button>
	</div>

	{#if verifying}
		<div class="py-12 text-center">
			<Loader class="mx-auto mb-4 size-8 animate-spin text-muted-foreground" />
			<p class="text-muted-foreground">Verifica del pagamento in corso...</p>
		</div>
	{:else if loading}
		<div class="py-24 text-center">
			<Loader class="mx-auto mb-4 size-8 animate-spin text-muted-foreground" />
			<p class="text-muted-foreground">Caricamento in corso...</p>
		</div>
	{:else if error}
		<div class="mb-4 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">{error}</div>
	{:else}

		<!-- Credit Balance -->
		<Card class="mb-6">
			<CardHeader>
				<CardTitle class="flex items-center gap-2">
					<Brain class="size-5" />
					Crediti AI
				</CardTitle>
				<CardDescription>1 credito ≈ 1 milione di token</CardDescription>
			</CardHeader>
			<CardContent>
				<div class="flex items-baseline gap-2">
					<span class="text-4xl font-bold">{credits?.balance ?? 0}</span>
					<span class="text-muted-foreground">crediti disponibili</span>
				</div>
				{#if credits?.subscription_status === 'active'}
					<p class="mt-1 text-sm text-muted-foreground">
						+{credits?.monthly_allowance ?? 0} crediti/mese con il tuo abbonamento
					</p>
				{/if}
			</CardContent>
		</Card>

		<!-- Transaction History -->
		<Card class="mb-6">
			<CardHeader>
				<CardTitle class="flex items-center gap-2">
					<Brain class="size-5" />
					Storico crediti
				</CardTitle>
				<CardDescription>Utilizzo e ricariche dei crediti AI</CardDescription>
			</CardHeader>
			<CardContent>
				{#if transactions.length === 0}
					<p class="text-sm text-muted-foreground">Nessuna transazione.</p>
				{:else}
					<div class="space-y-2">
						{#each transactions as tx}
							<div class="flex items-center justify-between rounded-lg border p-3 text-sm">
								<div class="flex-1">
									<span class="font-medium">{tx.description || tx.type}</span>
									<p class="text-xs text-muted-foreground">
										{new Date(tx.created_at).toLocaleDateString('it-IT', {
											day: '2-digit', month: 'short', year: 'numeric',
											hour: '2-digit', minute: '2-digit'
										})}
									</p>
								</div>
								<span class="font-bold" class:text-green-600={tx.amount > 0} class:text-red-600={tx.amount < 0}>
									{tx.amount > 0 ? '+' : ''}{tx.amount}
								</span>
							</div>
						{/each}
					</div>
				{/if}
			</CardContent>
		</Card>

		<!-- Subscription -->
		<Card class="mb-6">
			<CardHeader>
				<CardTitle class="flex items-center gap-2">
					<Sparkles class="size-5" />
					Abbonamento
				</CardTitle>
				<CardDescription>Gestisci il tuo piano</CardDescription>
			</CardHeader>
			<CardContent>
				{#if subscription?.status === 'active'}
					<div class="flex items-center gap-2">
						<Badge variant="default">Attivo</Badge>
						<span class="text-sm text-muted-foreground">Il tuo abbonamento è attivo</span>
					</div>
				{:else if subscription?.status === 'canceled'}
					<div class="flex items-center gap-2">
						<Badge variant="outline">Cancellato</Badge>
						<span class="text-sm text-muted-foreground">Abbonamento terminato</span>
					</div>
				{:else}
					<p class="text-sm text-muted-foreground">Nessun abbonamento attivo. Scegli un piano per attivare i crediti AI mensili e il sync cloud.</p>
				{/if}
			</CardContent>
			<CardFooter class="flex gap-3">
				{#if subscription?.status === 'active'}
					<Button variant="outline" onclick={openBillingPortal}>
						<ExternalLink class="mr-1.5 size-4" />
						Gestisci abbonamento
					</Button>
				{/if}
			</CardFooter>
		</Card>

		<!-- Plans -->
		{#if plans.length > 0 && subscription?.status !== 'active'}
			<Card class="mb-6">
				<CardHeader>
					<CardTitle>Scegli un piano</CardTitle>
					<CardDescription>Crediti AI mensili + sync cloud</CardDescription>
				</CardHeader>
				<CardContent class="pb-6">
					<div class="grid gap-4 sm:grid-cols-3">
						{#each plans as plan}
							<Card class={plan.id === 'plan_1' ? 'border-primary' : ''}>
								<CardHeader class="pb-3">
									<CardTitle class="text-base">{plan.name ?? `${plan.monthly_credits} crediti/mese`}</CardTitle>
									{#if plan.price > 0}
										<p class="text-2xl font-bold">
											€{plan.price / 100}
											<span class="text-sm font-normal text-muted-foreground">/mese</span>
										</p>
									{/if}
								</CardHeader>
								<CardContent class="pb-3">
									<p class="text-sm text-muted-foreground">{plan.monthly_credits} crediti AI/mese</p>
									{#if plan.file_backup}
										<p class="mt-1 text-xs text-muted-foreground">✓ Backup file incluso</p>
									{/if}
								</CardContent>
								<CardFooter>
									<Button
										class="w-full"
										variant={plan.id === 'plan_1' ? 'default' : 'outline'}
										disabled={checkoutLoading}
										onclick={() => createCheckout(plan.id)}
									>
										{checkoutLoading ? 'Reindirizzamento...' : 'Scegli'}
									</Button>
								</CardFooter>
							</Card>
						{/each}
					</div>
				</CardContent>
			</Card>
		{/if}

		<!-- Top-ups -->
		{#if topups.length > 0}
			<Card class="mb-6">
				<CardHeader>
					<CardTitle class="flex items-center gap-2">
						<CreditCard class="size-5" />
						Acquista crediti aggiuntivi
					</CardTitle>
					<CardDescription>Ricaricamento una tantum, non scadono mai</CardDescription>
				</CardHeader>
				<CardContent class="pb-6">
					<div class="grid gap-4 sm:grid-cols-3">
						{#each topups as topup}
							<Card>
								<CardHeader class="pb-3">
									<CardTitle class="text-base">{topup.credits} crediti</CardTitle>
									{#if topup.price > 0}
										<p class="text-2xl font-bold">€{topup.price / 100}</p>
									{/if}
								</CardHeader>
								<CardFooter>
									<Button
										class="w-full"
										variant="outline"
										disabled={checkoutLoading}
										onclick={() => createCheckout(undefined, topup.id)}
									>
										{checkoutLoading ? 'Reindirizzamento...' : 'Acquista'}
									</Button>
								</CardFooter>
							</Card>
						{/each}
					</div>
				</CardContent>
			</Card>
		{/if}

	{/if}
</div>
