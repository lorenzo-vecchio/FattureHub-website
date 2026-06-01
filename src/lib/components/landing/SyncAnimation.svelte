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

		const syncGroup = new THREE.Group();

		// Central hub
		const centerGeo = new THREE.SphereGeometry(0.25, 20, 20);
		const centerMat = new THREE.MeshPhysicalMaterial({
			color: accentColor,
			metalness: 0.3,
			roughness: 0.4,
			emissive: accentColor,
			emissiveIntensity: 0.2,
		});
		const centerSphere = new THREE.Mesh(centerGeo, centerMat);
		syncGroup.add(centerSphere);

		// Orbiting nodes and connections
		const nodeCount = 4;
		const nodes: THREE.Mesh[] = [];
		const lines: THREE.Line[] = [];
		const orbitRadius = 1.6;

		for (let i = 0; i < nodeCount; i++) {
			const angle = (i / nodeCount) * Math.PI * 2;
			const x = Math.cos(angle) * orbitRadius;
			const y = Math.sin(angle) * orbitRadius * 0.6;

			const nodeGeo = new THREE.SphereGeometry(0.08, 12, 12);
			const nodeMat = new THREE.MeshPhysicalMaterial({
				color: primaryColor,
				metalness: 0.2,
				roughness: 0.5,
			});
			const node = new THREE.Mesh(nodeGeo, nodeMat);
			node.position.set(x, y, 0);
			syncGroup.add(node);
			nodes.push(node);

			// Line from center to node
			const lineGeo = new THREE.BufferGeometry().setFromPoints([
				new THREE.Vector3(0, 0, 0),
				new THREE.Vector3(x, y, 0),
			]);
			const lineMat = new THREE.LineBasicMaterial({
				color: accentColor,
				transparent: true,
				opacity: 0.3,
			});
			const line = new THREE.Line(lineGeo, lineMat);
			syncGroup.add(line);
			lines.push(line);

			// Small ring around each node
			const ringGeo = new THREE.RingGeometry(0.1, 0.13, 16);
			const ringMat = new THREE.MeshBasicMaterial({
				color: accentColor,
				transparent: true,
				opacity: 0.4,
				side: THREE.DoubleSide,
			});
			const ring = new THREE.Mesh(ringGeo, ringMat);
			ring.position.set(x, y, 0);
			ring.lookAt(new THREE.Vector3(0, 0, 1));
			syncGroup.add(ring);
		}

		// Orbital ring
		const orbitGeo = new THREE.TorusGeometry(orbitRadius, 0.01, 8, 48);
		const orbitMat = new THREE.MeshPhysicalMaterial({
			color: accentColor,
			transparent: true,
			opacity: 0.2,
		});
		const orbitRing = new THREE.Mesh(orbitGeo, orbitMat);
		orbitRing.rotation.x = Math.PI / 2;
		orbitRing.scale.y = 0.6;
		syncGroup.add(orbitRing);

		// Floating particles
		const particleCount = 100;
		const particleGeo = new THREE.BufferGeometry();
		const particlePos = new Float32Array(particleCount * 3);
		for (let i = 0; i < particleCount; i++) {
			const theta = Math.random() * Math.PI * 2;
			const r = 0.5 + Math.random() * 1.8;
			particlePos[i * 3] = Math.cos(theta) * r;
			particlePos[i * 3 + 1] = (Math.random() - 0.5) * 2;
			particlePos[i * 3 + 2] = (Math.random() - 0.5) * 1.5;
		}
		particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
		const particleMat = new THREE.PointsMaterial({
			color: primaryColor,
			size: 0.03,
			transparent: true,
			opacity: 0.4,
		});
		const particles = new THREE.Points(particleGeo, particleMat);
		syncGroup.add(particles);

		scene.add(syncGroup);

		(syncGroup as any).__nodes = nodes;
		(syncGroup as any).__lines = lines;
		(syncGroup as any).__center = centerSphere;
		(syncGroup as any).__particles = particles;

		scene.add(new THREE.AmbientLight(0xffffff, 0.5));
	}

	function animate() {
		if (!scene || !renderer || !camera || !isVisible) return;

		const syncGroup = scene.children.find(c => c instanceof THREE.Group) as THREE.Group | undefined;
		if (syncGroup) {
			const t = Date.now() * 0.001;

			syncGroup.rotation.z = Math.sin(t * 0.3) * 0.1;

			const nodes = (syncGroup as any).__nodes as THREE.Mesh[];
			const lines = (syncGroup as any).__lines as THREE.Line[];
			const center = (syncGroup as any).__center as THREE.Mesh;

			center.scale.setScalar(1 + Math.sin(t * 2) * 0.1);

			nodes.forEach((node, i) => {
				const pulse = Math.sin(t * 2 + i * 1.5) * 0.5 + 0.5;
				node.scale.setScalar(1 + pulse * 0.4);

				const lineMat = lines[i].material as THREE.LineBasicMaterial;
				lineMat.opacity = 0.2 + pulse * 0.4;
			});
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
