<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '$lib/components/ui/card';

	let {
		plans,
		subscription,
		checkoutLoading,
		createCheckout,
	}: {
		plans: { id: string; name: string; price_id: string; price: number; monthly_credits: number; file_backup: boolean }[];
		subscription: { status: string } | null;
		checkoutLoading: boolean;
		createCheckout: (planId?: string, topupId?: string) => void;
	} = $props();
</script>

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
						<CardContent class="grow pb-3">
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
