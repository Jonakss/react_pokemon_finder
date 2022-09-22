import React, { useEffect, useState } from 'react'
import { Pokemon } from '../types'


type PokemonProps = {
    pokemon: Pokemon | undefined
    searchName?: string | undefined
};


function PokemonCard(props: PokemonProps) {
    const pokemon = props.pokemon
    const [description, setDescription ] = useState('');

    useEffect(()=>{
        if(description){
            var msg = new SpeechSynthesisUtterance();
            msg.text = description;
            window.speechSynthesis.speak(msg);  
        }
    }, [description])

    return pokemon ? (
        <div className='pokemon-container'>
            <div className="data">
                <h2>Pokemon {pokemon?.name}</h2>
                <img src={pokemon?.sprites.front_default} alt={pokemon?.name} onClick={()=>{
                    if(pokemon?.species)
                    fetch(pokemon?.species.url)
                    .then(response => response.json())
                    .then((specie:any)=>{
                        let flavor_text = specie?.flavor_text_entries?.filter((s:any) => s.language.name == 'es')
                        setDescription(flavor_text[Math.floor(Math.random()*flavor_text.length)].flavor_text)
                    }).catch(err => console.log(err));
                }}/>
                {pokemon?.types?.map((t: any) => {
                    return (
                        <p key={t.type.name} className={`type-icon type-${t.type.name}`}>{t.type.name}</p>
                    )
                })
                }
            </div>
            <div className="stats">
                <h3>
                    Stats
                </h3>
                <ul>
                    {
                        pokemon?.stats?.map((s: any) => {
                            return (
                                <li key={s.stat.name}><strong>{s.stat.name}</strong>: {s.base_stat}</li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    ) : (<span className='error'>No existe pokemon {props.searchName?props.searchName:''}</span>)
}

export default PokemonCard;