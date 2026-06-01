<script lang="ts">
	import { onMount } from 'svelte';
	import { DotLottieSvelte, setWasmUrl } from '@lottiefiles/dotlottie-svelte';
	import wasmUrl from '@lottiefiles/dotlottie-web/dist/dotlottie-player.wasm?url';

	const lottieFiles = import.meta.glob('/src/assets/*.lottie', { eager: true, query: '?url', import: 'default' }) as Record<string, string>;

	onMount(() => {
		setWasmUrl(wasmUrl);
	});
</script>

<div class="aspect-video bg-muted flex items-center justify-center border-b overflow-hidden">
	<div class="size-full">
		<DotLottieSvelte
			src={lottieFiles['/src/assets/shield.lottie'] ?? ''}
			autoplay
			loop
		/>
	</div>
</div>
