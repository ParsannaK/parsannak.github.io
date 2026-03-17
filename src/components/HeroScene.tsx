import { Float, MeshDistortMaterial, Sparkles } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import type { Group, Mesh, MeshStandardMaterial } from 'three';

function ReactiveCluster(): JSX.Element {
  const rootRef = useRef<Group>(null);
  const coreRef = useRef<Mesh>(null);
  const orbitRef = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (!rootRef.current || !coreRef.current || !orbitRef.current) return;

    const elapsed = state.clock.elapsedTime;
    const pointerLift = state.pointer.y * 0.4;
    const pointerOrbit = state.pointer.x * 0.65;

    rootRef.current.rotation.x += (pointerLift - rootRef.current.rotation.x) * Math.min(delta * 2.8, 1);
    rootRef.current.rotation.y += (pointerOrbit - rootRef.current.rotation.y) * Math.min(delta * 2.8, 1);

    coreRef.current.rotation.y += delta * 0.6;
    coreRef.current.rotation.x += delta * 0.28;

    orbitRef.current.rotation.x += delta * 0.45;
    orbitRef.current.rotation.y -= delta * 0.32;

    const coreMaterial = coreRef.current.material as MeshStandardMaterial;
    const orbitMaterial = orbitRef.current.material as MeshStandardMaterial;

    coreMaterial.color.setHSL(0.54 + Math.sin(elapsed * 0.22) * 0.09, 0.92, 0.64);
    coreMaterial.emissive.setHSL(0.45 + Math.sin(elapsed * 0.3 + 0.8) * 0.08, 0.9, 0.32);

    orbitMaterial.color.setHSL(0.06 + Math.sin(elapsed * 0.2 + 0.5) * 0.05, 0.95, 0.66);
    orbitMaterial.emissive.setHSL(0.03 + Math.sin(elapsed * 0.26 + 1.05) * 0.04, 0.95, 0.3);
  });

  return (
    <group ref={rootRef}>
      <Float speed={1.8} rotationIntensity={0.7} floatIntensity={1.1}>
        <mesh ref={coreRef} scale={1.08}>
          <icosahedronGeometry args={[1.3, 14]} />
          <MeshDistortMaterial
            color="#69f2ff"
            roughness={0.06}
            metalness={0.85}
            distort={0.44}
            speed={2.2}
            emissive="#8ff8d0"
            emissiveIntensity={0.45}
          />
        </mesh>
      </Float>

      <Float speed={1.2} rotationIntensity={1.4} floatIntensity={0.5}>
        <mesh ref={orbitRef} scale={1.7}>
          <torusKnotGeometry args={[0.95, 0.14, 180, 28]} />
          <meshStandardMaterial
            color="#ff9e78"
            emissive="#ff936f"
            emissiveIntensity={0.6}
            metalness={0.52}
            roughness={0.3}
            wireframe
          />
        </mesh>
      </Float>

      <Float speed={2.4} rotationIntensity={1.6} floatIntensity={1.4}>
        <mesh position={[1.4, 0.82, -0.7]} scale={0.24}>
          <sphereGeometry args={[1, 24, 24]} />
          <meshStandardMaterial color="#84f4ff" emissive="#53b8ff" emissiveIntensity={0.7} />
        </mesh>
      </Float>

      <Float speed={2.1} rotationIntensity={1.4} floatIntensity={1.3}>
        <mesh position={[-1.35, -0.78, -0.55]} scale={0.17}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#ffd0a8" emissive="#ff845d" emissiveIntensity={0.6} />
        </mesh>
      </Float>

      <Sparkles count={56} speed={0.6} size={2} scale={[7.2, 4.2, 4.3]} color="#7bf4ff" />
    </group>
  );
}

export default function HeroScene(): JSX.Element {
  return (
    <Canvas camera={{ position: [0, 0, 5.4], fov: 44 }} dpr={[1, 1.8]} gl={{ antialias: true }}>
      <ambientLight intensity={0.58} />
      <directionalLight position={[3, 3, 5]} intensity={1.3} color="#9ff6ff" />
      <pointLight position={[-3, -2, 2]} intensity={0.9} color="#ff9269" />
      <pointLight position={[0, 2, -2]} intensity={0.6} color="#8cf8cf" />
      <ReactiveCluster />
    </Canvas>
  );
}
