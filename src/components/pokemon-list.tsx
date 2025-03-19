"use client"

import { useSearchParams } from "next/navigation"
import PokemonCard from "./pokemon-card"
import { usePokemonSearch } from "@/hooks/use-pokemon-search"

export default function PokemonList() {
    const searchParams = useSearchParams()
    const type = searchParams.get("type") || ""
    const query = searchParams.get("query") || ""

    const { pokemon, loading } = usePokemonSearch(type, query)

    if (loading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-white rounded-lg shadow-md p-6 h-64 animate-pulse">
                        <div className="w-full h-40 bg-gray-200 rounded-md mb-4"></div>
                        <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    </div>
                ))}
            </div>
        )
    }

    if (pokemon.length === 0) {
        return (
            <div className="mt-8 text-center p-8 bg-white rounded-lg shadow-md">
                <p className="text-lg">No Pokémon found. Try a different search or type.</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {pokemon.map((pokemon) => (
                <PokemonCard key={pokemon.name} pokemon={pokemon} />
            ))}
        </div>
    )
}