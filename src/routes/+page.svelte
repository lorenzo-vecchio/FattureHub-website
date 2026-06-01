<script lang="ts">
	import Hero from '$lib/components/landing/Hero.svelte';
	import Features from '$lib/components/landing/Features.svelte';
	import HowItWorks from '$lib/components/landing/HowItWorks.svelte';
	import Pricing from '$lib/components/landing/Pricing.svelte';
	import Cta from '$lib/components/landing/Cta.svelte';
</script>

<svelte:head>
	<title>FattureHub - Analisi Fatture con AI</title>
	<meta name="description" content="Gestisci, filtra e analizza le tue fatture con l'aiuto dell'intelligenza artificiale. Disponibile come app desktop e web." />
</svelte:head>

<Hero />
<Features />
<HowItWorks />
<Pricing />
<Cta />
