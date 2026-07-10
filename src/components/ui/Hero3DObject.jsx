import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';

const NeonShape = () => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      // Base slow rotation
      meshRef.current.rotation.x += 0.002;
      meshRef.current.rotation.y += 0.003;

      // Slight rotation towards mouse pointer (support both R3F v7 and v8)
      const pointerX = state.pointer?.x ?? state.mouse?.x ?? 0;
      const pointerY = state.pointer?.y ?? state.mouse?.y ?? 0;
      
      const targetX = (pointerX * Math.PI) / 4;
      const targetY = (pointerY * Math.PI) / 4;
      
      meshRef.current.rotation.x += 0.05 * (targetY - meshRef.current.rotation.x);
      meshRef.current.rotation.y += 0.05 * (targetX - meshRef.current.rotation.y);
    }
  });

  return (
    <Float
      speed={2} 
      rotationIntensity={0.5} 
      floatIntensity={1.5} 
      floatingRange={[-0.2, 0.2]} 
    >
      <mesh ref={meshRef}>
        {/* A complex, futuristic looking Torus Knot */}
        <torusKnotGeometry args={[1.6, 0.5, 128, 32]} />
        <meshStandardMaterial
          color="#00e5ff"
          emissive="#bf00ff"
          emissiveIntensity={0.8}
          wireframe={true}
          transparent={true}
          opacity={0.6}
        />
      </mesh>
    </Float>
  );
};

const Hero3DObject = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-70">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        className="pointer-events-auto"
      >
        <ambientLight intensity={0.5} />
        {/* Cyberpunk Lighting */}
        <directionalLight position={[10, 10, 10]} intensity={1.5} color="#bf00ff" />
        <directionalLight position={[-10, -10, -10]} intensity={1.5} color="#00e5ff" />
        <NeonShape />
      </Canvas>
    </div>
  );
};

export default Hero3DObject;
