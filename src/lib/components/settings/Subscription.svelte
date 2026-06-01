<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { Sparkles, ExternalLink } from 'lucide-svelte';

	let {
		subscription,
		openBillingPortal,
	}: {
		subscription: { status: string } | null;
		openBillingPortal: () => void;
	} = $props();
</script>

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
