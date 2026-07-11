import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';

export default function SimulatedCar({ velocityFactor }) {
  const carRef = useRef();
  const leftWheel = useRef();
  const rightWheel = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    // Dynamic wheel oscillation scaling matrix based on velocity speed tracking factors
    const spinSpeed = velocityFactor * 25;
    if (leftWheel.current && rightWheel.current) {
      leftWheel.current.rotation.x = t * spinSpeed;
      rightWheel.current.rotation.x = t * spinSpeed;
    }
    // High-frequency racing vibration mapping calculations
    if (carRef.current && velocityFactor > 1.5) {
      carRef.current.position.y = -0.3 + Math.sin(t * 80.0) * 0.02;
      carRef.current.position.z = Math.cos(t * 40.0) * 0.01;
    }
  });

  return (
    <group ref={carRef} position={[0, -0.3, 4]}>
      {/* Aerodynamic Chassis Core Block Mesh */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2.2, 0.6, 4.8]} />
        <meshStandardMaterial color="#0b1d35" roughness={0.1} metalness={0.9} envMapIntensity={2} />
      </mesh>

      {/* Cyberpunk Monoblock Glass Cabin Structure */}
      <mesh position={[0, 0.55, -0.2]}>
        <boxGeometry args={[1.8, 0.5, 2.2]} />
        <meshStandardMaterial color="#2563eb" transparent opacity={0.4} roughness={0.0} metalness={1.0} />
      </mesh>

      {/* High-Exposure Quad Xenon Headlights */}
      <mesh position={[-0.9, 0.1, 2.41]}>
        <boxGeometry args={[0.2, 0.1, 0.05]} />
        <meshBasicMaterial color="#fff" />
        <spotLight position={[0, 0, 0]} angle={0.4} penumbra={0.5} intensity={8} color="#3b82f6" castShadow />
      </mesh>
      <mesh position={[0.9, 0.1, 2.41]}>
        <boxGeometry args={[0.2, 0.1, 0.05]} />
        <meshBasicMaterial color="#fff" />
        <spotLight position={[0, 0, 0]} angle={0.4} penumbra={0.5} intensity={8} color="#3b82f6" castShadow />
      </mesh>

      {/* Crimson LED Lightstrip Array (Matches attached design aesthetic reference) */}
      <mesh position={[0, 0.1, -2.41]}>
        <boxGeometry args={[2.0, 0.06, 0.05]} />
        <meshBasicMaterial color="#ef4444" />
      </mesh>

      {/* Mechanical Wheels Modules Assembly */}
      <mesh ref={leftWheel} position={[-1.2, -0.3, 1.4]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.55, 0.55, 0.4, 24]} />
        <meshStandardMaterial color="#111" roughness={0.5} />
      </mesh>
      <mesh ref={rightWheel} position={[1.2, -0.3, 1.4]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.55, 0.55, 0.4, 24]} />
        <meshStandardMaterial color="#111" roughness={0.5} />
      </mesh>

      {/* Volumetric Underglow Lighting Vector */}
      <pointLight position={[0, -0.5, 0]} intensity={4} distance={6} color="#3b82f6" />

      {/* High-Velocity Exhaust Spark Particle Emitters */}
      {velocityFactor > 1.2 && (
        <group position={[0, -0.2, -2.5]}>
          <Sparkles count={40} scale={1.2} size={3.5} speed={4} color="#3b82f6" />
        </group>
      )}
    </group>
  );
}