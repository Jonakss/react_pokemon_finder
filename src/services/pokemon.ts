const getPokemonByName = async (name:string) => {
    return await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .then(response => response.json())
    .then(pokemon => {
        return pokemon
    }).catch(error => {
        console.log(`ERROR - ${error}`);
        return undefined
    })
}
export default getPokemonByName;