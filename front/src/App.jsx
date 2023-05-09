import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style/App.css';
import './style/pokeType.css';

function App() {
  const [pokedexData, setPokedexData] = useState([]);
  const [searchPokemon, setsearchPokemon] = useState('');

  const [isEnglish, setIsEnglish] = useState(true);
  const handleSwitchClick = () => {
    setIsEnglish(!isEnglish);
  };

  useEffect(() => {
    axios.get('http://localhost:3000')
      .then(res => {
        setPokedexData(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  const filteredData = pokedexData.filter(pokemon =>
    (isEnglish ? pokemon.name.english.toLowerCase().includes(searchPokemon.toLowerCase()) : false) || pokemon.name.french.toLowerCase().includes(searchPokemon.toLowerCase())
  );

  const handleDeleteClick = (id,name) => {
    const confirmDelete  = confirm( isEnglish ? `Are you sure you want to delete "${name.english}" ?` : `Voulez-vous vraiment supprimer "${name.french}" ?`);
    if(confirmDelete){
      axios.delete(`http://localhost:3000/pokemon/${id}`)
        .then(res => {
          setPokedexData(res.data);
        })
        .catch(err => console.log(err));
      }else{
        return;
      }
  };

  return (
    <>
      <div className='headerPage'>
        <h1>Pokedex</h1>
        <input
          type="text"
          placeholder="🇬🇧  & 🇫🇷 🔎"
          value={searchPokemon}
          onChange={e => setsearchPokemon(e.target.value)}
        />
        <button onClick={handleSwitchClick}>
          {isEnglish ? '🇬🇧 ➡ 🇫🇷' : '🇫🇷 ➡ 🇬🇧'}
        </button>
      </div>

      <div className="card-container">
        {filteredData.map(pokemon => (
          <div className="card" key={pokemon.id}>
            <button onClick={() => handleDeleteClick(pokemon.id, pokemon.name)}>X</button>
            <div className="card-body">
              <h2 className="card-title">N°{pokemon.id} - {isEnglish ? `🇬🇧 ${pokemon.name.english}` : `🇫🇷 ${pokemon.name.french}`}</h2>
              <h5>🇯🇵 {pokemon.name.japanese} | 🇨🇳 {pokemon.name.chinese} | {isEnglish ? `🇫🇷 ${pokemon.name.french}` : `🇬🇧 ${pokemon.name.english}`}</h5>
              <li className="card-subtitle">Type:
                {pokemon.type.map(type => (
                  <span className={`typeShape ${type.toLowerCase()}`} key={type}> {type} </span>
                ))}
              </li>
              <ul className="card-text">
                <li>HP: {pokemon.base.HP}</li>
                <li>Attack: {pokemon.base.Attack}</li>
                <li>Defense: {pokemon.base.Defense}</li>
                <li>Sp. Attack: {pokemon.base['Sp. Attack']}</li>
                <li>Sp. Defense: {pokemon.base['Sp. Defense']}</li>
                <li>Speed: {pokemon.base.Speed}</li>
              </ul>
            </div>
          </div>
        ))}
      </div>
      
    </>
  );
}
export default App;
