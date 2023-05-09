import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style/App.css';
import './style/pokeType.css';

function App() {
  const [pokedexData, setPokedexData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

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
    (isEnglish ? pokemon.name.english.toLowerCase().includes(searchTerm.toLowerCase()) : false) || pokemon.name.french.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div>
      <div className='headerPage'>
        <h1>Pokedex</h1>
        <input
          type="text"
          placeholder="🇬🇧  & 🇫🇷 🔎"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSwitchClick}>
          {isEnglish ? '🇬🇧 ➡ 🇫🇷' : '🇫🇷 ➡ 🇬🇧'}
        </button>
      </div>
      <div className="card-container">
        {filteredData.map(pokemon => (
          <div className="card" key={pokemon.id}>
            {/*
            <div className='cardContainer-img'>
              <img className="card-img-top" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`} alt={`Image of ${pokemon.name.english}`} />
            </div>
            */}
            <div className="card-body">
              <h5 className="card-title">N°{pokemon.id} - {isEnglish ? pokemon.name.english : pokemon.name.french}</h5>
              <h5>🇯🇵 {pokemon.name.japanese} | 🇨🇳 : {pokemon.name.chinese}</h5>
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
    </div>
  );
}
export default App;
