import { Float, MeshDistortMaterial, Sparkles } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import { DoubleSide } from 'three';
import type { Group, Mesh, MeshStandardMaterial, PointLight } from 'three';

const ORBIT_COUNT = 6;

function OrbitalArtifact(): JSX.Element {
  const rootRef = useRef<Group>(null);
  const innerCoreRef = useRef<Mesh>(null);
  const outerCoreRef = useRef<Mesh>(null);
  const outerCoreMaterialRef = useRef<MeshStandardMaterial>(null);
  const haloRef = useRef<Mesh>(null);
  const haloMaterialRef = useRef<MeshStandardMaterial>(null);
  const beamRef = useRef<Mesh>(null);
  const beamMaterialRef = useRef<MeshStandardMaterial>(null);
  const accentLightRef = useRef<PointLight>(null);
  const orbitRefs = useRef<Array<Mesh | null>>([]);

  const orbitPhases = useMemo(
    () => Array.from({ length: ORBIT_COUNT }, (_, index) => (index / ORBIT_COUNT) * Math.PI * 2),
    [],
  );

  useFrame((state, delta) => {
    const elapsed = state.clock.elapsedTime;
    const pointerSmooth = Math.min(delta * 2.8, 1);
    const targetTiltX = state.pointer.y * 0.42;
    const targetTiltY = state.pointer.x * 0.78;

    if (rootRef.current) {
      rootRef.current.rotation.x += (targetTiltX - rootRef.current.rotation.x) * pointerSmooth;
      rootRef.current.rotation.y += (targetTiltY - rootRef.current.rotation.y) * pointerSmooth;
      rootRef.current.rotation.z = Math.sin(elapsed * 0.18) * 0.12;
      rootRef.current.position.y = Math.sin(elapsed * 0.58) * 0.08;
    }

    if (innerCoreRef.current) {
      innerCoreRef.current.rotation.x += delta * 0.16;
      innerCoreRef.current.rotation.y += delta * 0.24;
    }

    if (outerCoreRef.current) {
      outerCoreRef.current.rotation.x += delta * 0.24;
      outerCoreRef.current.rotation.y -= delta * 0.36;
      outerCoreRef.current.rotation.z = Math.sin(elapsed * 0.45) * 0.15;
    }

    if (haloRef.current) {
      haloRef.current.rotation.x += delta * 0.36;
      haloRef.current.rotation.y += delta * 0.18;
      haloRef.current.rotation.z -= delta * 0.48;
    }

    if (beamRef.current) {
      beamRef.current.rotation.x = Math.sin(elapsed * 0.52) * 0.45;
      beamRef.current.rotation.y += delta * 0.16;
      beamRef.current.rotation.z = Math.cos(elapsed * 0.34) * 0.5;
      beamRef.current.scale.y = 1.85 + Math.sin(elapsed * 1.25) * 0.12;
    }

    orbitRefs.current.forEach((mesh, index) => {
      if (!mesh) return;

      const phase = orbitPhases[index];
      const orbitRadius = 1.95 + (index % 3) * 0.16 + Math.sin(elapsed * 0.7 + phase) * 0.08;
      const orbitSpeed = elapsed * (0.8 + index * 0.07);
      const lift = Math.sin(elapsed * 1.2 + phase * 1.4) * 0.42;
      const depth = Math.sin(elapsed * 0.66 + phase) * 0.72;

      mesh.position.set(Math.cos(orbitSpeed + phase) * orbitRadius, lift, depth);
      mesh.rotation.x += delta * (0.5 + index * 0.07);
      mesh.rotation.y += delta * (0.78 + index * 0.04);
      mesh.rotation.z = Math.sin(elapsed * 1.3 + phase) * 0.8;
      mesh.scale.setScalar(0.13 + Math.max(0, Math.sin(elapsed * 1.7 + phase)) * 0.06);
    });

    if (accentLightRef.current) {
      accentLightRef.current.position.set(
        Math.cos(elapsed * 0.7) * 2.9,
        0.9 + Math.sin(elapsed * 0.9) * 1.05,
        Math.sin(elapsed * 0.5) * 2.6,
      );
      accentLightRef.current.intensity = 1.15 + Math.sin(elapsed * 1.1) * 0.25;
    }

    if (outerCoreMaterialRef.current) {
      outerCoreMaterialRef.current.color.setHSL(0.54 + Math.sin(elapsed * 0.2) * 0.04, 0.96, 0.76);
      outerCoreMaterialRef.current.emissive.setHSL(0.48 + Math.sin(elapsed * 0.3 + 0.6) * 0.05, 0.95, 0.28);
      outerCoreMaterialRef.current.emissiveIntensity = 0.62 + Math.sin(elapsed * 0.95) * 0.16;
    }

    if (haloMaterialRef.current) {
      haloMaterialRef.current.color.setHSL(0.05 + Math.sin(elapsed * 0.18 + 0.8) * 0.04, 0.94, 0.68);
      haloMaterialRef.current.emissive.setHSL(0.03 + Math.sin(elapsed * 0.22 + 1.1) * 0.03, 0.96, 0.3);
      haloMaterialRef.current.emissiveIntensity = 0.72 + Math.sin(elapsed * 0.7) * 0.12;
    }

    if (beamMaterialRef.current) {
      beamMaterialRef.current.color.setHSL(0.53 + Math.sin(elapsed * 0.15 + 0.4) * 0.03, 0.92, 0.82);
      beamMaterialRef.current.emissive.setHSL(0.5 + Math.sin(elapsed * 0.2 + 0.2) * 0.04, 0.94, 0.32);
      beamMaterialRef.current.emissiveIntensity = 0.95 + Math.sin(elapsed * 1.1) * 0.2;
      beamMaterialRef.current.opacity = 0.5 + Math.sin(elapsed * 0.9) * 0.12;
    }
  });

  return (
    <group ref={rootRef}>
      <pointLight
        ref={accentLightRef}
        position={[-2.8, 0.8, 2.4]}
        intensity={1.15}
        distance={16}
        color="#8af6ff"
      />
      <pointLight position={[2.6, -2, -1.5]} intensity={0.72} distance={12} color="#ff946e" />

      <Float speed={1.18} rotationIntensity={0.42} floatIntensity={0.58}>
        <mesh ref={innerCoreRef} scale={1.1}>
          <icosahedronGeometry args={[1.2, 4]} />
          <MeshDistortMaterial
            color="#67f4ff"
            roughness={0.08}
            metalness={0.88}
            distort={0.3}
            speed={1.8}
            emissive="#84ffd4"
            emissiveIntensity={0.28}
          />
        </mesh>
      </Float>

      <Float speed={0.82} rotationIntensity={1.02} floatIntensity={0.28}>
        <mesh ref={outerCoreRef} scale={1.36}>
          <icosahedronGeometry args={[1.14, 2]} />
          <meshStandardMaterial
            ref={outerCoreMaterialRef}
            wireframe
            transparent
            opacity={0.88}
            roughness={0.22}
            metalness={0.92}
            emissive="#56d8ff"
            emissiveIntensity={0.68}
          />
        </mesh>
      </Float>

      <Float speed={0.72} rotationIntensity={1.32} floatIntensity={0.3}>
        <mesh ref={haloRef} rotation={[Math.PI / 2, 0, Math.PI / 5]} scale={1.78}>
          <torusGeometry args={[1.02, 0.05, 18, 180]} />
          <meshStandardMaterial
            ref={haloMaterialRef}
            color="#ff9c73"
            emissive="#ff875a"
            emissiveIntensity={0.75}
            roughness={0.18}
            metalness={0.82}
          />
        </mesh>
      </Float>

      <Float speed={0.92} rotationIntensity={0.66} floatIntensity={0.22}>
        <mesh ref={beamRef} rotation={[0.22, 0.18, 0.7]} scale={[0.14, 1.9, 0.14]}>
          <cylinderGeometry args={[0.22, 0.22, 2.8, 18, 1, true]} />
          <meshStandardMaterial
            ref={beamMaterialRef}
            transparent
            opacity={0.5}
            roughness={0.12}
            metalness={0.95}
            color="#eafcff"
            emissive="#8cf7ff"
            emissiveIntensity={0.98}
            side={DoubleSide}
          />
        </mesh>
      </Float>

      {orbitPhases.map((phase, index) => (
        <Float
          key={`orbit-${phase}`}
          speed={1.14 + index * 0.08}
          rotationIntensity={1.55 - index * 0.08}
          floatIntensity={0.22 + index * 0.02}
        >
          <mesh
            ref={(mesh) => {
              orbitRefs.current[index] = mesh;
            }}
            position={[Math.cos(phase) * 2.1, Math.sin(phase * 1.4) * 0.28, Math.sin(phase) * 0.7]}
          >
            <octahedronGeometry args={[1, 0]} />
            <meshStandardMaterial
              color={index % 2 === 0 ? '#7bf5ff' : '#ffc39e'}
              emissive={index % 2 === 0 ? '#55d7ff' : '#ff875f'}
              emissiveIntensity={0.65}
              roughness={0.26}
              metalness={0.82}
            />
          </mesh>
        </Float>
      ))}

      <Sparkles count={42} speed={0.55} size={1.8} scale={[7.4, 4.4, 4.8]} color="#87f8ff" opacity={0.72} />
    </group>
  );
}

export default function HeroScene(): JSX.Element {
  return (
    <Canvas camera={{ position: [0, 0, 5.35], fov: 42 }} dpr={[1, 1.75]} gl={{ antialias: true, alpha: true }}>
      <color attach="background" args={['#081427']} />
      <fog attach="fog" args={['#081427', 7, 15]} />
      <ambientLight intensity={0.28} />
      <hemisphereLight intensity={0.92} skyColor="#a5f7ff" groundColor="#091326" />
      <directionalLight position={[4, 3, 5]} intensity={1.12} color="#f4feff" />
      <OrbitalArtifact />
    </Canvas>
  );
}
