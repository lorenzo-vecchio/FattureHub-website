<div class="aspect-video bg-card flex items-center justify-center overflow-hidden">
	<svg viewBox="0 0 200 130" class="size-full p-4 text-muted-foreground" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
		<!-- Folder (back) -->
		<path d="M18 44 L18 38 a4 3 0 0 1 4 -3 h20 l6 6 h30 a4 3 0 0 1 4 3 v0" class="text-muted-foreground/30" stroke-width="1.5"/>

		<!-- Folder (front) -->
		<path d="M14 47 L14 40 a4 3 0 0 1 4 -3 h22 l6 6 h34 a4 3 0 0 1 4 3 v6 a4 3 0 0 1 -4 3 H18 a4 3 0 0 1 -4 -3 z" class="text-primary/40" stroke-width="1.5">
			<animate attributeName="opacity" values="0.4;0.6;0.4" dur="3s" repeatCount="indefinite" />
		</path>

		<!-- Document 1 -->
		<g class="text-primary/70">
			<rect x="42" y="52" width="50" height="38" rx="3" stroke-width="1.5" />
			<rect x="52" y="60" width="30" height="2.5" rx="1" class="text-primary/40" />
			<rect x="52" y="66" width="22" height="2.5" rx="1" class="text-primary/40" />
			<rect x="52" y="72" width="26" height="2.5" rx="1" class="text-primary/40" />
			<rect x="52" y="78" width="18" height="2.5" rx="1" class="text-primary/40" />
			<!-- Corner fold -->
			<path d="M80 52 v8 a4 4 0 0 0 4 4 h8" stroke-width="1" />
		</g>

		<!-- Document 2 (stacked, offset) -->
		<g class="text-primary/50">
			<rect x="56" y="58" width="50" height="38" rx="3" stroke-width="1.5" />
			<rect x="66" y="66" width="30" height="2.5" rx="1" class="text-primary/30" />
			<rect x="66" y="72" width="22" height="2.5" rx="1" class="text-primary/30" />
			<rect x="66" y="78" width="26" height="2.5" rx="1" class="text-primary/30" />
			<path d="M94 58 v8 a4 4 0 0 0 4 4 h8" stroke-width="1" />
		</g>

		<!-- Document 3 (stacked, offset) -->
		<g class="text-primary/30">
			<rect x="70" y="64" width="50" height="38" rx="3" stroke-width="1.5" />
			<rect x="80" y="72" width="30" height="2.5" rx="1" />
			<rect x="80" y="78" width="22" height="2.5" rx="1" />
			<rect x="80" y="84" width="26" height="2.5" rx="1" />
			<path d="M108 64 v8 a4 4 0 0 0 4 4 h8" stroke-width="1" />
		</g>

		<!-- Save icon (floppy disk) in bottom-right -->
		<g class="text-primary" stroke-width="1.5">
			<rect x="150" y="82" width="28" height="32" rx="3" />
			<rect x="158" y="102" width="12" height="12" rx="1.5" class="text-muted-foreground" />
			<rect x="156" y="84" width="12" height="8" rx="1.5" />
			<rect x="169" y="84" width="6" height="6" rx="1" />
		</g>

		<!-- Arrow pointing to save -->
		<g class="text-primary/60">
			<path d="M132 98 h14" stroke-dasharray="3 3">
				<animate attributeName="stroke-dashoffset" from="0" to="-12" dur="1.2s" repeatCount="indefinite" />
			</path>
			<polygon points="148,98 143,94 143,102" fill="currentColor" stroke="none" />
		</g>
	</svg>
</div>
