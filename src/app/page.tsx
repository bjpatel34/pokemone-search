import PokemonList from "@/components/pokemon-list"
import SearchForm from "@/components/search-form"
import { getPokemonTypes } from "@/lib/pokemon"

export default async function Home() {
  const types = await getPokemonTypes()

  return (
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <h1 className="text-3xl font-bold mb-6">Pokémon Search</h1>
        <SearchForm types={types} />
        <PokemonList />
      </main>
  )
}