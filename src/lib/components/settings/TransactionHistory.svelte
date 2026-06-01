<script lang="ts">
	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { Brain } from 'lucide-svelte';

	let { transactions }: { transactions: { id: string; amount: number; type: string; description: string; created_at: string }[] } = $props();
</script>

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
