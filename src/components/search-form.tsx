"use client"

import React, {startTransition} from "react"

import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { Search } from "lucide-react"

export default function SearchForm({ types }: { types: string[] }) {
    const router = useRouter()
    const searchParams = useSearchParams()

    const [type, setType] = useState(searchParams.get("type") || "")
    const [query, setQuery] = useState(searchParams.get("query") || "")

    const handleChangePokemon = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault()

        const newType = e.target.value
        setType(newType)

        startTransition(() => {
            const params = new URLSearchParams(searchParams.toString())
            if (newType) {
                params.set("type", newType)
            } else {
                params.delete("type")
            }
            router.push(`/?${params.toString()}`)
        })
    }

    const handleSearchSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const params = new URLSearchParams()
        if (type) params.set("type", type)
        if (query) params.set("query", query)

        router.push(`/?${params.toString()}`)
    }

    return (
        <form onSubmit={handleSearchSubmit} className="mb-8">
            <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-1/3">
                    <select
                        value={type}
                        onChange={handleChangePokemon}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select</option>
                        {types.map((type) => (
                            <option key={type} value={type}>
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex w-full md:w-2/3">
                    <div className="relative flex-grow">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search..."
                            className="w-full p-3 pl-10 border border-gray-300 rounded-l-lg focus:outline-none"
                        />
                    </div>
                    <button type="submit" className="bg-blue-800 text-white font-medium py-3 px-6 rounded-r-lg">
                        Search
                    </button>
                </div>
            </div>
        </form>
    )
}