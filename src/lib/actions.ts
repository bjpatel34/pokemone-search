"use server"

import type { Pokemon } from "./types"
import { getPokemonByType, searchPokemonByName } from "./pokemon"

export async function searchPokemon(type: string, query: string): Promise<Pokemon[]> {
    let pokemon: Pokemon[] = []

    if (type) {
        pokemon = await getPokemonByType(type)
    } else {
        pokemon = await searchPokemonByName(query)
    }

    if (query && type) {
        pokemon = pokemon.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
    }

    return pokemon
}