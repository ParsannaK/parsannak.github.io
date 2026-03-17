import { Float, MeshDistortMaterial } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import type { Mesh } from 'three';

function ReactiveOrb(): JSX.Element {
  const meshRef = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    const targetX = state.pointer.y * 0.5;
    const targetY = state.pointer.x * 0.6 + state.clock.elapsedTime * 0.2;

    meshRef.current.rotation.x += (targetX - meshRef.current.rotation.x) * Math.min(delta * 4, 1);
    meshRef.current.rotation.y += (targetY - meshRef.current.rotation.y) * Math.min(delta * 4, 1);
  });

  return (
    <Float speed={1.4} rotationIntensity={0.9} floatIntensity={0.8}>
      <mesh ref={meshRef} scale={1.6}>
        <icosahedronGeometry args={[1.4, 12]} />
        <MeshDistortMaterial color="#4ce4ff" roughness={0.18} metalness={0.78} distort={0.36} speed={2.4} />
      </mesh>
    </Float>
  );
}

export default function HeroScene(): JSX.Element {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 1.8]} gl={{ antialias: true }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[2, 4, 6]} intensity={1.2} color="#c4f2ff" />
      <pointLight position={[-4, -2, 2]} intensity={0.7} color="#ff8f6b" />
      <ReactiveOrb />
    </Canvas>
  );
}
