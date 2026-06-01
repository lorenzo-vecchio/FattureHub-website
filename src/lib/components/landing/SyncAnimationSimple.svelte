<div class="aspect-video bg-card flex items-center justify-center overflow-hidden">
	<svg viewBox="0 0 200 130" class="size-full p-3 text-muted-foreground" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
		<!-- Background clouds -->
		<g class="text-muted-foreground/8" stroke-width="1.5">
			<path d="M30 105 a12 9 0 0 1 12 -9 a14 12 0 0 1 26 0 a10 7 0 0 1 10 7 a10 8 0 0 1 -10 8 H22 a12 9 0 0 1 -12 -9 a12 9 0 0 1 12 -9 a10 7 0 0 1 20 0" />
			<path d="M150 20 a10 8 0 0 1 10 -8 a12 10 0 0 1 22 0 a8 6 0 0 1 8 6 a8 7 0 0 1 -8 7 H144 a10 8 0 0 1 -10 -8 a10 8 0 0 1 10 -8 a8 6 0 0 1 16 0" />
		</g>

		<!-- Server (center) -->
		<g class="animate-pulse" style="animation-duration: 2.5s;">
			<rect x="80" y="50" width="40" height="28" rx="4" class="text-primary" stroke-width="2" />
			<rect x="88" y="56" width="8" height="3" rx="1" class="text-primary/60" />
			<rect x="96" y="56" width="8" height="3" rx="1" class="text-primary/60" />
			<rect x="104" y="56" width="8" height="3" rx="1" class="text-primary/60" />
			<rect x="88" y="63" width="8" height="3" rx="1" class="text-primary/60" />
			<rect x="96" y="63" width="8" height="3" rx="1" class="text-primary/60" />
			<rect x="104" y="63" width="8" height="3" rx="1" class="text-primary/60" />
			<rect x="88" y="70" width="8" height="3" rx="1" class="text-primary/60" />
			<rect x="96" y="70" width="8" height="3" rx="1" class="text-primary/60" />
			<rect x="104" y="70" width="8" height="3" rx="1" class="text-primary/60" />
		</g>

		<!-- Desktop (top-left) -->
		<g class="device-float" style="animation-delay: 0s;">
			<rect x="12" y="20" width="30" height="20" rx="2" class="text-primary/70" />
			<rect x="16" y="40" width="22" height="2" class="text-primary/70" />
			<line x1="27" y1="42" x2="27" y2="46" class="text-primary/70" />
		</g>

		<!-- Laptop (top-right) -->
		<g class="device-float" style="animation-delay: 0.4s;">
			<rect x="155" y="18" width="28" height="18" rx="2" class="text-primary/70" />
			<rect x="153" y="36" width="32" height="3" rx="1" class="text-primary/70" />
		</g>

		<!-- Tablet (bottom-left) -->
		<g class="device-float" style="animation-delay: 0.8s;">
			<rect x="20" y="85" width="26" height="34" rx="3" class="text-primary/70" />
			<rect x="30" y="113" width="6" height="2" rx="1" class="text-primary/70" />
		</g>

		<!-- Phone (bottom-right) -->
		<g class="device-float" style="animation-delay: 1.2s;">
			<rect x="157" y="88" width="24" height="36" rx="4" class="text-primary/70" />
			<rect x="166" y="118" width="6" height="2" rx="1" class="text-primary/70" />
		</g>

		<!-- Connection lines from server to devices -->
		<g stroke-width="1">
			<line x1="80" y1="56" x2="42" y2="38" class="text-primary/30" stroke-dasharray="3 3">
				<animate attributeName="stroke-dashoffset" from="0" to="12" dur="1.2s" repeatCount="indefinite" />
			</line>
			<line x1="120" y1="54" x2="155" y2="36" class="text-primary/30" stroke-dasharray="3 3">
				<animate attributeName="stroke-dashoffset" from="0" to="12" dur="1.2s" repeatCount="indefinite" />
			</line>
			<line x1="84" y1="78" x2="46" y2="102" class="text-primary/30" stroke-dasharray="3 3">
				<animate attributeName="stroke-dashoffset" from="0" to="12" dur="1.2s" repeatCount="indefinite" />
			</line>
			<line x1="116" y1="78" x2="157" y2="105" class="text-primary/30" stroke-dasharray="3 3">
				<animate attributeName="stroke-dashoffset" from="0" to="12" dur="1.2s" repeatCount="indefinite" />
			</line>
		</g>

		<!-- Data dots (server ↔ device, ping-pong) -->
		<circle r="2.5" class="text-primary" fill="currentColor">
			<animateMotion dur="4s" repeatCount="indefinite" path="M80,56 L42,38 L80,56" />
		</circle>
		<circle r="2.5" class="text-primary" fill="currentColor">
			<animateMotion dur="4s" repeatCount="indefinite" path="M120,54 L155,36 L120,54" begin="2s" />
		</circle>
		<circle r="2.5" class="text-primary" fill="currentColor">
			<animateMotion dur="4s" repeatCount="indefinite" path="M84,78 L46,102 L84,78" begin="1s" />
		</circle>
		<circle r="2.5" class="text-primary" fill="currentColor">
			<animateMotion dur="4s" repeatCount="indefinite" path="M116,78 L157,105 L116,78" begin="3s" />
		</circle>
	</svg>
</div>

<style>
	@keyframes float {
		0%, 100% { transform: translateY(0); }
		50% { transform: translateY(-3px); }
	}
	.device-float {
		animation: float 2.5s ease-in-out infinite;
	}
</style>
