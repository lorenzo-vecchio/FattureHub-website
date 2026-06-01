<script lang="ts">
	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { Brain } from 'lucide-svelte';

	let { credits }: { credits: { balance: number; monthly_allowance: number; subscription_status: string } | null } = $props();
</script>

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
