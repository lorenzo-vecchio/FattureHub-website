<div class="aspect-video bg-muted flex items-center justify-center border-b overflow-hidden">
	<svg viewBox="0 0 200 120" class="size-full p-4 text-muted-foreground" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
		<!-- Desktop -->
		<g class="animate-bounce" style="animation-delay: 0s; animation-duration: 3s;">
			<rect x="20" y="40" width="32" height="22" rx="2" class="text-primary/70" />
			<rect x="26" y="62" width="20" height="2" class="text-primary/70" />
			<line x1="36" y1="64" x2="36" y2="68" class="text-primary/70" />
		</g>

		<!-- Tablet -->
		<g class="animate-bounce" style="animation-delay: 0.5s; animation-duration: 3s;">
			<rect x="84" y="30" width="32" height="42" rx="3" class="text-primary/60" />
			<circle cx="100" cy="64" r="1.5" class="text-primary/60" />
		</g>

		<!-- Phone -->
		<g class="animate-bounce" style="animation-delay: 1s; animation-duration: 3s;">
			<rect x="148" y="40" width="30" height="50" rx="4" class="text-primary/70" />
			<rect x="160" y="82" width="6" height="2" rx="1" class="text-primary/70" />
		</g>

		<!-- Cloud -->
		<g class="animate-pulse" style="animation-duration: 2.5s;">
			<path d="M100 55 a10 8 0 0 1 10 -8 a12 10 0 0 1 22 0 a8 6 0 0 1 8 6 a8 7 0 0 1 -8 7 H68 a10 8 0 0 1 -10 -8 a10 8 0 0 1 10 -8 a8 6 0 0 1 16 0 a10 8 0 0 1 16 3" class="text-primary/40" />
		</g>

		<!-- Connection lines with animated dashes -->
		<g>
			<line x1="52" y1="55" x2="84" y2="55" class="text-primary/30" stroke-dasharray="4 3">
				<animate attributeName="stroke-dashoffset" from="0" to="14" dur="1.5s" repeatCount="indefinite" />
			</line>
			<line x1="116" y1="55" x2="148" y2="55" class="text-primary/30" stroke-dasharray="4 3">
				<animate attributeName="stroke-dashoffset" from="0" to="14" dur="1.5s" repeatCount="indefinite" />
			</line>
		</g>

		<!-- Data dots moving along lines -->
		<circle r="2" class="text-primary" fill="currentColor">
			<animateMotion dur="2s" repeatCount="indefinite" path="M52,55 L84,55" />
		</circle>
		<circle r="2" class="text-primary" fill="currentColor">
			<animateMotion dur="2s" repeatCount="indefinite" path="M116,55 L148,55" begin="1s" />
		</circle>
	</svg>
</div>

<style>
	@keyframes bounce {
		0%, 100% { transform: translateY(0); }
		50% { transform: translateY(-4px); }
	}
	.animate-bounce {
		animation: bounce var(--tw-duration, 3s) ease-in-out infinite;
	}
</style>
