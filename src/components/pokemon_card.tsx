import React, { useEffect, useState } from 'react'
import { getPokemonDesciptionByLang } from '../services/pokemon';
import { FlavorTextSpecie, Pokemon, PokemonResponse, PokemonSpecie, PokemonSpecieResponse } from '../types'


type PokemonProps = {
    pokemon: PokemonResponse
    searchName?: string | undefined
};



function PokemonCard(props: PokemonProps) {
    const defaultSound = 'off'
    const pokemon = props.pokemon
    const [descriptions, setDescriptions ] = useState<FlavorTextSpecie[]>([]);
    const [description, setDescription] = useState(localStorage.getItem('sound') || 'off')
    const [sound, setSound] = useState(defaultSound)
    const msg = new SpeechSynthesisUtterance();
    const language = window.navigator.language.split('-')[0];

    if(localStorage.mode && localStorage.mode !== "") {     
        setSound(currSound => currSound = localStorage.mode)   
    }

    useEffect(()=>{
        console.log(language);
        if(descriptions)
            if(descriptions.length === 0) 
                setDescription(currDesc => currDesc = '')
            else
                setDescription(currDesc => currDesc = descriptions[Math.floor(Math.random()*descriptions?.length)]?.flavor_text) 
    }, [descriptions])

    useEffect(()=>{
        if(sound === 'off') window.speechSynthesis?.cancel();
        localStorage.setItem('sound', sound) 
        console.log(`localstorage sound: ${localStorage.getItem('sound')}`)
    }, [sound])

    useEffect(()=>{
        console.log(language);
        window.speechSynthesis?.cancel();
        if(description && sound === 'on'){
            msg.text = description;
            msg.lang = language;
            window.speechSynthesis.speak(msg);  
        }
    }, [description])

    useEffect(()=>{
        if(props.pokemon)
            getDescription(props.pokemon?.species)
    }, [props.pokemon])

    const getDescription = async (specie:PokemonSpecieResponse) => {
        if(specie){
            const flavoredTexts = await getPokemonDesciptionByLang(specie);
            if(flavoredTexts)
                setDescriptions(flavoredTexts)
        }
    }

    return pokemon ? (
        <div className='pokemon-container'>
            <div className="data">
                <h2>Pokemon {pokemon?.name}</h2>
                <img src={pokemon?.sprites.front_default} alt={pokemon?.name} onClick={()=>{
                    getDescription(pokemon?.species)
                }}/>
                {pokemon?.types?.map((t: any) => {
                    return (
                        <p key={t.type.name} className={`type-icon type-${t.type.name}`}>{t.type.name}</p>
                    )
                })
                }

                { description !== '' &&
                <div className='description'>
                    <p>{description}</p>
                    <span onClick={ ()=>{window.speechSynthesis.cancel()}}>Stop</span> <span onClick={()=>{setSound(sound === 'off' ? 'on' : 'off')}}> - Sound {sound}</span>
                </div>
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