import fs from 'fs';
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

const pokedexPath = '../data/pokedex.json';
let pokedex = JSON.parse(fs.readFileSync(pokedexPath, 'utf8'));

// Retourn la liste des pokemons et leurs infos
app.get('/', function (req, res) {
    res.send(pokedex)
});

// Suppression d'un pokemon
app.delete('/pokemon/:id', function (req, res) {
    const id = req.params.id;
    const index = pokedex.findIndex(pokemon => pokemon.id == id);
    if (index !== -1) {
        pokedex.splice(index, 1);
        fs.writeFileSync(pokedexPath, JSON.stringify(pokedex), 'utf8');
        res.send(pokedex);
    } else {
        res.status(404).send('Pokemon not found');
    }
});

// ajout d'un pokemon

// modification d'un pokemon

app.listen(3000, function () {
    console.log('server listening on http://localhost:3000/');
});
