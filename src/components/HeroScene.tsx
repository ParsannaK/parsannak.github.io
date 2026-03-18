import { Float, Line, MeshDistortMaterial, Sparkles, Stars } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import { AdditiveBlending, CatmullRomCurve3, DoubleSide, Vector3 } from 'three';
import type { Group, Mesh, MeshPhysicalMaterial, MeshStandardMaterial, PointLight } from 'three';

const SHARD_COUNT = 14;
const SATELLITE_COUNT = 5;

function CameraDrift(): null {
  const { camera, pointer } = useThree();

  useFrame((_, delta) => {
    const smoothing = Math.min(delta * 2.4, 1);
    const targetX = pointer.x * 0.48;
    const targetY = pointer.y * 0.35;

    camera.position.x += (targetX - camera.position.x) * smoothing;
    camera.position.y += (targetY - camera.position.y) * smoothing;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

function QuantumEngine(): JSX.Element {
  const rootRef = useRef<Group>(null);

  const coreRef = useRef<Mesh>(null);
  const cageRef = useRef<Mesh>(null);
  const gyroARef = useRef<Mesh>(null);
  const gyroBRef = useRef<Mesh>(null);
  const gyroCRef = useRef<Mesh>(null);
  const beamRef = useRef<Mesh>(null);
  const railARef = useRef<Mesh>(null);
  const railBRef = useRef<Mesh>(null);

  const coreMaterialRef = useRef<MeshPhysicalMaterial>(null);
  const cageMaterialRef = useRef<MeshStandardMaterial>(null);
  const gyroAMaterialRef = useRef<MeshStandardMaterial>(null);
  const gyroBMaterialRef = useRef<MeshStandardMaterial>(null);
  const gyroCMaterialRef = useRef<MeshStandardMaterial>(null);
  const beamMaterialRef = useRef<MeshStandardMaterial>(null);

  const shardRefs = useRef<Array<Mesh | null>>([]);
  const satelliteRefs = useRef<Array<Mesh | null>>([]);

  const keyLightRef = useRef<PointLight>(null);
  const fillLightRef = useRef<PointLight>(null);

  const shardSeeds = useMemo(
    () =>
      Array.from({ length: SHARD_COUNT }, (_, index) => ({
        phase: (index / SHARD_COUNT) * Math.PI * 2,
        radius: 1.85 + (index % 4) * 0.22,
        speed: 0.58 + (index % 5) * 0.09,
        lift: 0.26 + ((index * 7) % 11) * 0.04,
        depth: 0.62 + ((index * 3) % 6) * 0.08,
      })),
    [],
  );

  const satelliteSeeds = useMemo(
    () =>
      Array.from({ length: SATELLITE_COUNT }, (_, index) => ({
        phase: (index / SATELLITE_COUNT) * Math.PI * 2,
        speed: 0.38 + index * 0.05,
        incline: 0.35 + index * 0.08,
      })),
    [],
  );

  const railCurves = useMemo(() => {
    const makeCurve = (radius: number, wobble: number, lift: number, phase: number): CatmullRomCurve3 => {
      const points = Array.from({ length: 30 }, (_, index) => {
        const t = (index / 30) * Math.PI * 2;
        const wave = Math.sin(t * 3 + phase) * wobble;
        const x = Math.cos(t + phase) * (radius + wave);
        const y = Math.sin(t * 2 + phase) * lift;
        const z = Math.sin(t + phase) * (radius + Math.cos(t * 2 - phase) * wobble);
        return new Vector3(x, y, z);
      });
      return new CatmullRomCurve3(points, true);
    };

    return [makeCurve(1.8, 0.16, 0.28, 0.4), makeCurve(2.12, 0.18, 0.34, 1.2)];
  }, []);

  const glyphPaths = useMemo(
    () =>
      Array.from({ length: 3 }, (_, pathIndex) =>
        Array.from({ length: 42 }, (_, pointIndex) => {
          const t = (pointIndex / 41) * Math.PI * 2;
          const radius = 1.38 + pathIndex * 0.24 + Math.sin(t * 4 + pathIndex) * 0.06;
          return new Vector3(
            Math.cos(t + pathIndex * 0.35) * radius,
            Math.sin(t * 2 + pathIndex * 0.6) * 0.19,
            Math.sin(t + pathIndex * 0.35) * radius,
          );
        }),
      ),
    [],
  );

  useFrame((state, delta) => {
    const elapsed = state.clock.elapsedTime;
    const smooth = Math.min(delta * 2.6, 1);
    const tiltX = state.pointer.y * 0.46;
    const tiltY = state.pointer.x * 0.82;

    if (rootRef.current) {
      rootRef.current.rotation.x += (tiltX - rootRef.current.rotation.x) * smooth;
      rootRef.current.rotation.y += (tiltY - rootRef.current.rotation.y) * smooth;
      rootRef.current.rotation.z = Math.sin(elapsed * 0.2) * 0.08;
      rootRef.current.position.y = Math.sin(elapsed * 0.55) * 0.12;
    }

    if (coreRef.current) {
      coreRef.current.rotation.x += delta * 0.18;
      coreRef.current.rotation.y += delta * 0.24;
      coreRef.current.scale.setScalar(1.02 + Math.sin(elapsed * 1.7) * 0.04);
    }

    if (cageRef.current) {
      cageRef.current.rotation.x -= delta * 0.14;
      cageRef.current.rotation.y += delta * 0.31;
      cageRef.current.rotation.z += delta * 0.11;
    }

    if (gyroARef.current) {
      gyroARef.current.rotation.x += delta * 0.5;
      gyroARef.current.rotation.y -= delta * 0.24;
    }

    if (gyroBRef.current) {
      gyroBRef.current.rotation.y += delta * 0.55;
      gyroBRef.current.rotation.z += delta * 0.23;
    }

    if (gyroCRef.current) {
      gyroCRef.current.rotation.z -= delta * 0.48;
      gyroCRef.current.rotation.x += delta * 0.26;
    }

    if (railARef.current && railBRef.current) {
      railARef.current.rotation.y += delta * 0.18;
      railARef.current.rotation.x = Math.sin(elapsed * 0.42) * 0.22;
      railBRef.current.rotation.y -= delta * 0.22;
      railBRef.current.rotation.z = Math.cos(elapsed * 0.38) * 0.28;
    }

    if (beamRef.current) {
      beamRef.current.rotation.x = Math.sin(elapsed * 0.48) * 0.52;
      beamRef.current.rotation.z = Math.cos(elapsed * 0.36) * 0.62;
      beamRef.current.rotation.y += delta * 0.15;
      beamRef.current.scale.y = 1.82 + Math.sin(elapsed * 1.18) * 0.12;
    }

    shardRefs.current.forEach((mesh, index) => {
      if (!mesh) return;

      const seed = shardSeeds[index];
      const orbit = elapsed * seed.speed + seed.phase;
      const wobble = Math.sin(elapsed * 1.6 + seed.phase * 1.3) * 0.18;

      mesh.position.set(
        Math.cos(orbit) * (seed.radius + wobble),
        Math.sin(elapsed * 1.22 + seed.phase * 1.7) * seed.lift,
        Math.sin(orbit * 0.9 + seed.phase) * seed.depth,
      );
      mesh.rotation.x += delta * (0.6 + index * 0.04);
      mesh.rotation.y += delta * (0.82 + index * 0.03);
      mesh.rotation.z = Math.sin(elapsed * 1.35 + seed.phase) * 0.72;
      mesh.scale.setScalar(0.11 + Math.max(0, Math.sin(elapsed * 1.9 + seed.phase)) * 0.07);
    });

    satelliteRefs.current.forEach((mesh, index) => {
      if (!mesh) return;

      const seed = satelliteSeeds[index];
      const orbit = elapsed * seed.speed + seed.phase;
      const ringRadius = 2.45 + index * 0.16;

      mesh.position.set(
        Math.cos(orbit) * ringRadius,
        Math.sin(orbit * 1.8 + seed.phase) * seed.incline,
        Math.sin(orbit) * ringRadius,
      );
      mesh.rotation.x += delta * (0.9 + index * 0.08);
      mesh.rotation.y += delta * (0.55 + index * 0.07);
    });

    if (keyLightRef.current) {
      keyLightRef.current.position.set(
        Math.cos(elapsed * 0.75) * 3.4,
        1.3 + Math.sin(elapsed * 0.95) * 1.1,
        Math.sin(elapsed * 0.52) * 3,
      );
      keyLightRef.current.intensity = 1.28 + Math.sin(elapsed * 1.2) * 0.26;
    }

    if (fillLightRef.current) {
      fillLightRef.current.position.set(
        Math.sin(elapsed * 0.52) * -2.8,
        -1.6 + Math.cos(elapsed * 0.66) * 0.42,
        Math.cos(elapsed * 0.43) * -2.5,
      );
      fillLightRef.current.intensity = 0.76 + Math.cos(elapsed * 0.8) * 0.18;
    }

    if (coreMaterialRef.current) {
      coreMaterialRef.current.color.setHSL(0.55 + Math.sin(elapsed * 0.21) * 0.04, 0.96, 0.74);
      coreMaterialRef.current.emissive.setHSL(0.5 + Math.sin(elapsed * 0.34 + 0.9) * 0.05, 0.95, 0.28);
      coreMaterialRef.current.emissiveIntensity = 0.58 + Math.sin(elapsed * 0.95) * 0.18;
    }

    if (cageMaterialRef.current) {
      cageMaterialRef.current.color.setHSL(0.05 + Math.sin(elapsed * 0.22 + 0.3) * 0.04, 0.95, 0.71);
      cageMaterialRef.current.emissive.setHSL(0.03 + Math.sin(elapsed * 0.26 + 1.05) * 0.04, 0.95, 0.31);
      cageMaterialRef.current.emissiveIntensity = 0.72 + Math.sin(elapsed * 0.9) * 0.12;
    }

    if (gyroAMaterialRef.current && gyroBMaterialRef.current && gyroCMaterialRef.current) {
      gyroAMaterialRef.current.emissiveIntensity = 0.44 + Math.sin(elapsed * 0.7) * 0.08;
      gyroBMaterialRef.current.emissiveIntensity = 0.42 + Math.cos(elapsed * 0.82 + 0.8) * 0.08;
      gyroCMaterialRef.current.emissiveIntensity = 0.39 + Math.sin(elapsed * 0.66 + 1.2) * 0.08;
    }

    if (beamMaterialRef.current) {
      beamMaterialRef.current.opacity = 0.44 + Math.sin(elapsed * 1.25) * 0.16;
      beamMaterialRef.current.emissiveIntensity = 0.94 + Math.sin(elapsed * 1.1) * 0.18;
      beamMaterialRef.current.color.setHSL(0.54 + Math.sin(elapsed * 0.17) * 0.03, 0.92, 0.84);
    }
  });

  return (
    <group ref={rootRef}>
      <pointLight ref={keyLightRef} position={[-3, 1, 2.6]} intensity={1.2} distance={18} color="#86f6ff" />
      <pointLight ref={fillLightRef} position={[2.5, -1.6, -2.1]} intensity={0.72} distance={13} color="#ff9970" />
      <spotLight
        position={[0, 4.8, 1]}
        angle={0.45}
        intensity={0.56}
        penumbra={0.8}
        distance={12}
        color="#d8f8ff"
      />

      <Float speed={1.05} rotationIntensity={0.42} floatIntensity={0.5}>
        <mesh ref={coreRef} scale={1.08}>
          <icosahedronGeometry args={[1.08, 4]} />
          <MeshDistortMaterial
            ref={coreMaterialRef}
            color="#67f3ff"
            roughness={0.08}
            metalness={0.9}
            emissive="#82ffd5"
            emissiveIntensity={0.45}
            clearcoat={1}
            clearcoatRoughness={0.1}
            transmission={0.22}
            thickness={0.8}
            ior={1.3}
            distort={0.22}
            speed={1.6}
          />
        </mesh>
      </Float>

      <mesh ref={cageRef} scale={1.4}>
        <icosahedronGeometry args={[1.1, 2]} />
        <meshStandardMaterial
          ref={cageMaterialRef}
          wireframe
          transparent
          opacity={0.78}
          roughness={0.18}
          metalness={0.94}
          color="#ffae84"
          emissive="#ff8b63"
          emissiveIntensity={0.68}
        />
      </mesh>

      <mesh ref={gyroARef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.55, 0.036, 22, 220]} />
        <meshStandardMaterial
          ref={gyroAMaterialRef}
          color="#7cf5ff"
          emissive="#53d4ff"
          emissiveIntensity={0.42}
          roughness={0.2}
          metalness={0.88}
        />
      </mesh>

      <mesh ref={gyroBRef} rotation={[0.45, Math.PI / 2, 0.3]}>
        <torusGeometry args={[1.8, 0.032, 20, 200]} />
        <meshStandardMaterial
          ref={gyroBMaterialRef}
          color="#ffd0a8"
          emissive="#ff885e"
          emissiveIntensity={0.4}
          roughness={0.18}
          metalness={0.9}
        />
      </mesh>

      <mesh ref={gyroCRef} rotation={[0.9, 0.4, 0.2]}>
        <torusGeometry args={[2.04, 0.026, 20, 180]} />
        <meshStandardMaterial
          ref={gyroCMaterialRef}
          color="#9eeeff"
          emissive="#5ac8ff"
          emissiveIntensity={0.36}
          roughness={0.2}
          metalness={0.88}
        />
      </mesh>

      <mesh ref={railARef}>
        <tubeGeometry args={[railCurves[0], 220, 0.032, 12, true]} />
        <meshStandardMaterial
          color="#89f7ff"
          emissive="#61d7ff"
          emissiveIntensity={0.72}
          metalness={0.84}
          roughness={0.24}
          transparent
          opacity={0.58}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <mesh ref={railBRef}>
        <tubeGeometry args={[railCurves[1], 220, 0.03, 10, true]} />
        <meshStandardMaterial
          color="#ffc6a6"
          emissive="#ff9162"
          emissiveIntensity={0.68}
          metalness={0.82}
          roughness={0.24}
          transparent
          opacity={0.5}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <Float speed={0.9} rotationIntensity={0.6} floatIntensity={0.22}>
        <mesh ref={beamRef} rotation={[0.2, 0.16, 0.7]} scale={[0.13, 1.86, 0.13]}>
          <cylinderGeometry args={[0.22, 0.22, 2.85, 18, 1, true]} />
          <meshStandardMaterial
            ref={beamMaterialRef}
            transparent
            opacity={0.5}
            roughness={0.1}
            metalness={0.95}
            color="#eefcff"
            emissive="#91f9ff"
            emissiveIntensity={0.95}
            side={DoubleSide}
          />
        </mesh>
      </Float>

      {shardSeeds.map((seed, index) => (
        <mesh
          key={`shard-${seed.phase.toFixed(3)}`}
          ref={(mesh) => {
            shardRefs.current[index] = mesh;
          }}
          position={[Math.cos(seed.phase) * seed.radius, 0, Math.sin(seed.phase) * seed.radius]}
        >
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color={index % 2 === 0 ? '#83f7ff' : '#ffc39b'}
            emissive={index % 2 === 0 ? '#56d5ff' : '#ff875d'}
            emissiveIntensity={0.66}
            roughness={0.26}
            metalness={0.84}
          />
        </mesh>
      ))}

      {satelliteSeeds.map((seed, index) => (
        <Float
          key={`sat-${seed.phase.toFixed(3)}`}
          speed={0.92 + index * 0.06}
          rotationIntensity={0.85}
          floatIntensity={0.16 + index * 0.03}
        >
          <mesh
            ref={(mesh) => {
              satelliteRefs.current[index] = mesh;
            }}
            scale={0.17 + index * 0.01}
          >
            <dodecahedronGeometry args={[1, 0]} />
            <meshStandardMaterial
              color="#ecf7ff"
              emissive={index % 2 === 0 ? '#75e9ff' : '#ffae80'}
              emissiveIntensity={0.72}
              roughness={0.18}
              metalness={0.86}
            />
          </mesh>
        </Float>
      ))}

      {glyphPaths.map((points, index) => (
        <Line
          key={`glyph-${index}`}
          points={points}
          color={index % 2 === 0 ? '#78f6ff' : '#ffb391'}
          lineWidth={0.8}
          transparent
          opacity={0.26}
        />
      ))}

      <Sparkles count={58} speed={0.6} size={1.9} scale={[8, 4.8, 5.6]} color="#86f8ff" opacity={0.72} />
      <Sparkles count={26} speed={0.35} size={2.4} scale={[6.2, 3.6, 4.8]} color="#ffc3a1" opacity={0.46} />
    </group>
  );
}

export default function HeroScene(): JSX.Element {
  return (
    <Canvas
      camera={{ position: [0, 0, 6.2], fov: 40 }}
      dpr={[1, 1.7]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <color attach="background" args={['#060f24']} />
      <fog attach="fog" args={['#060f24', 6.8, 16.5]} />
      <ambientLight intensity={0.24} />
      <hemisphereLight intensity={0.8} skyColor="#a9f6ff" groundColor="#071225" />
      <directionalLight position={[3.8, 3.2, 5.3]} intensity={1.05} color="#f3fdff" />
      <Stars radius={18} depth={12} count={240} factor={2.2} saturation={0} fade speed={0.35} />
      <CameraDrift />
      <QuantumEngine />
    </Canvas>
  );
}
