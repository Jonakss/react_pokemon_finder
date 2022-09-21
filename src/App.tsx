import React, { FormEvent, useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import PokemonCard from './components/pokemon_card'


function App() {
  const [search, setSearch] = useState('');
  const [searchName, setSearchName] = useState('');


  const handleSubmit = (e: FormEvent ) => {
    e.preventDefault()
    setSearchName(search)
  };

  return (
    <div className="App">
      Pokemon finder
      <div>
        <form action="#" onSubmit={handleSubmit} >
          <input type="text" name="search" placeholder='Search...' onChange={(e) => {
            if(e.target.value.length > 0)
              setSearch(e.target.value)
          }}/>
          <button>Search</button>
        </form>
      </div>
      <PokemonCard name={searchName}/>
    </div>
  );
}

export default App;
