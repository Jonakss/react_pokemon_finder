import React, { FormEvent, useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import PokemonCard from './components/pokemon_card'
import getPokemonByName from './services/pokemon';
import { Pokemon } from './types';



function App() {
  const [pokemon, setPokemon] = useState<Pokemon>();


  const handleSubmit = async (e:any) => {
    e.preventDefault()
    let search = e.target.search.value
    if(search && search != '')
      setPokemon(await getPokemonByName(search))
    else setPokemon(undefined)
  };

  return (
    <div className="App">
      <h1>Pokemon finder</h1>
      <div className='search'>
        <form action="#" onSubmit={handleSubmit} >
          <input type="text" name="search" placeholder='Search...' autoComplete='off'/>
          <button>Search</button>
        </form>
      </div>
      <PokemonCard pokemon={pokemon}/>
    </div>
  );
}

export default App;
