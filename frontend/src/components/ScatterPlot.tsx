import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Line } from "@react-three/drei";
import { BillboardText } from "./BillboardText";
import { PlayerPoint } from "./PlayerPoint";

export interface PlayerData {
  name: string;
  ppg: number;
  rpg: number;
  apg: number;
}

interface ScatterPlotProps {
  data: PlayerData[];
  onClick?: (player: PlayerData) => void;
}

const ScatterPlot = ({ data, onClick }: ScatterPlotProps) => {
  // Scale factors for each stat: stat = coordinate * scale
  const scale = {
    ppg: 2,
    rpg: 1,
    apg: 1,
  };
  const gridSize = 20;

  const setUpGraph = () => {
    const lines = [];
    const interval = 2;

    // Create grid lines and tick marks
    for (let i = 0; i <= gridSize; i += interval) {
      // XY plane
      lines.push(
        <Line
          key={`grid-xy-x-${i}`}
          points={[
            [i, 0, 0],
            [i, gridSize, 0],
          ]}
          color="#000000"
          opacity={0.2}
        />,
        <Line
          key={`grid-xy-y-${i}`}
          points={[
            [0, i, 0],
            [gridSize, i, 0],
          ]}
          color="#000000"
          opacity={0.2}
        />,
        // XZ plane
        <Line
          key={`grid-xz-x-${i}`}
          points={[
            [i, 0, 0],
            [i, 0, gridSize],
          ]}
          color="#000000"
          opacity={0.2}
        />,
        <Line
          key={`grid-xz-z-${i}`}
          points={[
            [0, 0, i],
            [gridSize, 0, i],
          ]}
          color="#000000"
          opacity={0.2}
        />,
        // YZ plane
        <Line
          key={`grid-yz-y-${i}`}
          points={[
            [0, i, 0],
            [0, i, gridSize],
          ]}
          color="#000000"
          opacity={0.2}
        />,
        <Line
          key={`grid-yz-z-${i}`}
          points={[
            [0, 0, i],
            [0, gridSize, i],
          ]}
          color="#000000"
          opacity={0.2}
        />
      );

      // Add tick labels
      lines.push(
        <BillboardText
          key={`x-axis-${i}`}
          position={[i, -0.5, 0]}
          color="red"
          fontSize={0.8}
        >
          {(i * scale.ppg).toString()}
        </BillboardText>,
        <BillboardText
          key={`y-axis-${i}`}
          position={[0, i, -0.5]}
          color="green"
          fontSize={0.8}
        >
          {(i * scale.rpg).toString()}
        </BillboardText>,
        <BillboardText
          key={`z-axis-${i}`}
          position={[-0.5, 0, i]}
          color="blue"
          fontSize={0.8}
        >
          {(i * scale.apg).toString()}
        </BillboardText>
      );
    }

    lines.push(
      <BillboardText
        key={`ppg-label`}
        position={[gridSize + interval, -0.5, 0]}
        color="red"
        fontSize={0.8}
      >
        PPG
      </BillboardText>,
      <BillboardText
        key={`rpg-label`}
        position={[0, gridSize + interval, -0.5]}
        color="green"
        fontSize={0.8}
      >
        RPG
      </BillboardText>,
      <BillboardText
        key={`apg-label`}
        position={[-0.5, 0, gridSize + interval]}
        color="blue"
        fontSize={0.8}
      >
        APG
      </BillboardText>
    );
    return lines;
  };

  return (
    <div className="flex-1 w-full h-full">
      <Canvas>
        <PerspectiveCamera makeDefault position={[25, 25, 25]} />
        <OrbitControls />
        <ambientLight intensity={0.5} />
        <pointLight position={[25, 25, 25]} />

        {/* Grid lines */}
        {setUpGraph()}

        {/* Player data points */}
        {data.map((player, index) => (
          <mesh key={`player-${index}`}>
            <PlayerPoint
              player={player}
              position={[
                player.ppg / scale.ppg,
                player.rpg / scale.rpg,
                player.apg / scale.apg,
              ]}
              onClick={onClick}
            />
          </mesh>
        ))}
      </Canvas>
    </div>
  );
};

export default ScatterPlot;
