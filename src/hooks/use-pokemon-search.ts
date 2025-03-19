"use client"

import { useEffect, useState } from "react"
import type { Pokemon } from "@/lib/types"
import { searchPokemon } from "@/lib/actions"

export function usePokemonSearch(type: string, query: string) {
    const [pokemon, setPokemon] = useState<Pokemon[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchPokemon() {
            setLoading(true)
            try {
                const results = await searchPokemon(type, query)
                setPokemon(results)
            } catch (error) {
                console.error("Error fetching Pokemon:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchPokemon()
    }, [type, query])

    return { pokemon, loading }
}