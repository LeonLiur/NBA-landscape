import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { Mesh } from 'three';

interface BillBoardTextProps {
    position: [number, number, number];
    children: string;
    fontSize?: number;
    color?: string;
}

export const BillboardText = ({ position, children, fontSize, color }: BillBoardTextProps) => {
  const textRef = useRef<Mesh>();

  useFrame(({ camera }) => {
    if (textRef.current) {
      textRef.current.quaternion.copy(camera.quaternion); // Align rotation with camera
    }
  });

  return (
    <Text
      ref={textRef}
      position={position}
      fontSize={fontSize ?? 0.5}
      color={color ?? "white"}
      anchorX="center"
      anchorY="middle"
    >
      {children}
    </Text>
  );
};
