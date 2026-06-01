<script lang="ts">
	import { Dialog as DialogPrimitive } from "bits-ui";
	import type { Snippet } from "svelte";

	let {
		ref = $bindable(null),
		type = "button",
		children,
		...restProps
	}: DialogPrimitive.TriggerProps & { children?: Snippet } = $props();
</script>

<DialogPrimitive.Trigger bind:ref data-slot="dialog-trigger" {type} {...restProps}>
	{@render children?.()}
</DialogPrimitive.Trigger>
