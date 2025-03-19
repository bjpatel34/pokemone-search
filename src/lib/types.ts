export interface Pokemon {
    id: number
    name: string
    image: string
    types: string[]
}

export interface PokemonDetail {
    id: number
    name: string
    sprites: {
        front_default: string
        other: {
            "official-artwork": {
                front_default: string
            }
        }
    }
    types: Array<{
        type: {
            name: string
        }
    }>
    stats: Array<{
        base_stat: number
        stat: {
            name: string
        }
    }>
    abilities: Array<{
        ability: {
            name: string
        }
    }>
    moves: Array<{
        move: {
            name: string
        }
    }>
}