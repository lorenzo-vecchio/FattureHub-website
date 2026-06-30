<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Download } from 'lucide-svelte';
</script>

<section class="py-24">
	<div class="mx-auto max-w-7xl px-6">
		<div class="mx-auto max-w-2xl text-center">
			<h2 class="text-3xl font-bold tracking-tight">Pronto a semplificare le tue fatture?</h2>
			<p class="mt-2 text-muted-foreground">Scarica l'app gratuitamente e inizia subito.</p>
			<div class="mt-10 flex items-center justify-center gap-4">
				<a href="/download">
					<Button size="lg" class="gap-2">
						<Download class="mr-2 size-4" />
						Scarica App
					</Button>
				</a>
			</div>
		</div>
	</div>
</section>
