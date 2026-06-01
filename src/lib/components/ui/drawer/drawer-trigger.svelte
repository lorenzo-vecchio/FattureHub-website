<script lang="ts">
	import { Drawer as DrawerPrimitive } from "vaul-svelte";
	import type { Snippet } from "svelte";

	let { ref = $bindable(null), children, ...restProps }: DrawerPrimitive.TriggerProps & { children?: Snippet } = $props();
</script>

<DrawerPrimitive.Trigger bind:ref data-slot="drawer-trigger" {...restProps}>
	{@render children?.()}
</DrawerPrimitive.Trigger>
