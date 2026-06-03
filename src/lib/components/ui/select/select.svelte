<script lang="ts">
	import { Select as SelectPrimitive } from "bits-ui";

	let {
		open = $bindable(false),
		value = $bindable(),
		type = "single",
		...restProps
	}: SelectPrimitive.RootProps & { type?: "single" | "multiple" } = $props();
</script>

<SelectPrimitive.Root bind:open bind:value={value as never} {type} {...restProps} />
