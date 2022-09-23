export interface Pokemon {
    name: string
    stats: []
    types: []
    sprites: {
        front_default: string
    }
    species: PokemonSpecieResponse
}

export type PokemonResponse = Pokemon | undefined

export interface PokemonSpecieResponse{
    url: string,
    name: string
}

export type FlavorTextSpecie = {
    flavor_text: string
    language: {
        name: string
        url: string
    }
}

export interface PokemonSpecie{
    flavor_text_entries: FlavorTextSpecie[]
}

export type PokemonSpecies = PokemonSpecie[]