"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const cors = require('cors');
const app = (0, express_1.default)();
const port = 3000;
// Middleware to parse JSON
app.use(express_1.default.json());
app.use(cors());
// Read and parse JSON file
const playersData = JSON.parse((0, fs_1.readFileSync)(path_1.default.join(__dirname, '../static/NBA2025Players.json'), 'utf-8'));
// Fisher-Yates shuffle function
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};
// Routes
app.get('/', (_, res) => {
    res.json({ name: 'NBALandscape backend', roulette: Math.floor(Math.random() * 6) + 1 });
});
// Random players route
app.get('/api/random-players', (req, res) => {
    var _a;
    const shuffledPlayers = shuffleArray([...playersData]);
    const sampleSize = Math.min((_a = Number(req.query.n)) !== null && _a !== void 0 ? _a : 50, shuffledPlayers.length);
    const result = shuffledPlayers.slice(0, sampleSize);
    res.json(result);
});
// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
