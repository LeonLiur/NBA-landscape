import { useEffect, useState } from "react";
import "./App.css";
import ScatterPlot from "./components/ScatterPlot";
import { PlayerData } from "./components/ScatterPlot";

// Fisher-Yates shuffle function
const shuffleArray = (array: PlayerData[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

function Game() {
  const [playerData, setPlayerData] = useState<PlayerData[]>([]);
  const [answer, setAnswer] = useState<string | null>(null);
  const [guess, setGuess] = useState<string | null>(null);
  const onClickPlayer = (player: PlayerData) => {
    setGuess(player.name);
  };
  // Number of players
  const N = 20;
  useEffect(() => {
    // Use backend
    // fetch(`${import.meta.env.VITE_BACKEND_URL}/api/random-players?n=${N}`)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setPlayerData(data);
    //     setAnswer(data[Math.floor(Math.random() * data.length)].name);
    //   });

    // No ue backend
    fetch("./NBA2025Players.json")
      .then((res) => res.json())
      .then((playersData: PlayerData[]) => {
        const shuffledPlayers = shuffleArray([...playersData]);
        const sampleSize = Math.min(N, shuffledPlayers.length);
        setPlayerData(shuffledPlayers.slice(0, sampleSize));
        setAnswer(shuffledPlayers[Math.floor(Math.random() * sampleSize)].name);
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
          setAnswer(
            playerData[Math.floor(Math.random() * playerData.length)].name
          );
        }}
      >
        Reroll
      </button>
    </div>
  );
}

export default Game;
