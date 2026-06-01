<script lang="ts">
	import { onMount } from 'svelte';
	import { mode } from 'mode-watcher';
	import * as THREE from 'three';

	let canvas: HTMLCanvasElement;
	let scene: THREE.Scene | null = null;
	let camera: THREE.PerspectiveCamera | null = null;
	let renderer: THREE.WebGLRenderer | null = null;
	let animationId: number | null = null;
	let isVisible = $state(false);

	onMount(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					if (!scene) initScene();
					isVisible = true;
					animate();
				} else {
					isVisible = false;
				}
			},
			{ threshold: 0.1 }
		);
		observer.observe(canvas);
		return () => {
			observer.disconnect();
			cleanup();
		};
	});

	function initScene() {
		const rect = canvas.parentElement!.getBoundingClientRect();
		const width = rect.width;
		const height = rect.height;

		scene = new THREE.Scene();
		camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
		camera.position.set(0, 0, 5);

		renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
		renderer.setSize(width, height);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

		const isDark = mode.current === 'dark';
		const primaryColor = new THREE.Color(isDark ? '#94a3b8' : '#475569');
		const accentColor = new THREE.Color(isDark ? '#818cf8' : '#6366f1');

		// Shield shape (simplified as a stylish geometric form)
		const shieldGroup = new THREE.Group();

		// Main torus ring (protective feel)
		const torusGeo = new THREE.TorusGeometry(1.2, 0.08, 16, 48);
		const torusMat = new THREE.MeshPhysicalMaterial({
			color: accentColor,
			metalness: 0.3,
			roughness: 0.4,
			transparent: true,
			opacity: 0.8,
		});
		const torus = new THREE.Mesh(torusGeo, torusMat);
		torus.rotation.x = Math.PI / 2;
		shieldGroup.add(torus);

		// Inner ring
		const innerRingGeo = new THREE.TorusGeometry(0.85, 0.05, 12, 36);
		const innerRingMat = new THREE.MeshPhysicalMaterial({
			color: primaryColor,
			metalness: 0.2,
			roughness: 0.5,
			transparent: true,
			opacity: 0.6,
		});
		const innerRing = new THREE.Mesh(innerRingGeo, innerRingMat);
		innerRing.rotation.x = Math.PI / 2;
		innerRing.rotation.y = 0.3;
		shieldGroup.add(innerRing);

		// Central hexagon (shield-like)
		const hexGeo = new THREE.CylinderGeometry(0.7, 0.7, 0.05, 6);
		const hexMat = new THREE.MeshPhysicalMaterial({
			color: accentColor,
			metalness: 0.5,
			roughness: 0.3,
			transparent: true,
			opacity: 0.3,
			wireframe: true,
		});
		const hex = new THREE.Mesh(hexGeo, hexMat);
		hex.rotation.x = Math.PI / 2;
		shieldGroup.add(hex);

		scene.add(shieldGroup);

		// Particles
		const particleCount = 200;
		const particleGeo = new THREE.BufferGeometry();
		const positions = new Float32Array(particleCount * 3);
		const particleColors = new Float32Array(particleCount * 3);

		for (let i = 0; i < particleCount; i++) {
			const theta = Math.random() * Math.PI * 2;
			const phi = Math.acos(2 * Math.random() - 1);
			const r = 1.8 + Math.random() * 1.2;
			positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
			positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
			positions[i * 3 + 2] = r * Math.cos(phi);

			const c = primaryColor.clone().lerp(accentColor, Math.random());
			particleColors[i * 3] = c.r;
			particleColors[i * 3 + 1] = c.g;
			particleColors[i * 3 + 2] = c.b;
		}

		particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
		particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

		const particleMat = new THREE.PointsMaterial({
			size: 0.04,
			transparent: true,
			opacity: 0.6,
			vertexColors: true,
		});
		const particles = new THREE.Points(particleGeo, particleMat);
		shieldGroup.add(particles);

		// Store for animation
		(shieldGroup as any).__particles = particles;
		(shieldGroup as any).__torus = torus;
		(shieldGroup as any).__innerRing = innerRing;

		scene.add(new THREE.AmbientLight(0xffffff, 0.5));
	}

	function animate() {
		if (!scene || !renderer || !camera || !isVisible) return;

		const shieldGroup = scene.children.find(c => c instanceof THREE.Group) as THREE.Group | undefined;
		if (shieldGroup) {
			shieldGroup.rotation.y += 0.005;
			shieldGroup.rotation.z = Math.sin(Date.now() * 0.0005) * 0.05;
		}

		renderer.render(scene, camera);
		animationId = requestAnimationFrame(animate);
	}

	function cleanup() {
		if (animationId) cancelAnimationFrame(animationId);
		if (renderer) {
			renderer.dispose();
			renderer = null;
		}
		scene = null;
		camera = null;
	}
</script>

<div class="aspect-video bg-muted flex items-center justify-center border-b relative overflow-hidden">
	<canvas bind:this={canvas} class="absolute inset-0 size-full"></canvas>
</div>
