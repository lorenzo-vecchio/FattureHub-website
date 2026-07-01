<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { Card, CardContent } from '$lib/components/ui/card';
	import { Download, Github, ArrowRight, CheckCircle, Cpu, FileText } from 'lucide-svelte';
</script>

<section class="py-24">
	<div class="mx-auto max-w-7xl px-6">
		<div class="mx-auto max-w-4xl">
			<div class="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-primary/5 via-primary/[0.02] to-transparent p-10 sm:p-16">
				<!-- Decorative elements -->
				<div class="absolute -top-20 -right-20 size-60 rounded-full bg-primary/5 blur-3xl" aria-hidden="true"></div>
				<div class="absolute -bottom-10 -left-10 size-40 rounded-full bg-primary/5 blur-3xl" aria-hidden="true"></div>

				<div class="relative">
					<div class="text-center">
						<h2 class="text-3xl font-bold tracking-tight sm:text-4xl">
							Pronto a semplificare le tue fatture?
						</h2>
						<p class="mt-4 text-muted-foreground max-w-xl mx-auto">
							Scarica l'app gratuitamente, nessuna registrazione richiesta.
							Funziona subito, offline, sul tuo computer.
						</p>
					</div>

					<!-- Value props -->
					<div class="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3 max-w-xl mx-auto">
						<div class="flex items-center gap-2 text-sm text-muted-foreground">
							<CheckCircle class="size-4 text-primary shrink-0" />
							<span>Nessun account richiesto</span>
						</div>
						<div class="flex items-center gap-2 text-sm text-muted-foreground">
							<Cpu class="size-4 text-primary shrink-0" />
							<span>AI locale senza canone</span>
						</div>
						<div class="flex items-center gap-2 text-sm text-muted-foreground">
							<FileText class="size-4 text-primary shrink-0" />
							<span>Report DOCX gratuiti</span>
						</div>
					</div>

					<div class="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
						<a href="/download">
							<Button size="lg" class="gap-2 w-full sm:w-auto">
								<Download class="size-4" />
								Scarica l'App
							</Button>
						</a>
						<a href="https://github.com/lorenzo-vecchio/FattureHub" rel="external" target="_blank">
							<Button variant="outline" size="lg" class="gap-2 w-full sm:w-auto">
								<Github class="size-4" />
								Vedi su GitHub
								<ArrowRight class="size-3.5" />
							</Button>
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
