import React, { useRef, useLayoutEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, Color, Group, MeshPhysicalMaterial, MeshStandardMaterial, DoubleSide } from 'three';
import { useGLTF, Float } from '@react-three/drei';

export const CarShader: React.FC<{ scrollProgress: number }> = ({ scrollProgress }) => {
  const groupRef = useRef<Group>(null);
  
  // Using JSDelivr CDN which is more reliable for CORS than direct threejs.org links
  const { scene } = useGLTF('https://cdn.jsdelivr.net/gh/mrdoob/three.js@master/examples/models/gltf/ferrari.glb');

  // Memoize materials to prevent recreation on every render
  const materials = useMemo(() => {
    return {
      paint: new MeshPhysicalMaterial({
        color: new Color("#050505"), // Deep Obsidian
        metalness: 0.9,
        roughness: 0.2,
        clearcoat: 1.0,
        clearcoatRoughness: 0.03,
        envMapIntensity: 2.5,
        side: DoubleSide
      }),
      glass: new MeshPhysicalMaterial({
        color: new Color("#111111"),
        metalness: 0.9,
        roughness: 0.05,
        transmission: 0.8, // Higher transmission for better visibility
        transparent: true,
        envMapIntensity: 3.0,
        thickness: 0.5,
      }),
      chrome: new MeshStandardMaterial({
        color: new Color("#C0C2C5"), // Liquid Chrome
        metalness: 1.0,
        roughness: 0.1,
        envMapIntensity: 2.0
      }),
      accent: new MeshStandardMaterial({
        color: new Color("#00E5D2"), // Electric Teal
        metalness: 0.6,
        roughness: 0.4,
        emissive: new Color("#00E5D2"),
        emissiveIntensity: 0.5
      }),
      rubber: new MeshStandardMaterial({
        color: new Color("#0A0A0B"),
        roughness: 0.9,
        metalness: 0.1,
      })
    };
  }, []);

  useLayoutEffect(() => {
    if (!scene) return;

    scene.traverse((object) => {
      if ((object as Mesh).isMesh) {
        const mesh = object as Mesh;
        const name = mesh.name.toLowerCase();

        mesh.castShadow = true;
        mesh.receiveShadow = true;

        // Specific mapping for the standard Three.js Ferrari model
        // Common names: 'body', 'glass', 'wheel', 'rim', 'yellow' (brakes usually)
        if (name.includes('glass') || name.includes('window')) {
          mesh.material = materials.glass;
        } else if (name.includes('rim') || name.includes('wheel_') || name.includes('silver')) {
          mesh.material = materials.chrome;
        } else if (name.includes('brake') || name.includes('caliper') || name.includes('yellow')) {
          mesh.material = materials.accent;
        } else if (name.includes('tire') || name.includes('rubber') || name.includes('interior')) {
          mesh.material = materials.rubber;
        } else if (name.includes('body')) {
          mesh.material = materials.paint;
        } else {
          // Fallback for body panels
          mesh.material = materials.paint;
        }
      }
    });
  }, [scene, materials]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    
    // Rotation: Start at angle (-Math.PI / 4), slowly spin (t * 0.1), and spin fast on scroll
    groupRef.current.rotation.y = (-Math.PI / 4) + (t * 0.1) + (scrollProgress * Math.PI * 2);
    
    // Floating Physics
    // Adjusted to oscillate around 0 instead of -0.5
    groupRef.current.position.y = Math.sin(t * 0.5) * 0.05; 
    groupRef.current.rotation.z = Math.sin(t * 0.3) * 0.015; // Chassis roll
    groupRef.current.rotation.x = Math.cos(t * 0.2) * 0.01; // Pitch
  });

  return (
    <group ref={groupRef} dispose={null}>
      <Float 
        speed={1.5} 
        rotationIntensity={0.1} 
        floatIntensity={0.2} 
        floatingRange={[-0.05, 0.05]}
      >
        {/* Adjusted scale to 0.6 (Standard GLTF units are usually meters, car is ~4.5m) */}
        <primitive 
          object={scene} 
          scale={0.6} 
          rotation={[0, 0, 0]} 
          position={[0, 0, 0]} 
        />
      </Float>
    </group>
  );
};

// Preload the asset
useGLTF.preload('https://cdn.jsdelivr.net/gh/mrdoob/three.js@master/examples/models/gltf/ferrari.glb');