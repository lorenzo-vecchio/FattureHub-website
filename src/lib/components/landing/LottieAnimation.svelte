<script lang="ts">
	import { onMount } from 'svelte';
	import { DotLottieSvelte, setWasmUrl } from '@lottiefiles/dotlottie-svelte';

	const lottieFiles = import.meta.glob('/src/assets/*.lottie', { eager: true, query: '?url', import: 'default' }) as Record<string, string>;

	onMount(() => {
		setWasmUrl('/dotlottie-player.wasm');
	});
</script>

<div class="aspect-video bg-card flex items-center justify-center overflow-hidden">
	<div class="size-full">
		<DotLottieSvelte
			src={lottieFiles['/src/assets/shield.lottie'] ?? ''}
			autoplay
			loop
		/>
	</div>
</div>
