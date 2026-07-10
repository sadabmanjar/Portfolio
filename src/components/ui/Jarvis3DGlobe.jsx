import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

const HologramGlobe = () => {
  const outerSphereRef = useRef();
  const innerSphereRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const ring3Ref = useRef();
  const particleGroupRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Mouse Tracking Offset
    const pointerX = state.pointer?.x ?? state.mouse?.x ?? 0;
    const pointerY = state.pointer?.y ?? state.mouse?.y ?? 0;
    
    // Complex independent rotations for that intricate mechanical look
    if (outerSphereRef.current) {
      outerSphereRef.current.rotation.y = (t * 0.05) + (pointerX * 0.2);
      outerSphereRef.current.rotation.x = Math.sin(t * 0.05) * 0.2 + (pointerY * -0.2);
    }
    if (innerSphereRef.current) {
      innerSphereRef.current.rotation.y = -t * 0.1;
      innerSphereRef.current.rotation.z = t * 0.05;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.2;
      ring1Ref.current.rotation.y = t * 0.3;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = -t * 0.3;
      ring2Ref.current.rotation.z = t * 0.15;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x = Math.cos(t * 0.1) * Math.PI;
      ring3Ref.current.rotation.z = -t * 0.2;
    }
    if (particleGroupRef.current) {
      particleGroupRef.current.rotation.y = t * 0.02;
    }
  });

  const wireframeMaterial = {
    color: '#ffaa00',
    emissive: '#ff6600',
    emissiveIntensity: 1.5,
    wireframe: true,
    transparent: true,
    opacity: 0.3,
    side: THREE.DoubleSide,
  };

  const solidMaterial = {
    color: '#ffb347',
    emissive: '#ff8c00',
    emissiveIntensity: 2,
    transparent: true,
    opacity: 0.15,
  };

  return (
    <group scale={1.8}>
      {/* Outer Hologram Shell (Icosahedron looks extremely techy as a wireframe) */}
      <mesh ref={outerSphereRef}>
        <icosahedronGeometry args={[2, 5]} />
        <meshStandardMaterial {...wireframeMaterial} opacity={0.15} />
      </mesh>

      {/* Inner Dense Core */}
      <mesh ref={innerSphereRef}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshStandardMaterial {...wireframeMaterial} opacity={0.4} emissiveIntensity={2.5} />
      </mesh>
      
      {/* Innermost Glowing Solid Core */}
      <mesh>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshStandardMaterial {...solidMaterial} opacity={0.9} />
      </mesh>

      {/* Orbiting Ring 1 */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[2.2, 0.01, 16, 100]} />
        <meshStandardMaterial {...wireframeMaterial} opacity={0.8} />
      </mesh>

      {/* Orbiting Ring 2 */}
      <mesh ref={ring2Ref} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.3, 0.04, 16, 100]} />
        <meshStandardMaterial {...wireframeMaterial} opacity={0.6} wireframe={false} />
      </mesh>

      {/* Orbiting Ring 3 */}
      <mesh ref={ring3Ref} rotation={[0, Math.PI / 4, 0]}>
        <torusGeometry args={[2.5, 0.01, 16, 100]} />
        <meshStandardMaterial {...wireframeMaterial} opacity={1} />
      </mesh>
      
      {/* Data particles scattered on the surface */}
      <group ref={particleGroupRef}>
        <points>
          <sphereGeometry args={[2.1, 48, 48]} />
          <pointsMaterial color="#ffcc00" size={0.015} transparent opacity={0.8} sizeAttenuation={true} />
        </points>
      </group>
    </group>
  );
};

const Jarvis3DGlobe = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-70 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.2} />
        {/* Intense Golden/Orange Core Lighting */}
        <pointLight position={[0, 0, 0]} intensity={5} color="#ffaa00" />
        <directionalLight position={[10, 10, 10]} intensity={2.5} color="#ffcc00" />
        <directionalLight position={[-10, -10, -10]} intensity={1.5} color="#ff4400" />
        
        <Float
          speed={1.5} 
          rotationIntensity={0.2} 
          floatIntensity={0.5} 
          floatingRange={[-0.1, 0.1]} 
        >
          <HologramGlobe />
        </Float>
      </Canvas>
    </div>
  );
};

export default Jarvis3DGlobe;
