import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, Sphere, Torus } from '@react-three/drei';
import { Mesh } from 'three';

const FloatingShape = ({ position, shape }: { position: [number, number, number], shape: 'box' | 'sphere' | 'torus' }) => {
  const meshRef = useRef<Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.5;
    }
  });

  const renderShape = () => {
    switch (shape) {
      case 'box':
        return <Box ref={meshRef} args={[1, 1, 1]} position={position} />;
      case 'sphere':
        return <Sphere ref={meshRef} args={[0.7]} position={position} />;
      case 'torus':
        return <Torus ref={meshRef} args={[0.8, 0.3, 16, 100]} position={position} />;
      default:
        return <Box ref={meshRef} args={[1, 1, 1]} position={position} />;
    }
  };

  return (
    <mesh>
      {renderShape()}
      <meshStandardMaterial color="#3b82f6" opacity={0.7} transparent />
    </mesh>
  );
};

export const Scene3D = () => {
  return (
    <div className="w-full h-full absolute inset-0 opacity-30">
      <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <FloatingShape position={[-3, 0, 0]} shape="box" />
        <FloatingShape position={[3, 1, -2]} shape="sphere" />
        <FloatingShape position={[0, -2, 1]} shape="torus" />
        <FloatingShape position={[-2, -1, -1]} shape="sphere" />
        <FloatingShape position={[2, 2, 2]} shape="box" />
      </Canvas>
    </div>
  );
};