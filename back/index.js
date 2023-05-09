import fs from 'fs';
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

let pokedex = JSON.parse(fs.readFileSync('../data/pokedex.json', 'utf8'));

// Retourn la liste des pokemons et leurs infos
app.get('/', function (req, res) {
    res.send(pokedex)
});

app.get('/pokemon/:id', function (req, res) {
    const id = req.params.id;
    const pokemon = pokedex.find(p => p.id == id);
    res.send(pokemon);
});

app.listen(3000, function () {
    console.log('server listening on http://localhost:3000/');
});
