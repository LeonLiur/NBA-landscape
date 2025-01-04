import express, { Request, Response } from 'express';
import { readFileSync } from 'fs';
import path from 'path';
const cors = require('cors');

interface NBAPlayer {
    name: string;
    ppg: number;
    rpg: number;
    apg: number;
  }

const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());
app.use(cors());

// Read and parse JSON file
const playersData: NBAPlayer[] = JSON.parse(
    readFileSync(path.join(__dirname, '../static/NBA2025Players.json'), 'utf-8')
  );
  
  // Fisher-Yates shuffle function
  const shuffleArray = (array: NBAPlayer[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

// Routes
app.get('/', (_: Request, res: Response) => {
  res.json({name: 'NBALandscape backend', roulette: Math.floor(Math.random() * 6) + 1});
});


interface RandomPlayerRequest extends Request {
    query: {
        n?: string;
    }
}

// Random players route
app.get('/api/random-players', (req: RandomPlayerRequest, res: Response) => {
    const shuffledPlayers = shuffleArray([...playersData]);
    const sampleSize = Math.min(Number(req.query.n) ?? 50, shuffledPlayers.length);
    const result = shuffledPlayers.slice(0, sampleSize);

    res.json(result);
  });

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
