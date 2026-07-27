import { PokemonData } from "./pokeapi_pokemondata.js";
import { State } from "./state.js";

export async function commandInspect(state: State, ...args: string[]) {
    if (args === undefined || args.length < 1) {
        console.log("Please enter a Pokemon to try to inspect");
        return;
    }
    const pokemonName = args[0];

    const pokemonData = state.pokedex[pokemonName];
    if (pokemonData === undefined || pokemonData === null) {
        console.log(`You have not yet caught ${pokemonName}`);
        return;
    }

    printPokemonData(pokemonData);
}

function printPokemonData(pokemonData: PokemonData) {
    console.log(`Name: ${pokemonData.name}`);
    console.log(`Height: ${pokemonData.height}`);
    console.log(`Weight: ${pokemonData.weight}`);
    console.log(`Stats:`);
    for (let stat of pokemonData.stats) {
        console.log(`  -${stat.stat.name}: ${stat.base_stat}`);
    }
    console.log(`Type(s):`);
    for (let type of pokemonData.types) {
        console.log(`  - ${type.type.name}`);
    }
}
