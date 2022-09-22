export interface Pokemon {
    name: string
    stats: []
    types: []
    sprites: {
        front_default: string
    }
    species: {
        url: string
    }
}