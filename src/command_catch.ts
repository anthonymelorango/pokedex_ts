import { State } from "./state.js";

export async function commandCatch(state: State, ...args: string[]) {
    if (args === undefined || args.length < 1) {
        console.log("Please enter a Pokemon to try to catch");
        return;
    }
    const pokemonName = args[0];
    const pokemonData = await state.pokeAPI.fetchPokemon(pokemonName);
    if (pokemonData === undefined) {
        console.log(`Pokemon not found: ${pokemonName}`);
        return;
    }

    console.log(`Throwing a Pokeball at ${pokemonName}...`);

    const baseCatchChance = Math.random();
    const baseExperience = pokemonData.base_experience;
    const baseCatchResult = baseCatchChance * baseExperience;

    // Probably do something better here
    const catchSuccess = baseCatchResult > (.5 * baseExperience);
    if (!catchSuccess) {
        console.log(`${pokemonName} escaped!`);
        return;
    }

    console.log(`${pokemonName} was caught!`);
    state.pokedex[pokemonName] = pokemonData;
}