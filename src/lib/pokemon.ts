import type { Pokemon, PokemonDetail } from "./types"

const API_BASE_URL = "https://pokeapi.co/api/v2"

export async function getPokemonTypes(): Promise<string[]> {
    const response = await fetch(`${API_BASE_URL}/type`)
    const data = await response.json()

    return data.results.map((type: { name: string }) => type.name)
}

export async function getPokemonByType(type: string): Promise<Pokemon[]> {
    const response = await fetch(`${API_BASE_URL}/type/${type}`)
    const data = await response.json()

    const pokemonList = await Promise.all(
        data.pokemon.map(async (entry: { pokemon: { name: string; url: string } }) => {
            const pokemonData = await getPokemonBasicData(entry.pokemon.name)
            return pokemonData
        }),
    )

    return pokemonList
}

export async function searchPokemonByName(query: string): Promise<Pokemon[]> {
    const response = await fetch(`${API_BASE_URL}/pokemon?limit=100`)
    const data = await response.json()

    let filteredPokemon = data.results

    if (query) {
        filteredPokemon = filteredPokemon.filter((pokemon: { name: string }) =>
            pokemon.name.toLowerCase().includes(query.toLowerCase()),
        )
    }

    const pokemonList = await Promise.all(
        filteredPokemon.map(async (pokemon: { name: string }) => {
            const pokemonData = await getPokemonBasicData(pokemon.name)
            return pokemonData
        }),
    )

    return pokemonList
}

export async function getPokemonBasicData(name: string): Promise<Pokemon> {
    const response = await fetch(`${API_BASE_URL}/pokemon/${name}`)
    const data = await response.json()

    return {
        id: data.id,
        name: data.name,
        image: data.sprites.other["official-artwork"].front_default || data.sprites.front_default,
        types: data.types.map((type: { type: { name: string } }) => type.type.name),
    }
}

export async function getPokemonByName(name: string): Promise<PokemonDetail | null> {
    try {
        const response = await fetch(`${API_BASE_URL}/pokemon/${name}`)

        if (!response.ok) {
            return null
        }

        return await response.json()
    } catch (error) {
        console.error("Error fetching Pokemon:", error)
        return null
    }
}