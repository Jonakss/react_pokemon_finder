import { PokemonResponse, PokemonSpecie,  PokemonSpecieResponse, FlavorTextSpecie } from "../types";

const getPokemonByName = async (name:string): Promise<PokemonResponse> => {
    return await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`)
    .then(response => response.json())
    .then(pokemon => pokemon)
    .catch(error => {
        console.log(`ERROR - ${error}`);
        return undefined
    });
}

const getPokemonDesciptionByLang = async (specie:PokemonSpecieResponse, lang?:string): Promise<FlavorTextSpecie[] | undefined>  => {
    return await fetch(specie.url)
    .then(response => response.json())
    .then((specie:PokemonSpecie)=>{
        if(!lang) lang = 'es'
        let flavor_text = specie.flavor_text_entries.filter((s:FlavorTextSpecie) => s.language.name === lang)
        return flavor_text
    }).catch(err => {
        console.log(err)
        return undefined
    });
}

export { getPokemonDesciptionByLang };
export default getPokemonByName;