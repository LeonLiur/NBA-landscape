import { Vector3 } from "three";
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

export const CameraController = ({ position, target }: { 
  position?: [number, number, number];
  target?: [number, number, number];
}) => {
  const { camera } = useThree();
  
  useEffect(() => {
    if (position && target) {
      camera.position.set(...position);
      camera.lookAt(new Vector3(...target));
    }
  }, [camera, position, target]);

  return null;
};