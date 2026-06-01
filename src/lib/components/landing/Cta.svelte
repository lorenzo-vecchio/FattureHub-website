<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { ArrowRight, Download } from 'lucide-svelte';
</script>

<section class="py-24">
	<div class="mx-auto max-w-7xl px-6">
		<div class="mx-auto max-w-2xl text-center">
			<h2 class="text-3xl font-bold tracking-tight">Pronto a semplificare le tue fatture?</h2>
			<p class="mt-2 text-muted-foreground">Scarica l'app gratuitamente o registrati per attivare la sincronizzazione cloud e l'AI backend.</p>
			<div class="mt-10 flex items-center justify-center gap-4">
				<a href="/register">
					<Button size="lg" class="gap-2">
						Crea Account Gratuito
						<ArrowRight class="size-4" />
					</Button>
				</a>
				<a href="https://github.com/lorenzo-vecchio/filtra-fatture" target="_blank" rel="noopener">
					<Button variant="outline" size="lg">
						<Download class="mr-2 size-4" />
						Scarica App
					</Button>
				</a>
			</div>
		</div>
	</div>
</section>
