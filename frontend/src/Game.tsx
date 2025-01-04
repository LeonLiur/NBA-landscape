import { useEffect, useState } from "react";
import "./App.css";
import ScatterPlot from "./components/ScatterPlot";
import { PlayerData } from "./components/ScatterPlot";

function Game() {
  const [playerData, setPlayerData] = useState<PlayerData[]>([]);
  const [answer, setAnswer] = useState<string | null>(null);
  const [guess, setGuess] = useState<string | null>(null);
  const onClickPlayer = (player: PlayerData) => {
    console.log(`user clicked ${player.name}`);
    setGuess(player.name);
  };
  // Number of players
  const N = 20;
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/random-players?n=${N}`)
      .then((res) => res.json())
      .then((data) => {
        setPlayerData(data);
        setAnswer(data[Math.floor(Math.random() * data.length)].name);
      });
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      {!guess ? (
        <h1>Where is {answer}?</h1>
      ) : guess == answer ? (
        <h1 className="text-green-500">Wow, you found {answer}!</h1>
      ) : (
        <h1 className="text-red-500">
          No! That is clearly <span className="text-black">{guess}</span>
        </h1>
      )}
      <ScatterPlot data={playerData} onClick={onClickPlayer} />
      <button
        className="bottom-3 right-0 absolute transition-none focus:outline-none hover:outline-none"
        onClick={() => {
          setGuess(null);
          setAnswer(playerData[Math.floor(Math.random() * playerData.length)].name);
        }}
      >
        Reroll
      </button>
    </div>
  );
}

export default Game;
