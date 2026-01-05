import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, useTexture, Stars } from '@react-three/drei';
import * as THREE from 'three';

export default function BackgroundScene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 0, 0]} intensity={3} color="#ffaa00" distance={100} decay={0.1} />
      <Stars radius={300} depth={60} count={20000} factor={7} saturation={0} fade speed={1} />
      <SolarSystem />
      <CameraRig />
    </>
  );
}

function SolarSystem() {
  return (
    <group>
      <Sun />
      <EarthSystem />
      <OtherPlanets />
    </group>
  );
}

function Sun() {
  const [sunTexture] = useTexture([
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Map_of_the_full_sun.jpg/1024px-Map_of_the_full_sun.jpg'
  ]);

  return (
    <mesh position={[0, 0, 0]}>
      <sphereGeometry args={[2, 32, 32]} />
      <meshBasicMaterial map={sunTexture} />
      <pointLight intensity={1} />
    </mesh>
  );
}

function EarthSystem() {
  const earthRef = useRef<THREE.Group>(null);
  const earthPosition = new THREE.Vector3(10, 0, 0);

  // Load textures
  const [colorMap, normalMap, specularMap, cloudsMap] = useTexture([
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg',
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg',
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg',
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png',
  ]);

  useFrame((state) => {
    if (earthRef.current) {
      // Earth rotation
      earthRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <>
      <group position={earthPosition}>
        <group ref={earthRef}>
          {/* Earth Sphere */}
          <mesh>
            <sphereGeometry args={[1, 64, 64]} />
            <meshPhongMaterial
              map={colorMap}
              normalMap={normalMap}
              specularMap={specularMap}
              shininess={5}
            />
          </mesh>
          {/* Clouds Sphere */}
          <mesh scale={[1.01, 1.01, 1.01]}>
            <sphereGeometry args={[1, 64, 64]} />
            <meshStandardMaterial
              map={cloudsMap}
              transparent
              opacity={0.8}
              blending={THREE.AdditiveBlending}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
        <Moon />
      </group>
      <Track radius={10} />
    </>
  );
}

function Moon() {
  const moonRef = useRef<THREE.Mesh>(null);
  const [moonColor] = useTexture([
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/moon_1024.jpg'
  ]);

  useFrame((state) => {
    if (moonRef.current) {
      // Moon orbit
      const t = state.clock.getElapsedTime() * 0.5;
      moonRef.current.position.x = Math.cos(t) * 2.5;
      moonRef.current.position.z = Math.sin(t) * 2.5;
      moonRef.current.rotation.y += 0.005;
    }
  });

  return (
    <>
      <mesh ref={moonRef} position={[2.5, 0, 0]}>
        <sphereGeometry args={[0.27, 32, 32]} />
        <meshStandardMaterial map={moonColor} roughness={0.8} />
      </mesh>
      <group position={[0,0,0]}>
         <Track radius={2.5} opacity={0.05} width={0.02} />
      </group>
    </>
  );
}

function OtherPlanets() {
  const planets = useMemo(() => [
    { distance: 4, radius: 0.1, color: '#ff4400', speed: 1.2 }, // Mercury
    { distance: 7, radius: 0.25, color: '#ddaa00', speed: 0.9 }, // Venus
    { distance: 15, radius: 0.15, color: '#ff2200', speed: 0.6 }, // Mars
    { distance: 25, radius: 1.5, color: '#dd9955', speed: 0.3 }, // Jupiter
    { distance: 35, radius: 1.2, color: '#ccaaff', speed: 0.2 }, // Saturn
  ], []);

  return (
    <group>
      {planets.map((planet, index) => (
        <Planet key={index} {...planet} />
      ))}
    </group>
  );
}

function Planet({ distance, radius, color, speed }: { distance: number, radius: number, color: string, speed: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime() * speed * 0.1 + offset;
      ref.current.position.x = Math.cos(t) * distance;
      ref.current.position.z = Math.sin(t) * distance;
    }
  });

  return (
    <>
      <Sphere ref={ref} args={[radius, 32, 32]}>
        <meshStandardMaterial color={color} />
      </Sphere>
      <Track radius={distance} />
    </>
  );
}

function Track({ radius, opacity = 0.1, width = 0.05 }: { radius: number, opacity?: number, width?: number }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius - width, radius + width, 128]} />
      <meshBasicMaterial color="#ffffff" opacity={opacity} transparent side={THREE.DoubleSide} />
    </mesh>
  );
}

function CameraRig() {
  useFrame((state) => {
    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = maxScroll > 0 ? Math.max(0, Math.min(scrollY / maxScroll, 1)) : 0;

    // Camera Transition
    // Start: Close-up on Earth (Earth at [10, 0, 0]), looking slightly up so Earth is at bottom
    // End: Wide view of Solar System (Sun at [0, 0, 0])
    
    const startPos = new THREE.Vector3(10, 0.5, 2.5); // Closer and slightly up
    const endPos = new THREE.Vector3(0, 20, 40);
    
    const startLookAt = new THREE.Vector3(10, 2, 0); // Look above the Earth to push it down
    const endLookAt = new THREE.Vector3(0, 0, 0);

    const targetPos = new THREE.Vector3().copy(startPos).lerp(endPos, scrollProgress);
    const targetLookAt = new THREE.Vector3().copy(startLookAt).lerp(endLookAt, scrollProgress);

    state.camera.position.lerp(targetPos, 0.05);
    state.camera.lookAt(targetLookAt);
  });

  return null;
}
