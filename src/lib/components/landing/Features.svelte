<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import { Tabs, TabsList, TabsTrigger, TabsContent } from '$lib/components/ui/tabs';
	import { Card, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
	import {
		Upload, Bot, FileText, FolderKanban, Shield,
		Search, Download, Sparkles, BarChart3, Database
	} from 'lucide-svelte';

	const images = import.meta.glob('/src/assets/app-*.png', { eager: true, query: '?url', import: 'default' }) as Record<string, string>;

	function imgSrc(base: string) {
		return images[`/src/assets/${base}.png`] ?? '';
	}

	// Observe the <html> class directly — the inline script sets it before Svelte hydrates.
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

	type Feature = {
		icon: any;
		title: string;
		description: string;
		badge?: string;
	};

	const caricoFeatures: Feature[] = [
		{ icon: Upload, title: 'Importazione Batch', description: 'Trascina e rilascia centinaia di file XML/P7M. Supporto ZIP e caricamento cartelle intere.' },
		{ icon: FolderKanban, title: 'Gestione Progetti', description: 'Salva e riapri le tue sessioni. Ogni progetto mantiene filtri, fatture importate e cronologia AI.', badge: 'Nuovo' },
		{ icon: Database, title: 'Database Locale', description: 'I dati rimangono sul tuo computer. Database SQLite embedded, nessun server esterno.' },
	];

	const aiFeatures: Feature[] = [
		{ icon: Bot, title: 'Analisi in Linguaggio Naturale', description: 'Chiedi "quanto ho speso a gennaio?" o "mostrami le fatture più care" — l\'AI capisce il contesto.' },
		{ icon: Sparkles, title: 'Multi-Provider', description: 'OpenAI, Claude, DeepSeek, Ollama (locale). Scegli il tuo provider o usa AI completamente offline.', badge: 'Ollama' },
		{ icon: Search, title: 'Filtri Avanzati', description: 'Filtra per data, fornitore, cliente, importo, tipo documento. Risultati in tempo reale mentre scrivi.' },
	];

	const exportFeatures: Feature[] = [
		{ icon: BarChart3, title: 'Report Automatici', description: 'Genera report in DOCX con statistiche, riepiloghi e grafici. Pronti per la contabilità o il commercialista.' },
		{ icon: Download, title: 'Esportazione DOCX', description: 'Esporta fatture selezionate o interi progetti in formato DOCX. Template pulito e professionale.' },
		{ icon: Shield, title: '100% Privacy', description: 'AI opzionale con la tua chiave API. Open source (MIT), auto-hostabile. Zero dati inviati a server esterni senza il tuo consenso.', badge: 'GDPR' },
	];

	let activeTab = $state('carico');

	const appScreenshot = $derived(
		activeTab === 'carico' ? imgSrc(`app-home-${variant}`) :
		activeTab === 'ai' ? imgSrc(`app-ai-${variant}`) :
		imgSrc(`app-report-${variant}`)
	);
</script>

<section id="features" class="border-b py-24">
	<div class="mx-auto max-w-7xl px-6">
		<div class="mx-auto max-w-2xl text-center">
			<h2 class="text-3xl font-bold tracking-tight">Tutto ciò che ti serve</h2>
			<p class="mt-2 text-muted-foreground">Un unico posto per gestire, analizzare ed esportare le tue fatture.</p>
		</div>

		<div class="mt-16">
			<Tabs bind:value={activeTab}>
				<div class="flex justify-center mb-10 overflow-x-auto pb-2">
					<TabsList>
						<TabsTrigger value="carico" class="whitespace-nowrap">
							<Upload class="size-4 shrink-0" />
							Caricamento & Gestione
						</TabsTrigger>
						<TabsTrigger value="ai" class="whitespace-nowrap">
							<Bot class="size-4 shrink-0" />
							AI & Analisi
						</TabsTrigger>
						<TabsTrigger value="export" class="whitespace-nowrap">
							<Download class="size-4 shrink-0" />
							Report & Privacy
						</TabsTrigger>
					</TabsList>
				</div>

				{#each [ { key: 'carico', features: caricoFeatures }, { key: 'ai', features: aiFeatures }, { key: 'export', features: exportFeatures } ] as tab}
					<TabsContent value={tab.key}>
						<div class="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
							{#each tab.features as feature}
								<Card class="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
									<CardHeader>
										<div class="flex items-start gap-3">
											<div class="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
												<feature.icon class="size-5 text-primary" />
											</div>
											<div class="min-w-0">
												<div class="flex flex-wrap items-center gap-2">
													<CardTitle class="text-base">{feature.title}</CardTitle>
													{#if feature.badge}
														<Badge variant="secondary" class="text-[10px] px-1.5 py-0">{feature.badge}</Badge>
													{/if}
												</div>
												<CardDescription class="mt-1.5 text-sm">{feature.description}</CardDescription>
											</div>
										</div>
									</CardHeader>
								</Card>
							{/each}
						</div>
					</TabsContent>
				{/each}
			</Tabs>
		</div>

		<!-- App preview -->
		<div class="mt-16 rounded-xl border bg-card overflow-hidden shadow-sm">
			<img
				src={appScreenshot}
				alt="Anteprima app FattureHub"
				class="w-full h-auto"
			/>
		</div>
	</div>
</section>
