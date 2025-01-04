import { useState } from "react";
import { PlayerData } from "./ScatterPlot";
import { Html } from "@react-three/drei";

interface PlayerPointProps {
  player: PlayerData;
  position: [number, number, number];
  onClick?: (player: PlayerData) => void;
}

export const PlayerPoint = ({
  player,
  position,
  onClick,
}: PlayerPointProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <mesh
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation();
          setHovered(true);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
          setHovered(false);
      }}
      onClick={() => onClick?.(player)}
      scale={hovered ? 1.5 : 1}
    >
      <sphereGeometry args={[0.3, 16, 16]} />
      <meshStandardMaterial color={hovered ? "#ff9900" : "#ff6600"} />
      {hovered && (
        <Html transform={false} style={{ pointerEvents: "none" }}>
          <div className="bg-black/75 text-white p-2 text-lg w-36 flex flex-col items-center gap-2 border border-white/20 rounded">
            <div className="text-center whitespace-normal">???</div>
            <div className="w-full text-center border-t border-white/20 pt-2">
              PPG: {player.ppg.toFixed(2)}
            </div>
            <div className="w-full text-center">
              RPG: {player.rpg.toFixed(2)}
            </div>
            <div className="w-full text-center">
              APG: {player.apg.toFixed(2)}
            </div>
          </div>
        </Html>
      )}
    </mesh>
  );
};
