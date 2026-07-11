import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function CyberRoad() {
  const meshRef = useRef();

  useFrame((state) => {
    const { clock } = state;
    // Injecting continuous time delta down to shader uniform bindings
    if (meshRef.current) {
      meshRef.current.material.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  // Custom glsl shaders mapping for real-time infinite procedural road matrix
  const roadShaderData = {
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color('#2563EB') },
      uAccent: { value: new THREE.Color('#3B82F6') }
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        vec3 pos = position;
        // Subtle forward-facing warp curve modifier
        pos.z += sin(pos.y * 0.05) * 5.0;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform vec3 uColor;
      uniform vec3 uAccent;
      varying vec2 vUv;

      void main() {
        // Multi-frequency speed calculation multipliers
        float speed = uTime * 4.5;
        float lineGrid = sin(vUv.y * 120.0 + speed) * cos(vUv.x * 40.0);
        
        // Lane mark tracking nodes
        float centerLine = step(0.48, vUv.x) * step(vUv.x, 0.52) * step(0.5, fraction(vUv.y * 10.0 + speed * 0.5));
        
        vec3 finalGlow = mix(vec3(0.01, 0.03, 0.08), uColor, step(0.92, lineGrid));
        if(centerLine > 0.0) {
          finalGlow += uAccent * 2.0; // Over-exposure flaring mapping
        }

        gl_FragColor = vec4(finalGlow, 1.0);
      }
    `
  };

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
      <planeGeometry args={[60, 300, 30, 30]} />
      <shaderMaterial 
        attach="material" 
        args={[roadShaderData]} 
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}