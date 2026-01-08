import React, { useEffect, useRef } from 'react';
import './NetflixWebGLBackground.css';
import { getDeviceTier, isSlowNetwork, prefersReducedMotion, shouldEnableWebGL } from '../utils/performance';

const NetflixWebGLBackground = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        if (!shouldEnableWebGL()) return;

        const deviceTier = getDeviceTier();
        const shouldAnimate = !prefersReducedMotion();
        const isVeryLowTier = deviceTier === 'very-low';
        const isLowTier = isVeryLowTier || deviceTier === 'low';

        let disposed = false;
        let animationFrameId = null;

        let renderer = null;
        let scene = null;
        let camera = null;

        let pointsGeometry = null;
        let pointsMaterial = null;
        let points = null;

        let wireGeometry = null;
        let wireMaterial = null;
        let wireMesh = null;
        let visibilityHandler = null;
        let scheduledInitCleanup = null;

        const pointerState = {
            currentX: 0,
            currentY: 0,
            targetX: 0,
            targetY: 0,
        };

        const onPointerMove = (event) => {
            const width = window.innerWidth || 1;
            const height = window.innerHeight || 1;
            pointerState.targetX = (event.clientX / width) * 2 - 1;
            pointerState.targetY = (event.clientY / height) * 2 - 1;
        };

        const onResize = () => {
            if (!renderer || !camera) return;
            const rect = container.getBoundingClientRect();
            const width = Math.max(1, Math.floor(rect.width));
            const height = Math.max(1, Math.floor(rect.height));
            renderer.setSize(width, height, false);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            if (!shouldAnimate && scene) renderer.render(scene, camera);
        };

        const cleanup = () => {
            if (shouldAnimate) window.removeEventListener('pointermove', onPointerMove);
            window.removeEventListener('resize', onResize);
            if (visibilityHandler) document.removeEventListener('visibilitychange', visibilityHandler);
            if (scheduledInitCleanup) scheduledInitCleanup();
            if (animationFrameId) cancelAnimationFrame(animationFrameId);

            if (pointsGeometry) pointsGeometry.dispose();
            if (pointsMaterial) pointsMaterial.dispose();
            if (wireGeometry) wireGeometry.dispose();
            if (wireMaterial) wireMaterial.dispose();

            if (renderer) {
                renderer.dispose();
                if (typeof renderer.forceContextLoss === 'function') renderer.forceContextLoss();
                const canvas = renderer.domElement;
                if (canvas && canvas.parentNode) canvas.parentNode.removeChild(canvas);
            }

            renderer = null;
            scene = null;
            camera = null;
            pointsGeometry = null;
            pointsMaterial = null;
            points = null;
            wireGeometry = null;
            wireMaterial = null;
            wireMesh = null;
            visibilityHandler = null;
            scheduledInitCleanup = null;
        };

        const init = async () => {
            try {
                const {
                    WebGLRenderer,
                    Scene,
                    FogExp2,
                    PerspectiveCamera,
                    Group,
                    BufferGeometry,
                    BufferAttribute,
                    PointsMaterial,
                    AdditiveBlending,
                    Points,
                    IcosahedronGeometry,
                    MeshBasicMaterial,
                    Mesh,
                    Clock,
                } = await import('three');
                if (disposed) return;

                renderer = new WebGLRenderer({
                    alpha: true,
                    antialias: !isLowTier,
                    powerPreference: isLowTier ? 'low-power' : 'high-performance',
                });
                renderer.setClearColor(0x000000, 0);
                renderer.setPixelRatio(isLowTier ? 1 : Math.min(window.devicePixelRatio || 1, 2));
                renderer.domElement.className = 'netflix-webgl-canvas';
                renderer.domElement.setAttribute('aria-hidden', 'true');
                container.appendChild(renderer.domElement);

                scene = new Scene();
                scene.fog = new FogExp2(0x050505, 0.055);

                camera = new PerspectiveCamera(45, 1, 0.1, 120);
                camera.position.z = 10;

                const group = new Group();
                scene.add(group);

                const pointCount = isVeryLowTier ? 380 : isLowTier ? 650 : 1100;
                const positions = new Float32Array(pointCount * 3);
                for (let i = 0; i < pointCount; i += 1) {
                    const i3 = i * 3;
                    positions[i3 + 0] = (Math.random() - 0.5) * 24;
                    positions[i3 + 1] = (Math.random() - 0.5) * 14;
                    positions[i3 + 2] = -Math.random() * 18;
                }

                pointsGeometry = new BufferGeometry();
                pointsGeometry.setAttribute('position', new BufferAttribute(positions, 3));
                pointsMaterial = new PointsMaterial({
                    color: 0xe50914,
                    size: isVeryLowTier ? 0.08 : isLowTier ? 0.085 : 0.09,
                    transparent: true,
                    opacity: 0.42,
                    depthWrite: false,
                    blending: AdditiveBlending,
                });
                points = new Points(pointsGeometry, pointsMaterial);
                group.add(points);

                if (!isLowTier) {
                    wireGeometry = new IcosahedronGeometry(3, 2);
                    wireMaterial = new MeshBasicMaterial({
                        color: 0xe50914,
                        wireframe: true,
                        transparent: true,
                        opacity: 0.22,
                        depthWrite: false,
                        blending: AdditiveBlending,
                    });
                    wireMesh = new Mesh(wireGeometry, wireMaterial);
                    wireMesh.position.z = -4.5;
                    group.add(wireMesh);
                }

                const clock = new Clock();
                const pointPositions = pointsGeometry.attributes.position.array;

                onResize();
                window.addEventListener('resize', onResize);

                if (!shouldAnimate) {
                    renderer.render(scene, camera);
                    return;
                }

                window.addEventListener('pointermove', onPointerMove, { passive: true });

                const targetFrameMs = isVeryLowTier ? 1000 / 24 : isLowTier ? 1000 / 30 : 0;
                let lastFrameTime = 0;

                const tick = (now) => {
                    if (disposed) return;

                    if (targetFrameMs && now - lastFrameTime < targetFrameMs) {
                        animationFrameId = requestAnimationFrame(tick);
                        return;
                    }
                    lastFrameTime = now;

                    const t = clock.getElapsedTime();
                    pointerState.currentX += (pointerState.targetX - pointerState.currentX) * 0.05;
                    pointerState.currentY += (pointerState.targetY - pointerState.currentY) * 0.05;

                    group.rotation.y = t * 0.08;
                    group.rotation.x = t * 0.04;

                    camera.position.x = pointerState.currentX * 1.2;
                    camera.position.y = -pointerState.currentY * 0.8;
                    camera.lookAt(0, 0, -8);

                    for (let i = 0; i < pointCount; i += 1) {
                        const zIndex = i * 3 + 2;
                        pointPositions[zIndex] += 0.06;
                        if (pointPositions[zIndex] > 2) pointPositions[zIndex] = -18;
                    }
                    pointsGeometry.attributes.position.needsUpdate = true;

                    renderer.render(scene, camera);
                    animationFrameId = requestAnimationFrame(tick);
                };

                animationFrameId = requestAnimationFrame(tick);

                visibilityHandler = () => {
                    if (!shouldAnimate) return;
                    if (document.visibilityState === 'hidden') {
                        if (animationFrameId) cancelAnimationFrame(animationFrameId);
                        animationFrameId = null;
                        return;
                    }
                    if (!animationFrameId) {
                        lastFrameTime = 0;
                        animationFrameId = requestAnimationFrame(tick);
                    }
                };
                document.addEventListener('visibilitychange', visibilityHandler);
            } catch {
                cleanup();
            }
        };

        const shouldDeferInit = isLowTier || isSlowNetwork();
        if (shouldDeferInit && typeof window !== 'undefined') {
            if (typeof window.requestIdleCallback === 'function') {
                const idleId = window.requestIdleCallback(() => init(), { timeout: 1200 });
                scheduledInitCleanup = () => window.cancelIdleCallback(idleId);
            } else {
                const timeoutId = window.setTimeout(() => init(), 300);
                scheduledInitCleanup = () => window.clearTimeout(timeoutId);
            }
        } else {
            init();
        }

        return () => {
            disposed = true;
            cleanup();
        };
    }, []);

    return <div ref={containerRef} className="netflix-webgl-bg" />;
};

export default NetflixWebGLBackground;
