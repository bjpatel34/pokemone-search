import Image from "next/image"

interface PokemonDetailsProps {
    pokemon: {
        name: string
        sprites: {
            other: {
                "official-artwork": {
                    front_default: string
                }
            }
            front_default: string
        }
        types: { type: { name: string } }[]
        stats: { stat: { name: string } }[]
        abilities: { ability: { name: string } }[]
        moves: { move: { name: string } }[]
    }
}

const PokemonDetails: React.FC<PokemonDetailsProps> = ({ pokemon }) => {
    return (
        <div className="bg-white rounded-xl overflow-hidden shadow-md">
            <div className="bg-emerald-300 p-8 flex justify-center">
                <Image
                    src={pokemon.sprites.other["official-artwork"].front_default || pokemon.sprites.front_default}
                    alt={pokemon.name}
                    width={300}
                    height={300}
                    className="object-contain h-[300px]"
                />
            </div>
            <div className="bg-amber-300 p-6">
                <div className="mb-4">
                    <h2 className="text-xl font-bold mb-1">
                        Name: {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                    </h2>
                    <p className="mb-1">
                        <span className="font-bold">Type:</span> {pokemon.types.map((t) => t.type.name).join(", ")}
                    </p>
                    <div className="mb-1">
                        <span className="font-bold">Stats:</span> {pokemon.stats.map((s) => s.stat.name).join(", ")}
                    </div>
                    <div className="mb-1">
                        <span className="font-bold">Abilities:</span> {pokemon.abilities.map((a) => a.ability.name).join(", ")}
                    </div>
                    <div>
                        <span className="font-bold">Some Moves:</span>{" "}
                        {pokemon.moves
                            .slice(0, 5)
                            .map((m) => m.move.name)
                            .join(", ")}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PokemonDetails