
import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Text, Float } from '@react-three/drei';
import { Mesh } from 'three';
import { STEPS } from '../../constants';
import { Theme } from '../../types';

interface SphereProps {
  position: [number, number, number];
  label: string;
  description: string;
  delay: number;
  theme: Theme;
}

const RitualSphere: React.FC<SphereProps> = ({ position, label, description, delay, theme }) => {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.getElapsedTime();
      meshRef.current.rotation.x = Math.sin(t * 0.2 + delay) * 0.2;
      meshRef.current.rotation.y = Math.cos(t * 0.3 + delay) * 0.2;
    }
  });

  return (
    <group position={position}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh 
          ref={meshRef} 
          onPointerOver={() => setHovered(true)} 
          onPointerOut={() => setHovered(false)}
          scale={hovered ? 1.2 : 1}
        >
          <sphereGeometry args={[1.2, 64, 64]} />
          <MeshDistortMaterial
            color={hovered ? "#00E5D2" : (theme === 'light' ? "#1a1a1a" : "#1a1a1a")}
            envMapIntensity={1}
            clearcoat={1}
            clearcoatRoughness={0}
            metalness={0.9}
            roughness={0.1}
            distort={0.4}
            speed={1.5}
          />
        </mesh>
        
        <Text
          position={[0, -2, 0]}
          fontSize={0.3}
          color={theme === 'light' ? "#0A0A0B" : "#C0C2C5"}
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
        >
          {label.toUpperCase()}
        </Text>
        
        {hovered && (
          <Text
            position={[0, -2.5, 0]}
            fontSize={0.15}
            maxWidth={2}
            color={theme === 'light' ? "#D97706" : "#FFD54F"} // Darker gold for light mode
            anchorX="center"
            anchorY="middle"
            textAlign="center"
             font="https://fonts.gstatic.com/s/playfairdisplay/v30/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKdFvXDXbtM.woff"
          >
            {description}
          </Text>
        )}
      </Float>
    </group>
  );
};

export const RitualSpheres: React.FC<{ theme: Theme }> = ({ theme }) => {
  return (
    <group position={[0, -1, 0]}>
      {STEPS.map((step, idx) => (
        <RitualSphere 
          key={step.id} 
          position={[(idx - 1) * 3.5, 0, 0]} 
          label={step.title}
          description={step.description}
          delay={idx}
          theme={theme}
        />
      ))}
    </group>
  );
};
