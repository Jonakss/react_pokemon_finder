import React, {useEffect, useState} from 'react'

interface Pokemon {
    name: string
    stats: []
    types: []
    sprites: {
        front_default:string
    }  
}

export type PokemonProps = {
    name: string
};

function PokemonCard (props:PokemonProps){
    useEffect(()=>{
        if(props.name.length > 0)
            change_name(props.name)
    }, [props.name])

    const change_name = async (name: string) => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)  
        .then(response => response.json())
        .then(pokemon => {
          setPokemon(pokemon)
          console.log(pokemon)
        })
    }
    const [pokemon, setPokemon] = useState<Pokemon>();
    return (
        <div className='pokemon-container'>            
            <div className="data">
            <h2>Pokemon {pokemon?.name}</h2>
            <img src={pokemon?.sprites.front_default} alt={pokemon?.name} />
            {pokemon?.types?.map((t:any) => {
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
                    pokemon?.stats?.map((s:any) => {
                    return (
                        <li key={s.stat.name}><strong>{s.stat.name}</strong>: {s.base_stat}</li>
                    )
                    })
                    }
                </ul>
            </div>
        </div>
    )
}
    
export default PokemonCard;