<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import { apiFetch, isLoggedIn, logout as authLogout, getUser } from '$lib/auth';
	import { onMount } from 'svelte';
	import { LogOut, Loader } from 'lucide-svelte';
	import CreditBalance from '$lib/components/settings/CreditBalance.svelte';
	import TransactionHistory from '$lib/components/settings/TransactionHistory.svelte';
	import Subscription from '$lib/components/settings/Subscription.svelte';
	import Plans from '$lib/components/settings/Plans.svelte';
	import Topups from '$lib/components/settings/Topups.svelte';

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
				if (redirectIfUnauthenticated()) return;
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
			if (redirectIfUnauthenticated()) return;
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
			if (redirectIfUnauthenticated()) return;
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
			if (redirectIfUnauthenticated()) return;
			error = e instanceof Error ? e.message : 'Errore.';
		}
	}

	function redirectIfUnauthenticated() {
		if (!isLoggedIn()) {
			goto('/login');
			return true;
		}
		return false;
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

		<CreditBalance {credits} />
		<TransactionHistory {transactions} />
		<Subscription {subscription} {openBillingPortal} />
		<Plans {plans} {subscription} {checkoutLoading} {createCheckout} />
		<Topups {topups} {checkoutLoading} {createCheckout} />

	{/if}
</div>
