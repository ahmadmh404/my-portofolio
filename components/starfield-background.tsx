"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function StarfieldBackground() {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>(null);
  const rendererRef = useRef<THREE.WebGLRenderer>(null);
  const animationIdRef = useRef<number>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    // Create stars
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 2000;
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);
    const sizes = new Float32Array(starCount);
    const velocities = new Float32Array(starCount * 3);

    // Star colors palette
    const starColors = [
      new THREE.Color(0x9bb5ff), // Blue
      new THREE.Color(0xaabfff), // Light blue
      new THREE.Color(0xcad7ff), // Very light blue
      new THREE.Color(0xf8f7ff), // White
      new THREE.Color(0xfff4ea), // Warm white
      new THREE.Color(0xffd2a1), // Orange
      new THREE.Color(0xffad51), // Yellow-orange
    ];

    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;

      // Position
      positions[i3] = (Math.random() - 0.5) * 100;
      positions[i3 + 1] = (Math.random() - 0.5) * 100;
      positions[i3 + 2] = (Math.random() - 0.5) * 100;

      // Color
      const color = starColors[Math.floor(Math.random() * starColors.length)];
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;

      // Size
      sizes[i] = Math.random() * 3 + 1;

      // Velocity
      velocities[i3] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.02;
    }

    starGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    starGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    starGeometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    // Star material with custom shader
    const starMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        pixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        uniform float time;
        uniform float pixelRatio;
        
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          
          // Add subtle pulsing effect
          float pulse = sin(time * 2.0 + position.x * 0.1) * 0.3 + 0.7;
          
          gl_PointSize = size * pulse * pixelRatio * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        
        void main() {
          // Create circular star shape
          float distance = length(gl_PointCoord - vec2(0.5));
          float alpha = 1.0 - smoothstep(0.0, 0.5, distance);
          
          // Add sparkle effect
          float sparkle = pow(alpha, 2.0);
          
          gl_FragColor = vec4(vColor, alpha * sparkle);
        }
      `,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // Create shooting stars
    const shootingStars: Array<{
      mesh: THREE.Mesh;
      velocity: THREE.Vector3;
      life: number;
      maxLife: number;
    }> = [];

    const createShootingStar = () => {
      const geometry = new THREE.CylinderGeometry(0.01, 0.05, 2, 8);
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(Math.random() * 0.1 + 0.15, 0.8, 0.8),
        transparent: true,
        opacity: 0.8,
      });

      const shootingStar = new THREE.Mesh(geometry, material);

      // Random starting position
      shootingStar.position.set(
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 50
      );

      // Random direction
      const velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 0.5,
        (Math.random() - 0.5) * 0.5,
        (Math.random() - 0.5) * 0.5
      )
        .normalize()
        .multiplyScalar(0.3);

      // Align with velocity direction
      shootingStar.lookAt(shootingStar.position.clone().add(velocity));

      scene.add(shootingStar);

      shootingStars.push({
        mesh: shootingStar,
        velocity,
        life: 0,
        maxLife: Math.random() * 200 + 100,
      });
    };

    // Mouse interaction
    const mouse = new THREE.Vector2();
    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Animation loop
    const clock = new THREE.Clock();
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Update star material time
      starMaterial.uniforms.time.value = elapsedTime;

      // Animate stars
      const positions = starGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < starCount; i++) {
        const i3 = i * 3;

        // Move stars
        positions[i3] += velocities[i3];
        positions[i3 + 1] += velocities[i3 + 1];
        positions[i3 + 2] += velocities[i3 + 2];

        // Wrap around boundaries
        if (positions[i3] > 50) positions[i3] = -50;
        if (positions[i3] < -50) positions[i3] = 50;
        if (positions[i3 + 1] > 50) positions[i3 + 1] = -50;
        if (positions[i3 + 1] < -50) positions[i3 + 1] = 50;
        if (positions[i3 + 2] > 50) positions[i3 + 2] = -50;
        if (positions[i3 + 2] < -50) positions[i3 + 2] = 50;
      }
      starGeometry.attributes.position.needsUpdate = true;

      // Mouse interaction - subtle camera movement
      camera.position.x += (mouse.x * 0.5 - camera.position.x) * 0.02;
      camera.position.y += (mouse.y * 0.5 - camera.position.y) * 0.02;

      // Rotate star field slowly
      stars.rotation.y += 0.0005;
      stars.rotation.x += 0.0002;

      // Create shooting stars occasionally
      if (Math.random() < 0.003) {
        createShootingStar();
      }

      // Update shooting stars
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const shootingStar = shootingStars[i];
        shootingStar.life++;

        // Move shooting star
        shootingStar.mesh.position.add(shootingStar.velocity);

        // Fade out over time
        const fadeProgress = shootingStar.life / shootingStar.maxLife;
        const material = shootingStar.mesh.material as THREE.MeshBasicMaterial;
        material.opacity = Math.max(0, 1 - fadeProgress);

        // Remove if life exceeded
        if (shootingStar.life > shootingStar.maxLife) {
          scene.remove(shootingStar.mesh);
          shootingStars.splice(i, 1);
        }
      }

      renderer.render(scene, camera);
      animationIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      starMaterial.uniforms.pixelRatio.value = Math.min(
        window.devicePixelRatio,
        2
      );
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);

      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }

      // Dispose of Three.js objects
      starGeometry.dispose();
      starMaterial.dispose();
      shootingStars.forEach((star) => {
        scene.remove(star.mesh);
        star.mesh.geometry.dispose();
        (star.mesh.material as THREE.Material).dispose();
      });
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ background: "transparent" }}
    />
  );
}
