<script lang="ts">
	const images = import.meta.glob('/src/assets/*.png', { eager: true, query: '?url', import: 'default' }) as Record<string, string>;

	function imgSrc(base: string, variant: 'light' | 'dark') {
		return images[`/src/assets/${base}-${variant}.png`] ?? '';
	}
</script>

<section class="border-b py-24">
	<div class="mx-auto max-w-7xl px-6">
		<div class="mx-auto max-w-2xl text-center">
			<h2 class="text-3xl font-bold tracking-tight">Come Funziona</h2>
			<p class="mt-2 text-muted-foreground">In tre semplici passi.</p>
		</div>

		<div class="mt-16 grid gap-8 md:grid-cols-3">
			<div class="text-center">
				<div class="mx-auto flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground text-lg font-bold">1</div>
				<h3 class="mt-4 font-semibold">Carica le tue fatture</h3>
				<p class="mt-2 text-sm text-muted-foreground">Trascina i file XML o P7M nell'app. Supportiamo import batch e ZIP.</p>
				<div class="mt-4 aspect-video rounded-lg bg-card flex items-center justify-center overflow-hidden">
					<img src={imgSrc('how-upload', 'light')} alt="Upload fatture" class="size-full object-contain dark:hidden" />
					<img src={imgSrc('how-upload', 'dark')} alt="Upload fatture" class="size-full object-contain hidden dark:block" />
				</div>
			</div>

			<div class="text-center">
				<div class="mx-auto flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground text-lg font-bold">2</div>
				<h3 class="mt-4 font-semibold">Analizza e filtra</h3>
				<p class="mt-2 text-sm text-muted-foreground">Usa i filtri avanzati o l'AI per analizzare, riassumere e ottenere insight sulle tue fatture.</p>
				<div class="mt-4 aspect-video rounded-lg bg-card flex items-center justify-center overflow-hidden">
					<img src={imgSrc('how-filters', 'light')} alt="Analisi e filtri" class="size-full object-contain dark:hidden" />
					<img src={imgSrc('how-filters', 'dark')} alt="Analisi e filtri" class="size-full object-contain hidden dark:block" />
				</div>
			</div>

			<div class="text-center">
				<div class="mx-auto flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground text-lg font-bold">3</div>
				<h3 class="mt-4 font-semibold">Esporta e sincronizza</h3>
				<p class="mt-2 text-sm text-muted-foreground">Esporta in DOCX, salva i progetti nel cloud e sincronizza su tutti i tuoi dispositivi.</p>
				<div class="mt-4 aspect-video rounded-lg bg-card flex items-center justify-center overflow-hidden">
					<img src={imgSrc('AI-response', 'light')} alt="Esportazione e sync" class="size-full object-contain dark:hidden" />
					<img src={imgSrc('AI-response', 'dark')} alt="Esportazione e sync" class="size-full object-contain hidden dark:block" />
				</div>
			</div>
		</div>
	</div>
</section>
