<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import { Upload, Search, Download } from 'lucide-svelte';

	const images = import.meta.glob('/src/assets/app-*.png', { eager: true, query: '?url', import: 'default' }) as Record<string, string>;

	function imgSrc(base: string) {
		return images[`/src/assets/${base}.png`] ?? '';
	}

	let isDark = $state(false);

	$effect(() => {
		if (typeof document === 'undefined') return;
		isDark = document.documentElement.classList.contains('dark');
		const observer = new MutationObserver(() => {
			isDark = document.documentElement.classList.contains('dark');
		});
		observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
		return () => observer.disconnect();
	});

	const variant = $derived(isDark ? 'dark' : 'light');

	const steps = [
		{
			step: 1,
			icon: Upload,
			title: 'Carica le tue fatture',
			description: 'Trascina file XML o P7M nell\'app, anche intere cartelle. Supportiamo import batch e centinaia di file in pochi secondi.',
			screenshot: 'app-home',
			badge: 'Batch support'
		},
		{
			step: 2,
			icon: Search,
			title: 'Analizza e filtra',
			description: 'Filtra per data, fornitore o importo. Oppure chiedi all\'AI in linguaggio naturale: risultati in tempo reale.',
			screenshot: 'app-workspace',
			badge: 'AI incluso'
		},
		{
			step: 3,
			icon: Download,
			title: 'Esporta e gestisci',
			description: 'Genera report DOCX dettagliati. Salva i progetti con filtri, cronologia AI e fatture sempre a portata di mano.',
			screenshot: 'app-projects',
			badge: 'Progetti'
		}
	];
</script>

<section id="how-it-works" class="border-b py-24">
	<div class="mx-auto max-w-7xl px-6">
		<div class="mx-auto max-w-2xl text-center">
			<h2 class="text-3xl font-bold tracking-tight">Come Funziona</h2>
			<p class="mt-2 text-muted-foreground">In tre semplici passi. Nessuna configurazione, nessun account.</p>
		</div>

		<div class="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
			{#each steps as s, i}
				<div class="flex flex-col items-center text-center h-full">
					<div class="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground text-lg font-bold shadow-sm shrink-0">
						{s.step}
					</div>

					<div class="mt-4 flex flex-col items-center flex-1 w-full">
						<h3 class="text-lg font-semibold">{s.title}</h3>
						<div class="mt-1">
							<Badge variant="secondary" class="text-xs">{s.badge}</Badge>
						</div>
						<p class="mt-3 text-sm text-muted-foreground leading-relaxed max-w-xs">
							{s.description}
						</p>

						<div class="grow min-h-4"></div>

						<div class="mt-6 w-full">
							<div class="rounded-lg border bg-card overflow-hidden shadow-sm aspect-[4/3]">
								<img
									src={imgSrc(`${s.screenshot}-${variant}`)}
									alt={s.title}
									class="w-full h-full object-cover"
								/>
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
