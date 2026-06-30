<script lang="ts">
	import Hero from '$lib/components/landing/Hero.svelte';
	import Features from '$lib/components/landing/Features.svelte';
	import HowItWorks from '$lib/components/landing/HowItWorks.svelte';
	import Cta from '$lib/components/landing/Cta.svelte';
</script>

<svelte:head>
	<title>FattureHub - App desktop per analisi fatture elettroniche con AI</title>
	<meta name="description" content="Gestisci, filtra e analizza le tue fatture FatturaPA con l'aiuto dell'intelligenza artificiale. App desktop open source per macOS, Windows e Linux. Tema chiaro e scuro, nessun dato inviato a server esterni." />
	<meta name="keywords" content="fatture, fattura elettronica, fatturaPA, XML, P7M, AI, analisi fatture, open source, desktop, macOS, Windows, Linux" />
	<meta property="og:title" content="FattureHub - Analisi fatture elettroniche con AI" />
	<meta property="og:description" content="App desktop open source per filtrare, analizzare ed esportare fatture FatturaPA con l'AI. macOS, Windows, Linux." />
	<meta property="og:url" content="https://fatturehub.lorenzovecchio.dev/" />
	<meta name="twitter:title" content="FattureHub - Analisi fatture elettroniche con AI" />
	<meta name="twitter:description" content="App desktop open source per filtrare, analizzare ed esportare fatture FatturaPA con l'AI." />
</svelte:head>

<Hero />
<Features />
<HowItWorks />
<Cta />
