<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { CreditCard } from 'lucide-svelte';

	let {
		topups,
		checkoutLoading,
		createCheckout,
	}: {
		topups: { id: string; name: string; price_id: string; price: number; credits: number }[];
		checkoutLoading: boolean;
		createCheckout: (planId?: string, topupId?: string) => void;
	} = $props();
</script>

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
