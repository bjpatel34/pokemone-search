import { ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getPokemonByName } from "@/lib/pokemon"
import PokemonDetails from "@/components/pokemon-details";

export default async function PokemonDetailPage({
                                                    params,
                                                }: {
    params: { name: string }
}) {
    const pokemon = await getPokemonByName(params.name)

    if (!pokemon) {
        notFound()
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <div className="mb-4">
                <div className="flex items-center mb-4">
                    <Link href="/" className="text-emerald-500 hover:text-emerald-600 flex items-center">
                        <ArrowLeft className="h-4 w-4 mr-1" />
                        Back
                    </Link>
                </div>
                <nav className="text-sm mb-6">
                    <ol className="flex items-center space-x-2">
                        <li>
                            <Link href="/" className="text-blue-500 hover:text-blue-700">
                                Home
                            </Link>
                        </li>
                        <li className="flex items-center">
                            <span className="mx-2 text-gray-500">&gt;</span>
                            <span className="font-medium">{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</span>
                        </li>
                    </ol>
                </nav>git branch -M main
            </div>

            <PokemonDetails pokemon={pokemon} />
        </div>
    )
}